import { useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";

import type { Route } from "./+types/blog.$slug";
import MatrixRain from "~/components/matrix-rain";
import { fetchPostBySlug } from "~/services/blogs";
import MarkdownRenderer from "~/components/markdown-renderer";
import { useSyntaxHighlighting } from "~/hooks/use-syntax-highlighting";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return Response.redirect("/", 302);
  }

  try {
    const post = await fetchPostBySlug(slug);
    return { post };
  } catch (error) {
    throw new Response("Post not found", { status: 200 });
  }
};

export function meta({ data }: Route.MetaArgs) {
  if (!data?.post) {
    return [
      { title: "Post Not Found" },
      {
        name: "description",
        content: "The requested blog post could not be found.",
      },
    ];
  }

  return [
    { title: `${data.post.title} | Arnab Paryali` },
    { name: "description", content: data.post.brief },
    { name: "og:title", content: data.post.title },
    { name: "og:description", content: data.post.brief },
    { name: "og:image", content: data.post.coverImage?.url || "/og_image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.brief },
    {
      name: "twitter:image",
      content: data.post.coverImage?.url || "/og_image.jpg",
    },
  ];
}

const BlogPost = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;
  const contentRef = useRef<HTMLDivElement>(null);

  // Apply syntax highlighting to code blocks after render
  useSyntaxHighlighting(contentRef);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden">
      {/* Matrix background - same opacity as home page */}
      <div className="fixed inset-0 opacity-30 pointer-events-none transition-opacity delay-500">
        <MatrixRain />
      </div>

      {/* Main container - same width as home page */}
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="animate-fadeIn">
          {/* Terminal header with navigation */}
          <div className="mb-8 bg-black border border-green-900 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-green-400 text-sm font-mono">
                  ~/blog/
                  {post.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]/g, "-")
                    .replace(/-+/g, "-")}
                  .md
                </span>
              </div>
              <Link
                to="/"
                className="inline-flex items-center text-green-400 border border-green-900 px-3 py-1 rounded bg-black hover:bg-green-900/20 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                exit
              </Link>
            </div>
          </div>

          {/* Terminal command simulation with typing effect */}
          <div className="mb-6 bg-black border border-green-900 rounded-lg p-4 text-sm">
            <div className="text-green-400 mb-2">
              <span className="text-green-500 mr-2">
                arnab@portfolio:~/blog$
              </span>
              <span className="animate-pulse">cat post.md</span>
            </div>
            <div className="text-green-300 flex items-center">
              <span>Opening file...</span>
              <span className="animate-ping ml-2 text-green-400">●</span>
              <span className="animate-pulse ml-2">▋</span>
            </div>
          </div>

          {/* Post article with enhanced styling */}
          <article className="bg-gradient-to-br from-black to-gray-900 border border-green-900 rounded-lg overflow-hidden">
            {/* Article header section */}
            <header className="border-b border-green-900/50 bg-black p-6 md:p-8">
              <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">
                  {"$ jq '.metadata' post.json"}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-6 leading-tight hover:text-green-300 transition-colors duration-300 cursor-default">
                <span className="relative inline-block">
                  {post.title}
                  <span className="absolute inset-0 animate-pulse opacity-30 text-green-500">
                    {post.title}
                  </span>
                </span>
              </h1>

              {/* Stats in enhanced terminal style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-black border border-green-900 rounded-lg p-4 hover:border-green-500 transition-all duration-300 group">
                  <div className="flex items-center text-green-300 mb-2">
                    <Calendar className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    <span className="text-xs font-mono opacity-70">
                      PUBLISHED
                    </span>
                  </div>
                  <div className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors">
                    {post.publishedAt}
                  </div>
                </div>
                <div className="bg-black border border-green-900 rounded-lg p-4 hover:border-green-500 transition-all duration-300 group">
                  <div className="flex items-center text-green-300 mb-2">
                    <Clock className="w-5 h-5 mr-2 group-hover:animate-spin" />
                    <span className="text-xs font-mono opacity-70">
                      READ_TIME
                    </span>
                  </div>
                  <div className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors">
                    {post.readTimeInMinutes} min
                  </div>
                </div>
                <div className="bg-black border border-green-900 rounded-lg p-4 hover:border-green-500 transition-all duration-300 group">
                  <div className="flex items-center text-green-300 mb-2">
                    <Eye className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    <span className="text-xs font-mono opacity-70">VIEWS</span>
                  </div>
                  <div className="text-green-400 font-bold text-lg group-hover:text-green-300 transition-colors">
                    {post.views}
                  </div>
                </div>
              </div>

              {/* Tags as file system with enhanced styling */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-green-400 text-xs mb-3 opacity-70 border-l-2 border-green-500 pl-3">
                    <span className="font-mono">
                      {'$ find ./tags -name "*.tag" | sort'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm border border-green-900 rounded-lg bg-black text-green-400 font-mono hover:border-green-500 hover:bg-green-900/20 transition-all duration-300 cursor-default"
                      >
                        {tag.toLowerCase()}.tag
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Brief as enhanced code block */}
              {post.brief && (
                <div className="bg-black border border-green-900 rounded-lg p-5 hover:border-green-500 transition-colors">
                  <div className="text-green-400 text-xs mb-3 opacity-70 font-mono">
                    $ head -n 3 README.md
                  </div>
                  <p className="text-green-300 leading-relaxed text-lg italic">
                    {post.brief}
                  </p>
                </div>
              )}
            </header>

            {/* Cover image section with enhanced styling */}
            {post.coverImage?.url && (
              <div className="border-b border-green-900/50 bg-black p-6 md:p-8">
                <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                  <span className="font-mono">
                    $ file cover_image.jpg && identify cover_image.jpg
                  </span>
                </div>
                <div className="border border-green-900 rounded-lg overflow-hidden bg-black p-3 hover:border-green-500 transition-colors">
                  <img
                    src={post.coverImage.url}
                    alt={post.title}
                    className="w-full rounded"
                  />
                </div>
              </div>
            )}

            {/* Content section with solid background */}
            <div className="bg-black p-6 md:p-8">
              <div className="text-green-400 text-xs mb-6 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">
                  $ pandoc -f markdown -t html post.md | less
                </span>
              </div>

              <div
                ref={contentRef}
                className="prose prose-invert prose-green max-w-none prose-lg bg-gradient-to-br from-black to-gray-900 border border-green-900 rounded-lg p-6 md:p-8 relative overflow-hidden group"
              >
                {/* Subtle scan line effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
                </div>
                <MarkdownRenderer content={post.content.markdown} />
              </div>
            </div>

            {/* Footer section with enhanced styling */}
            <footer className="border-t border-green-900/50 bg-black p-6 md:p-8">
              <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">$ open -u {post.url}</span>
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 border border-green-900 px-6 py-3 rounded-lg bg-black hover:border-green-500 hover:bg-green-900/20 hover:text-green-300 transition-all duration-300 font-mono text-lg group"
              >
                <span className="group-hover:animate-pulse">
                  View Original Post →
                </span>
              </a>
            </footer>
          </article>

          {/* Enhanced terminal footer */}
          <div className="mt-8 bg-black border border-green-900 rounded-lg p-4 text-sm hover:border-green-500 transition-all duration-300">
            <div className="text-green-400 mb-2">
              <span className="text-green-500 animate-pulse">$</span> tail -1
              post.md
            </div>
            <div className="text-green-300 mb-2 pl-2">
              # Thanks for reading! 🚀
            </div>
            <div className="text-green-400 mb-2">
              <span className="text-green-500 animate-pulse">$</span> cd .. &&
              ls
            </div>
            <div className="flex items-center text-green-400">
              <span>arnab@portfolio:~$</span>
              <span className="animate-ping ml-2 text-green-500">▋</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
