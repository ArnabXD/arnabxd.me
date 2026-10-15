import { createElement as h } from "react";

export type OgData = {
	title: string;
	description?: string;
	tags?: string[];
	date?: string;
	type?: "page" | "post";
};

export function truncateWords(text: string, maxLen: number): string {
	if (text.length <= maxLen) return text;
	return text.slice(0, text.lastIndexOf(" ", maxLen)) + "...";
}

// Dark theme tokens, mirrored from src/global.css
const PAPER = "#0e1113";
const INK = "#eef1f3";
const INK_3 = "#98a2ab";
const MARK = "#2dd4bf";

// Fingerprint-style ridges for the top-right background: concentric, slightly
// wobbly loops around a whorl centre. Each loop is cut into short arcs whose
// opacity falls off with distance from the corner, so the pattern fades out
// toward the text. Deterministic (no randomness) so every build is identical.
const ridges = (() => {
	const CX = 1040,
		CY = 120; // whorl centre, near the top-right corner
	const RINGS = 40,
		STEP = 14,
		STEPS = 72,
		SEG = 4;
	const FADE = 700; // px from the corner where ridges disappear
	const out: { d: string; o: number }[] = [];
	for (let i = 1; i <= RINGS; i++) {
		const r = i * STEP;
		const pts: [number, number][] = [];
		for (let k = 0; k <= STEPS; k++) {
			const th = (k / STEPS) * Math.PI * 2;
			const wob =
				1 +
				0.05 * Math.sin(3 * th + i * 0.21) +
				0.025 * Math.sin(5 * th - i * 0.33);
			const x = CX + i * 1.6 + r * wob * Math.cos(th) * 0.92;
			const y = CY - i * 0.6 + r * wob * Math.sin(th) * 1.18;
			pts.push([x, y]);
		}
		for (let k = 0; k < STEPS; k += SEG) {
			// skip some arcs so the ridges break up like a real print
			if ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 > 0.88)
				continue;
			const seg = pts.slice(k, k + SEG + 1);
			const [mx, my] = seg[Math.floor(seg.length / 2)];
			const d = Math.hypot(1210 - mx, -10 - my);
			const o = Math.max(0, 1 - d / FADE) ** 1.4 * 0.6;
			if (o < 0.02) continue;
			out.push({
				d:
					"M" +
					seg.map(([x, y]) => `${x.toFixed(0)} ${y.toFixed(0)}`).join("L"),
				o,
			});
		}
	}
	return out;
})();

export function buildOgElement(data: OgData) {
	const { title, description, tags = [], date, type = "page" } = data;

	const fontSize =
		title.length > 60 ? "56px" : title.length > 40 ? "68px" : "84px";

	const shownTags = type === "post" ? tags.slice(0, 3) : [];

	return h(
		"div",
		{
			style: {
				width: "1200px",
				height: "630px",
				background: PAPER,
				display: "flex",
				fontFamily: "'Geist'",
				padding: "56px 64px",
				position: "relative",
			},
		},
		// Background: fingerprint ridges in the top right, fading out toward the text
		h(
			"svg",
			{
				width: 1200,
				height: 630,
				viewBox: "0 0 1200 630",
				style: { position: "absolute", top: 0, left: 0 },
			},
			...ridges.map((rg, i) =>
				h("path", {
					key: i,
					d: rg.d,
					fill: "none",
					stroke: MARK,
					strokeWidth: 2,
					strokeOpacity: rg.o,
					strokeLinecap: "round",
				}),
			),
		),
		// Left: wordmark, title, description, url
		h(
			"div",
			{
				style: {
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					flex: 1,
					minWidth: 0,
					maxWidth: "820px",
				},
			},
			h(
				"div",
				{ style: { display: "flex", alignItems: "center", gap: "16px" } },
				h("div", {
					style: {
						width: "36px",
						height: "6px",
						borderRadius: "3px",
						background: MARK,
					},
				}),
				h(
					"div",
					{ style: { color: INK, fontSize: "26px", fontWeight: 700 } },
					"Arnab Paryali",
				),
			),
			h(
				"div",
				{ style: { display: "flex", flexDirection: "column", gap: "24px" } },
				shownTags.length > 0
					? h(
							"div",
							{ style: { display: "flex", gap: "20px" } },
							...shownTags.map((tag) =>
								h(
									"div",
									{
										key: tag,
										style: { color: MARK, fontSize: "24px", fontWeight: 500 },
									},
									`#${tag}`,
								),
							),
						)
					: null,
				h(
					"div",
					{
						style: {
							color: INK,
							fontSize,
							fontWeight: 700,
							lineHeight: 1.06,
							letterSpacing: "-0.03em",
						},
					},
					title,
				),
				description
					? h(
							"div",
							{
								style: {
									color: INK_3,
									fontSize: "26px",
									fontWeight: 500,
									lineHeight: 1.4,
								},
							},
							truncateWords(description, 110),
						)
					: null,
			),
			h(
				"div",
				{
					style: {
						display: "flex",
						gap: "28px",
						color: INK_3,
						fontSize: "24px",
						fontWeight: 500,
					},
				},
				h("div", {}, "arnabxd.me"),
				date ? h("div", {}, date) : null,
			),
		),
	);
}
