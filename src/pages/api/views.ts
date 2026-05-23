import { env } from "cloudflare:workers";
import type { APIRoute } from "astro";

export const prerender = false;

const SLUG_RE = /^[a-z0-9][a-z0-9-_/]{0,128}$/i;

function slugFromRequest(request: Request): string | null {
	const slug = new URL(request.url).searchParams.get("slug");
	if (!slug) return null;
	if (!SLUG_RE.test(slug)) return null;
	return slug;
}

async function readCount(slug: string) {
	const raw = await env.VIEWS.get(`views:${slug}`);
	const n = raw ? Number.parseInt(raw, 10) : 0;
	return Number.isFinite(n) && n >= 0 ? n : 0;
}

export const GET: APIRoute = async ({ request }) => {
	const slug = slugFromRequest(request);
	if (!slug) return Response.json({ error: "invalid slug" }, { status: 400 });

	const views = await readCount(slug);
	return Response.json(
		{ slug, views },
		{ headers: { "Cache-Control": "public, max-age=30" } },
	);
};

export const POST: APIRoute = async ({ request }) => {
	const slug = slugFromRequest(request);
	if (!slug) return Response.json({ error: "invalid slug" }, { status: 400 });

	const current = await readCount(slug);
	const next = current + 1;
	await env.VIEWS.put(`views:${slug}`, String(next));

	return Response.json({ slug, views: next });
};
