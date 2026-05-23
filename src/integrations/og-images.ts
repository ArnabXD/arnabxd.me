import type { AstroIntegration } from "astro";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { buildOgElement, type OgData } from "../utils/og";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fontsDir = join(__dirname, "../assets/fonts");

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
}

async function renderPng(data: OgData): Promise<Buffer> {
  const fontMedium = readFileSync(join(fontsDir, "SpaceGrotesk-Medium.ttf"));
  const fontBold = readFileSync(join(fontsDir, "SpaceGrotesk-Bold.ttf"));

  const svg = await satori(buildOgElement(data), {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Space Grotesk", data: fontMedium, weight: 500, style: "normal" },
      { name: "Space Grotesk", data: fontBold, weight: 700, style: "normal" },
    ],
  });

  return Buffer.from(new Resvg(svg).render().asPng());
}

function parseFrontmatter(raw: string) {
  const titleMatch = raw.match(/^title:\s*(.+)$/m);
  const descMatch = raw.match(/^description:\s*(.+)$/m);
  const dateMatch = raw.match(/^pubDate:\s*(.+)$/m);
  const tagsMatch = raw.match(/^tags:\n((?:\s+-\s*.+\n?)+)/m);
  const draftMatch = raw.match(/^draft:\s*true/m);
  const tags = tagsMatch
    ? (tagsMatch[1].match(/- (.+)/g) ?? []).map((t) => t.replace("- ", "").trim())
    : [];
  return {
    title: titleMatch?.[1]?.trim() ?? "",
    description: descMatch?.[1]?.trim(),
    date: dateMatch?.[1] ? fmtDate(dateMatch[1].trim()) : undefined,
    tags,
    draft: !!draftMatch,
  };
}

export function ogImages(): AstroIntegration {
  return {
    name: "og-images",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = join(fileURLToPath(dir), "og");
        mkdirSync(outDir, { recursive: true });

        const pages: { name: string; data: OgData }[] = [
          {
            name: "home",
            data: {
              title: "Arnab Paryali",
              description:
                "Software engineer with 5+ years shipping production React Native and Next.js apps. TypeScript everywhere, animation-obsessed, cross-platform by trade.",
              type: "page",
            },
          },
          {
            name: "blog",
            data: {
              title: "Journal",
              description:
                "Writing about React Native, Next.js, TypeScript, animations, and everything I learn shipping production software.",
              type: "page",
            },
          },
          {
            name: "works",
            data: {
              title: "Works",
              description:
                "A collection of projects, experiments, and things I've built over the years.",
              type: "page",
            },
          },
        ];

        // Collect blog posts
        const blogDir = join(__dirname, "../content/blog");
        const mdxFiles = readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
        for (const file of mdxFiles) {
          const raw = readFileSync(join(blogDir, file), "utf8");
          const { title, description, date, tags, draft } = parseFrontmatter(raw);
          if (draft || !title) continue;
          pages.push({
            name: file.replace(".mdx", ""),
            data: { title, description, date, tags, type: "post" },
          });
        }

        let count = 0;
        for (const { name, data } of pages) {
          const png = await renderPng(data);
          writeFileSync(join(outDir, `${name}.png`), png);
          count++;
        }

        logger.info(`Generated ${count} OG images → dist/og/`);
      },
    },
  };
}
