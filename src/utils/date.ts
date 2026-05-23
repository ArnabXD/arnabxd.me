export function fmtDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function getReadTime(remarkPluginFrontmatter: Record<string, unknown>): string | null {
	const val = remarkPluginFrontmatter.minutesRead;
	return typeof val === "string" ? val : null;
}