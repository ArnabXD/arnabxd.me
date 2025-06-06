import { useMemo, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Copy, Check, Terminal } from "lucide-react";
import { getHighlighter } from "~/utils/syntax-highlighter";
import "~/styles/markdown.css";

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  src?: string;
  alt?: string;
}

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
  node?: unknown;
}

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";
  const codeString = typeof children === "string" ? children : String(children);

  useEffect(() => {
    let isMounted = true;

    const highlightCode = async () => {
      try {
        const highlighter = await getHighlighter();

        if (!isMounted) return;

        const highlighted = highlighter.codeToHtml(codeString.trim(), {
          lang: language,
          theme: "ayu-dark",
          transformers: [
            {
              pre(node) {
                node.properties.class = [
                  "shiki-pre",
                  "bg-black",
                  "border",
                  "border-green-500/30",
                  "rounded-b-lg",
                  "rounded-t-none",
                  "p-4",
                  "overflow-x-auto",
                  "font-mono",
                  "text-sm",
                  "!mt-0",
                  "group-hover:border-green-500/60",
                  "transition-colors",
                  "duration-200",
                ].join(" ");
                node.properties.style = "background-color: #000000 !important;";
              },
              code(node) {
                node.properties.class = "block font-mono";
              },
            },
          ],
        });

        if (isMounted) {
          setHighlightedCode(highlighted);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn(
          `Failed to highlight code block with language "${language}":`,
          error
        );
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    highlightCode();

    return () => {
      isMounted = false;
    };
  }, [codeString, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className="relative group mb-4 transition-all duration-200 hover:scale-[1.002]"
      data-code-block-container
    >
      {/* Terminal header for code block */}
      <div className="bg-black border border-green-500/30 border-b-0 rounded-t-lg px-4 py-2 flex items-center justify-between group-hover:border-green-500/60 transition-colors duration-200">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3 h-3 text-green-500 group-hover:animate-pulse" />
          <span className="text-green-400 text-xs font-mono group-hover:text-green-300 transition-colors duration-200">
            {language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-all duration-200 text-xs font-mono opacity-0 group-hover:opacity-100 cursor-pointer hover:bg-green-500/10 px-2 py-1 rounded active:scale-95"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with Shiki highlighting */}
      {isLoading ? (
        <pre className="bg-black border border-green-500/30 rounded-b-lg rounded-t-none p-4 overflow-x-auto font-mono text-sm !mt-0 group-hover:border-green-500/60 transition-colors duration-200">
          <code className="block font-mono text-green-400">{codeString}</code>
        </pre>
      ) : highlightedCode ? (
        <div
          className="shiki-container [&_.shiki-pre]:!mt-0 [&_.shiki-pre]:group-hover:border-green-500/60 [&_.shiki-pre]:transition-colors [&_.shiki-pre]:duration-200"
          dangerouslySetInnerHTML={{
            __html: highlightedCode.replace("<pre", "<pre"),
          }}
        />
      ) : (
        <pre className="bg-black border border-green-500/30 rounded-b-lg rounded-t-none p-4 overflow-x-auto font-mono text-sm !mt-0 group-hover:border-green-500/60 transition-colors duration-200">
          <code className="block font-mono text-green-400">{codeString}</code>
        </pre>
      )}
    </div>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMemo(
    () => ({
      // Headings
      h1: ({ children, ...props }: ComponentProps) => (
        <h1
          className="text-3xl font-mono font-bold text-green-400 mb-6 mt-8 first:mt-0"
          {...props}
        >
          {children}
        </h1>
      ),
      h2: ({ children, ...props }: ComponentProps) => (
        <h2
          className="text-2xl font-mono font-bold text-green-400 mb-4 mt-6"
          {...props}
        >
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: ComponentProps) => (
        <h3
          className="text-xl font-mono font-bold text-green-400 mb-3 mt-5"
          {...props}
        >
          {children}
        </h3>
      ),
      h4: ({ children, ...props }: ComponentProps) => (
        <h4
          className="text-lg font-mono font-bold text-green-400 mb-2 mt-4"
          {...props}
        >
          {children}
        </h4>
      ),
      h5: ({ children, ...props }: ComponentProps) => (
        <h5
          className="text-base font-mono font-bold text-green-400 mb-2 mt-3"
          {...props}
        >
          {children}
        </h5>
      ),
      h6: ({ children, ...props }: ComponentProps) => (
        <h6
          className="text-sm font-mono font-bold text-green-400 mb-2 mt-3"
          {...props}
        >
          {children}
        </h6>
      ),

      // Paragraphs
      p: ({ children, ...props }: ComponentProps) => (
        <p className="text-green-300 leading-relaxed mb-4" {...props}>
          {children}
        </p>
      ),

      // Links
      a: ({ children, href, ...props }: ComponentProps) => (
        <a
          href={href}
          className="text-green-400 underline hover:text-green-300 transition-colors"
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      ),

      // Text formatting
      strong: ({ children, ...props }: ComponentProps) => (
        <strong className="text-green-400 font-bold" {...props}>
          {children}
        </strong>
      ),
      em: ({ children, ...props }: ComponentProps) => (
        <em className="text-green-300 italic" {...props}>
          {children}
        </em>
      ),

      // Lists
      ul: ({ children, ...props }: ComponentProps) => (
        <ul className="text-green-300 list-disc mb-4 space-y-2 pl-6" {...props}>
          {children}
        </ul>
      ),
      ol: ({ children, ...props }: ComponentProps) => (
        <ol
          className="text-green-300 list-decimal mb-4 space-y-2 pl-6"
          {...props}
        >
          {children}
        </ol>
      ),
      li: ({ children, ...props }: ComponentProps) => (
        <li className="text-green-300 leading-relaxed" {...props}>
          {children}
        </li>
      ),

      // Blockquotes
      blockquote: ({ children, ...props }: ComponentProps) => (
        <blockquote
          className="border-l-2 border-green-500 pl-4 italic text-green-300 my-4 bg-green-500/5 py-2"
          {...props}
        >
          {children}
        </blockquote>
      ),

      // Code
      code: ({ children, className, ...props }: CodeBlockProps) => {
        // Inline code
        if (!className) {
          return (
            <code
              className="text-green-400 bg-black px-1 py-0.5 rounded font-mono text-sm border border-green-500/20"
              {...props}
            >
              {children}
            </code>
          );
        }

        // Block code - will be enhanced with Shiki
        return (
          <CodeBlock className={className} {...props}>
            {children}
          </CodeBlock>
        );
      },

      // Pre blocks (for code blocks)
      pre: ({ children, ...props }: ComponentProps) => {
        // If it contains a code element with language, let the CodeBlock component handle it
        if (
          typeof children === "object" &&
          children !== null &&
          "props" in children &&
          typeof children.props === "object" &&
          children.props !== null &&
          "className" in children.props &&
          typeof children.props.className === "string" &&
          children.props.className.startsWith("language-")
        ) {
          return children;
        }

        // For regular pre blocks without language
        return (
          <div
            className="relative group mb-4 transition-all duration-200 hover:scale-[1.002]"
            data-terminal-block
          >
            <div className="bg-black border border-green-500/30 border-b-0 rounded-t-lg px-4 py-2 flex items-center justify-between group-hover:border-green-500/60 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <Terminal className="w-3 h-3 text-green-500 group-hover:animate-pulse" />
                <span className="text-green-400 text-xs font-mono group-hover:text-green-300 transition-colors duration-200">
                  terminal
                </span>
              </div>
            </div>
            <pre
              className="bg-black border border-green-500/30 rounded-b-lg rounded-t-none p-4 overflow-x-auto font-mono text-sm group-hover:border-green-500/60 transition-colors duration-200 text-green-300"
              {...props}
            >
              {children}
            </pre>
          </div>
        );
      },

      // Tables
      table: ({ children, ...props }: ComponentProps) => (
        <div className="overflow-x-auto mb-4">
          <table
            className="min-w-full border border-green-500/30 rounded"
            {...props}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }: ComponentProps) => (
        <thead className="bg-green-500/10" {...props}>
          {children}
        </thead>
      ),
      tbody: ({ children, ...props }: ComponentProps) => (
        <tbody {...props}>{children}</tbody>
      ),
      tr: ({ children, ...props }: ComponentProps) => (
        <tr className="border-b border-green-500/20" {...props}>
          {children}
        </tr>
      ),
      th: ({ children, ...props }: ComponentProps) => (
        <th
          className="text-left text-green-400 font-mono font-bold p-3 border-r border-green-500/20 last:border-r-0"
          {...props}
        >
          {children}
        </th>
      ),
      td: ({ children, ...props }: ComponentProps) => (
        <td
          className="text-green-300 p-3 border-r border-green-500/20 last:border-r-0"
          {...props}
        >
          {children}
        </td>
      ),

      // Horizontal rule
      hr: ({ ...props }: ComponentProps) => (
        <hr className="border-green-500/30 my-6" {...props} />
      ),

      // Images
      img: ({ src, alt, ...props }: ComponentProps) => (
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded border border-green-500/30 my-4"
          {...props}
        />
      ),
    }),
    []
  );

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
