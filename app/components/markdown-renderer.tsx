import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getHighlighter } from "~/utils/syntax-highlighter";

interface CodeBlockProps {
  children: string;
  className?: string;
  node?: any;
}

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  
  // For now, return a placeholder that will be enhanced with Shiki
  return (
    <pre className="bg-black border border-green-500/30 rounded p-4 overflow-x-auto font-mono text-sm">
      <code 
        className={`block font-mono text-green-400 ${className || ''}`}
        data-language={language}
        {...props}
      >
        {children}
      </code>
    </pre>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const components = useMemo(() => ({
    // Headings
    h1: ({ children, ...props }: any) => (
      <h1 className="text-3xl font-mono font-bold text-green-400 mb-6 mt-8 first:mt-0" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl font-mono font-bold text-green-400 mb-4 mt-6" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl font-mono font-bold text-green-400 mb-3 mt-5" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg font-mono font-bold text-green-400 mb-2 mt-4" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }: any) => (
      <h5 className="text-base font-mono font-bold text-green-400 mb-2 mt-3" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }: any) => (
      <h6 className="text-sm font-mono font-bold text-green-400 mb-2 mt-3" {...props}>
        {children}
      </h6>
    ),
    
    // Paragraphs
    p: ({ children, ...props }: any) => (
      <p className="text-green-300 leading-relaxed mb-4" {...props}>
        {children}
      </p>
    ),
    
    // Links
    a: ({ children, href, ...props }: any) => (
      <a 
        href={href}
        className="text-green-400 underline hover:text-green-300 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    
    // Text formatting
    strong: ({ children, ...props }: any) => (
      <strong className="text-green-400 font-bold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="text-green-300 italic" {...props}>
        {children}
      </em>
    ),
    
    // Lists
    ul: ({ children, ...props }: any) => (
      <ul className="text-green-300 list-disc mb-4 space-y-2 pl-6" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="text-green-300 list-decimal mb-4 space-y-2 pl-6" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-green-300 leading-relaxed" {...props}>
        {children}
      </li>
    ),
    
    // Blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-2 border-green-500 pl-4 italic text-green-300 my-4 bg-green-500/5 py-2" {...props}>
        {children}
      </blockquote>
    ),
    
    // Code
    code: ({ children, className, ...props }: CodeBlockProps) => {
      // Inline code
      if (!className) {
        return (
          <code className="text-green-400 bg-black px-1 py-0.5 rounded font-mono text-sm border border-green-500/20" {...props}>
            {children}
          </code>
        );
      }
      
      // Block code - will be enhanced with Shiki
      return <CodeBlock className={className} {...props}>{children}</CodeBlock>;
    },
    
    // Pre blocks (for code blocks)
    pre: ({ children, ...props }: any) => {
      // If it contains a code element, let the code component handle it
      if (children?.props?.className?.startsWith('language-')) {
        return children;
      }
      
      return (
        <pre className="bg-black border border-green-500/30 rounded p-4 overflow-x-auto font-mono text-sm mb-4" {...props}>
          {children}
        </pre>
      );
    },
    
    // Tables
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-green-500/30 rounded" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-green-500/10" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }: any) => (
      <tbody {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }: any) => (
      <tr className="border-b border-green-500/20" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }: any) => (
      <th className="text-left text-green-400 font-mono font-bold p-3 border-r border-green-500/20 last:border-r-0" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="text-green-300 p-3 border-r border-green-500/20 last:border-r-0" {...props}>
        {children}
      </td>
    ),
    
    // Horizontal rule
    hr: ({ ...props }: any) => (
      <hr className="border-green-500/30 my-6" {...props} />
    ),
    
    // Images
    img: ({ src, alt, ...props }: any) => (
      <img 
        src={src} 
        alt={alt}
        className="max-w-full h-auto rounded border border-green-500/30 my-4"
        {...props}
      />
    ),
  }), []);

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