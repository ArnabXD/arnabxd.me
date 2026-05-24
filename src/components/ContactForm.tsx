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
				label="client_identity"
				index="01"
				placeholder="e.g. Ada Lovelace"
				autoComplete="name"
			/>
			<Field
				id={emailId}
				name="email"
				type="email"
				label="client_endpoint"
				index="02"
				placeholder="you@domain.tld"
				autoComplete="email"
			/>
			<Field
				id={messageId}
				name="message"
				label="transmission_payload"
				index="03"
				placeholder="Provide transaction details, role descriptions, or system queries..."
				textarea
			/>

			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-rule-soft/50">
				<StatusLine status={status} error={error} />
				<button
					type="submit"
					disabled={status === "submitting"}
					className="group inline-flex items-center gap-3 bg-paper-2 border border-rule hover:border-mark hover:shadow-[0_0_12px_rgba(20,184,166,0.2)] text-ink px-5 py-3 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shrink-0 w-full sm:w-auto justify-center sm:justify-start"
				>
					<span className="font-mono text-[13px] font-medium tracking-tight text-mark">
						{status === "submitting"
							? "transmitting..."
							: "broadcast_packets()"}
					</span>
					<span
						aria-hidden="true"
						className="transition-transform group-hover:translate-x-1 text-mark"
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
		"mt-2 block w-full bg-transparent border-0 border-b border-rule-soft px-0 py-2.5 text-[15px] text-ink placeholder:text-ink-4 outline-none transition-colors focus:border-mark focus:ring-0 font-mono";

	return (
		<div>
			<label htmlFor={id} className="flex items-baseline justify-between gap-2">
				<span className="font-mono text-[13px] text-ink-2 font-medium tracking-tight">
					{label}
				</span>
				<span className="font-mono text-[10px] tabular text-ink-4 tracking-[0.14em] uppercase">
					[0{index}]
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
				return "COMPILING DATA & BROADCASTING PACKETS...";
			case "ok":
				return "TRANSMITTED SUCCESSFULLY. UPLINK ACKNOWLEDGED.";
			case "error":
				return `ERROR: ${error || "TRANSMISSION FAILURE."}`;
			default:
				return "UPLINK STATUS: IDLE";
		}
	})();
	const tone =
		status === "ok"
			? "text-success"
			: status === "error"
				? "text-alert font-bold"
				: "text-ink-4";

	return (
		<span
			role="status"
			aria-live="polite"
			className={`font-mono text-[11px] tabular tracking-[0.06em] ${tone}`}
		>
			&gt; {text}
		</span>
	);
}
