import { useEffect, useState } from "react";

type Props = {
	slug: string;
	/** If true, hit the endpoint with POST to increment; otherwise GET only. */
	increment?: boolean;
};

const fmt = (n: number) => n.toLocaleString("en-US");

export default function ViewCounter({ slug, increment = false }: Props) {
	const [views, setViews] = useState<number | null>(null);
	const [failed, setFailed] = useState(false);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await fetch(`/api/views?slug=${encodeURIComponent(slug)}`, {
					method: increment ? "POST" : "GET",
				});
				if (!res.ok) throw new Error("bad status");
				const data = (await res.json()) as { views: number };
				if (!cancelled) setViews(data.views);
			} catch {
				if (!cancelled) setFailed(true);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [slug, increment]);

	return (
		<span
			className="inline-flex items-center gap-1.5 tabular"
			aria-live="polite"
		>
			<span className="text-ink-4 text-[10px] tracking-[0.14em] uppercase">
				Views
			</span>
			<span className="text-mark">
				{failed ? "-" : views === null ? "…" : fmt(views)}
			</span>
		</span>
	);
}
