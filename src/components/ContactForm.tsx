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
				setError(data.error ?? "Could not send your message.");
				return;
			}
			setStatus("ok");
			form.reset();
		} catch {
			setStatus("error");
			setError("Network error. Please try again.");
		}
	}

	return (
		<form onSubmit={onSubmit} className="space-y-5" noValidate>
			<Field
				id={nameId}
				name="name"
				label="Name"
				placeholder="Ada Lovelace"
				autoComplete="name"
			/>
			<Field
				id={emailId}
				name="email"
				type="email"
				label="Email"
				placeholder="you@example.com"
				autoComplete="email"
			/>
			<Field
				id={messageId}
				name="message"
				label="Message"
				placeholder="What are you working on?"
				textarea
			/>

			<div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-1">
				<StatusLine status={status} error={error} />
				<button
					type="submit"
					disabled={status === "submitting"}
					className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed shrink-0 w-full sm:w-auto"
				>
					{status === "submitting" ? "Sending..." : "Send message"}
				</button>
			</div>
		</form>
	);
}

type FieldProps = {
	id: string;
	name: string;
	label: string;
	placeholder?: string;
	type?: string;
	autoComplete?: string;
	textarea?: boolean;
};

function Field({
	id,
	name,
	label,
	placeholder,
	type = "text",
	autoComplete,
	textarea,
}: FieldProps) {
	const cls =
		"mt-2 block w-full rounded-xl border border-rule bg-paper px-4 py-3 text-[16px] text-ink placeholder:text-ink-4 outline-none transition-colors focus:border-mark focus:ring-2 focus:ring-mark/25";

	return (
		<div>
			<label htmlFor={id} className="text-[15px] font-medium text-ink">
				{label}
			</label>
			{textarea ? (
				<textarea
					id={id}
					name={name}
					rows={5}
					placeholder={placeholder}
					className={`${cls} resize-none`}
					required
				/>
			) : (
				<input
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					autoComplete={autoComplete}
					className={cls}
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
	const text =
		status === "ok"
			? "Message sent. Thanks, I'll reply soon."
			: status === "error"
				? error || "Something went wrong."
				: "";
	const tone =
		status === "ok"
			? "text-mark"
			: status === "error"
				? "text-alert"
				: "text-ink-3";

	return (
		<span role="status" aria-live="polite" className={`text-[14px] ${tone}`}>
			{text}
		</span>
	);
}
