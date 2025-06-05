import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [
        "github-dark",
        "one-dark-pro", 
        "material-theme-darker",
        "dracula"
      ],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "python",
        "java",
        "go",
        "rust",
        "cpp",
        "c",
        "bash",
        "shell",
        "json",
        "yaml",
        "toml",
        "css",
        "scss",
        "html",
        "xml",
        "sql",
        "dockerfile",
        "prisma",
        "graphql",
        "markdown",
        "diff"
      ],
    });
  }
  return highlighter;
}

export async function highlightCodeBlocks(html: string): Promise<string> {
  const shiki = await getHighlighter();
  
  // Replace code blocks with highlighted versions
  return html.replace(
    /<pre><code(?:\s+class="language-([^"]*)")?(?:[^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (match, lang, code) => {
      try {
        // Decode HTML entities in the code
        const decodedCode = code
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&#x2F;/g, '/')
          .replace(/&#x60;/g, '`');

        // Use detected language or fallback to 'text'
        const language = lang || 'text';
        
        const highlighted = shiki.codeToHtml(decodedCode, {
          lang: language,
          theme: 'github-dark',
          transformers: [
            {
              pre(node) {
                // Apply matrix-themed styling
                node.properties.class = [
                  'shiki',
                  'bg-black',
                  'border',
                  'border-green-500/30',
                  'rounded',
                  'p-4',
                  'overflow-x-auto',
                  'font-mono',
                  'text-sm'
                ].join(' ');
                node.properties.style = 'background-color: #000000 !important;';
              },
              code(node) {
                node.properties.class = 'block font-mono';
              }
            }
          ]
        });

        return highlighted;
      } catch (error) {
        console.warn(`Failed to highlight code block with language "${lang}":`, error);
        // Return original if highlighting fails
        return `<pre class="bg-black border border-green-500/30 rounded p-4 overflow-x-auto font-mono text-sm"><code class="text-green-400">${code}</code></pre>`;
      }
    }
  );
}

export function processMarkdownContent(html: string): string {
  // Enhanced processing for better markdown rendering
  let processedHtml = html;

  // Fix heading styles
  processedHtml = processedHtml.replace(
    /<h([1-6])([^>]*)>/g,
    '<h$1$2 class="text-green-400 font-mono font-bold mb-4 mt-6">'
  );

  // Fix paragraph styles
  processedHtml = processedHtml.replace(
    /<p([^>]*)>/g,
    '<p$1 class="text-green-300 leading-relaxed mb-4">'
  );

  // Fix link styles
  processedHtml = processedHtml.replace(
    /<a([^>]*)>/g,
    '<a$1 class="text-green-400 underline hover:text-green-300 transition-colors">'
  );

  // Fix strong/bold styles
  processedHtml = processedHtml.replace(
    /<strong([^>]*)>/g,
    '<strong$1 class="text-green-400 font-bold">'
  );

  // Fix em/italic styles
  processedHtml = processedHtml.replace(
    /<em([^>]*)>/g,
    '<em$1 class="text-green-300 italic">'
  );

  // Fix blockquote styles
  processedHtml = processedHtml.replace(
    /<blockquote([^>]*)>/g,
    '<blockquote$1 class="border-l-2 border-green-500 pl-4 italic text-green-300 my-4">'
  );

  // Fix list styles
  processedHtml = processedHtml.replace(
    /<ul([^>]*)>/g,
    '<ul$1 class="text-green-300 list-disc list-inside mb-4 space-y-1">'
  );

  processedHtml = processedHtml.replace(
    /<ol([^>]*)>/g,
    '<ol$1 class="text-green-300 list-decimal list-inside mb-4 space-y-1">'
  );

  processedHtml = processedHtml.replace(
    /<li([^>]*)>/g,
    '<li$1 class="text-green-300">'
  );

  // Fix horizontal rule styles
  processedHtml = processedHtml.replace(
    /<hr([^>]*)>/g,
    '<hr$1 class="border-green-500/30 my-6">'
  );

  // Fix inline code styles (not in pre blocks)
  processedHtml = processedHtml.replace(
    /(?<!<pre[^>]*>.*?)<code([^>]*)>(.*?)<\/code>(?!.*?<\/pre>)/gs,
    '<code$1 class="text-green-400 bg-black px-1 py-0.5 rounded font-mono text-sm border border-green-500/20">$2</code>'
  );

  return processedHtml;
}