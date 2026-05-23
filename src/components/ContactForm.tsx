import { useId, useState } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

export default function ContactForm() {
	const [status, setStatus] = useState<Status>("idle");
	const [error, setError] = useState<string | null>(null);

	const nameId = useId();
	const emailId = useId();
	const messageId = useId();

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (status === "submitting") return;

		const form = e.currentTarget;
		const fd = new FormData(form);
		const payload = {
			name: String(fd.get("name") ?? "").trim(),
			email: String(fd.get("email") ?? "").trim(),
			message: String(fd.get("message") ?? "").trim(),
		};

		if (!payload.name || !payload.email || !payload.message) {
			setError("All fields are required.");
			setStatus("error");
			return;
		}

		setStatus("submitting");
		setError(null);

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const data = (await res.json()) as { success: boolean; error?: string };
			if (!res.ok || !data.success) {
				setStatus("error");
				setError(data.error ?? "Transmission failed.");
				return;
			}
			setStatus("ok");
			form.reset();
		} catch {
			setStatus("error");
			setError("Network unreachable.");
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-6" noValidate>
			<Field
				id={nameId}
				name="name"
				label="Your name"
				index="01"
				placeholder="e.g. Ada Lovelace"
				autoComplete="name"
			/>
			<Field
				id={emailId}
				name="email"
				type="email"
				label="Return address"
				index="02"
				placeholder="you@domain.tld"
				autoComplete="email"
			/>
			<Field
				id={messageId}
				name="message"
				label="Message"
				index="03"
				placeholder="Tell me about your project, role, or idea…"
				textarea
			/>

			<div className="flex items-center justify-between gap-4 pt-2">
				<StatusLine status={status} error={error} />
				<button
					type="submit"
					disabled={status === "submitting"}
					className="group inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 hover:bg-mark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
				>
					<span className="font-display text-[14px] font-medium tracking-[-0.01em]">
						{status === "submitting" ? "Sending" : "Send letter"}
					</span>
					<span
						aria-hidden="true"
						className="transition-transform group-hover:translate-x-1"
					>
						→
					</span>
				</button>
			</div>
		</form>
	);
}

type FieldProps = {
	id: string;
	name: string;
	label: string;
	index: string;
	placeholder?: string;
	type?: string;
	autoComplete?: string;
	textarea?: boolean;
};

function Field({
	id,
	name,
	label,
	index,
	placeholder,
	type = "text",
	autoComplete,
	textarea,
}: FieldProps) {
	const baseClass =
		"mt-2 block w-full bg-transparent border-0 border-b border-rule-soft px-0 py-2.5 text-[16px] text-ink placeholder:text-ink-4 outline-none transition-colors focus:border-ink focus:ring-0";

	return (
		<div>
			<label htmlFor={id} className="flex items-baseline justify-between gap-2">
				<span className="font-display text-[15px] text-ink font-medium tracking-[-0.01em]">
					{label}
				</span>
				<span className="font-mono text-[10px] tabular text-ink-4 tracking-[0.14em] uppercase">
					- {index}
				</span>
			</label>
			{textarea ? (
				<textarea
					id={id}
					name={name}
					rows={4}
					placeholder={placeholder}
					className={`${baseClass} resize-none`}
					required
				/>
			) : (
				<input
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					autoComplete={autoComplete}
					className={baseClass}
					required
				/>
			)}
		</div>
	);
}

function StatusLine({
	status,
	error,
}: {
	status: Status;
	error: string | null;
}) {
	const text = (() => {
		switch (status) {
			case "submitting":
				return "Sealing the envelope…";
			case "ok":
				return "Sent. Reply within 24h.";
			case "error":
				return error ?? "Something went wrong.";
			default:
				return "Ready.";
		}
	})();
	const tone =
		status === "ok"
			? "text-mark"
			: status === "error"
				? "text-mark-2"
				: "text-ink-3";

	return (
		<span
			role="status"
			aria-live="polite"
			className={`font-mono text-[11px] tabular tracking-[0.06em] ${tone}`}
		>
			// {text}
		</span>
	);
}
