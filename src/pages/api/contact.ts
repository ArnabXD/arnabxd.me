import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { name?: string; email?: string; message?: string };

function sanitize(input: Payload) {
	const name = String(input.name ?? "")
		.trim()
		.slice(0, 120);
	const email = String(input.email ?? "")
		.trim()
		.slice(0, 200);
	const message = String(input.message ?? "")
		.trim()
		.slice(0, 4000);

	if (name.length < 1) return { ok: false as const, error: "name required" };
	if (!EMAIL_RE.test(email))
		return { ok: false as const, error: "invalid email" };
	if (message.length < 4)
		return { ok: false as const, error: "message too short" };

	return { ok: true as const, payload: { name, email, message } };
}

function esc(s: string) {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const POST: APIRoute = async ({ request }) => {
	if (!request.headers.get("content-type")?.includes("application/json")) {
		return Response.json(
			{ success: false, error: "expected json" },
			{ status: 415 },
		);
	}

	let body: Payload;
	try {
		body = (await request.json()) as Payload;
	} catch {
		return Response.json(
			{ success: false, error: "malformed json" },
			{ status: 400 },
		);
	}

	const parsed = sanitize(body);
	if (!parsed.ok) {
		return Response.json(
			{ success: false, error: parsed.error },
			{ status: 422 },
		);
	}

	const token = env.TELEGRAM_BOT_TOKEN;
	const chatId = env.TELEGRAM_CHAT_ID;

	if (!token || !chatId) {
		console.warn("[contact] missing telegram env");
		return Response.json(
			{ success: false, error: "transport not configured" },
			{ status: 503 },
		);
	}

	const { name, email, message } = parsed.payload;
	const text = [
		"<b>📨 arnabxd.me · new message</b>",
		"",
		`<b>from</b>  ${esc(name)}`,
		`<b>email</b> ${esc(email)}`,
		"",
		`<pre>${esc(message)}</pre>`,
	].join("\n");

	try {
		const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: "HTML",
				disable_web_page_preview: true,
			}),
		});

		if (!tg.ok) {
			console.warn("[contact] telegram error", tg.status, await tg.text());
			return Response.json(
				{ success: false, error: "upstream failed" },
				{ status: 502 },
			);
		}

		return Response.json({ success: true });
	} catch (err) {
		console.error("[contact] fetch failed", err);
		return Response.json(
			{ success: false, error: "upstream unreachable" },
			{ status: 502 },
		);
	}
};

export const GET: APIRoute = () =>
	new Response("Method Not Allowed", {
		status: 405,
		headers: { Allow: "POST" },
	});
