import { useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";

import type { Route } from "./+types/blog.$postId";
import MatrixRain from "~/components/matrix-rain";
import { fetchPostById } from "~/services/blogs";
import MarkdownRenderer from "~/components/markdown-renderer";
import { useSyntaxHighlighting } from "~/hooks/use-syntax-highlighting";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { postId } = params;

  if (!postId) {
    throw new Response("Post not found", { status: 404 });
  }

  try {
    const post = await fetchPostById(postId);
    return { post };
  } catch (error) {
    throw new Response("Post not found", { status: 404 });
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
      {/* Matrix background - dimmed for content focus */}
      <div className="fixed inset-0 opacity-15 pointer-events-none transition-opacity delay-500">
        <MatrixRain />
      </div>

      {/* Main container - same width as home page */}
      <div className="mx-auto max-w-4xl relative z-10">
        <div className="animate-fadeIn">
          {/* Terminal header with navigation */}
          <div className="mb-8 bg-gray-900 border-2 border-green-900 rounded-lg p-4 shadow-lg shadow-green-900/20">
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
                </span>
              </div>
              <Link
                to="/"
                className="inline-flex items-center text-green-400 border-2 border-green-900 px-3 py-1 rounded bg-black hover:bg-green-900/20 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                exit
              </Link>
            </div>
          </div>

          {/* Terminal command simulation with typing effect */}
          <div className="mb-6 bg-gray-900 border-2 border-green-900 rounded-lg p-4 text-sm shadow-lg shadow-green-900/20">
            <div className="text-green-400 mb-2 flex items-center">
              <span className="text-green-500 mr-2">arnab@portfolio:~$</span>
              <span>cat blog_post.md</span>
            </div>
            <div className="text-green-300 flex items-center">
              <span>Reading file...</span>
              <span className="animate-pulse ml-2">▋</span>
            </div>
          </div>

          {/* Post article with enhanced styling */}
          <article className="bg-gray-900 border-2 border-green-900 rounded-lg overflow-hidden shadow-2xl shadow-green-900/30">
            {/* Article header section */}
            <header className="border-b-2 border-green-900 bg-black p-6 md:p-8">
              <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">{"// POST_METADATA.json"}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-green-400 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Stats in enhanced terminal style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-black border-2 border-green-900 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-center text-green-300 mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-xs font-mono opacity-70">
                      PUBLISHED
                    </span>
                  </div>
                  <div className="text-green-400 font-bold text-lg">
                    {post.publishedAt}
                  </div>
                </div>
                <div className="bg-black border-2 border-green-900 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-center text-green-300 mb-2">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="text-xs font-mono opacity-70">
                      READ_TIME
                    </span>
                  </div>
                  <div className="text-green-400 font-bold text-lg">
                    {post.readTimeInMinutes} min
                  </div>
                </div>
                <div className="bg-black border-2 border-green-900 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-center text-green-300 mb-2">
                    <Eye className="w-5 h-5 mr-2" />
                    <span className="text-xs font-mono opacity-70">VIEWS</span>
                  </div>
                  <div className="text-green-400 font-bold text-lg">
                    {post.views}
                  </div>
                </div>
              </div>

              {/* Tags as file system with enhanced styling */}
              {post.tags && post.tags.length > 0 && (
                <div className="mb-6">
                  <div className="text-green-400 text-xs mb-3 opacity-70 border-l-2 border-green-500 pl-3">
                    <span className="font-mono">$ ls ./tags/</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 text-sm border-2 border-green-900 rounded-lg bg-black text-green-400 font-mono hover:border-green-500 transition-colors"
                      >
                        {tag.toLowerCase()}.tag
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Brief as enhanced code block */}
              {post.brief && (
                <div className="bg-black border-2 border-green-900 rounded-lg p-5 hover:border-green-500 transition-colors">
                  <div className="text-green-400 text-xs mb-3 opacity-70 font-mono">
                    {"/* BRIEF: Article Summary */"}
                  </div>
                  <p className="text-green-300 leading-relaxed text-lg italic">
                    {'"{post.brief}"'}
                  </p>
                </div>
              )}
            </header>

            {/* Cover image section with enhanced styling */}
            {post.coverImage?.url && (
              <div className="border-b-2 border-green-900 bg-black p-6 md:p-8">
                <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                  <span className="font-mono">$ display cover_image.jpg</span>
                </div>
                <div className="border-2 border-green-900 rounded-lg overflow-hidden bg-gray-900 p-3 hover:border-green-500 transition-colors">
                  <img
                    src={post.coverImage.url}
                    alt={post.title}
                    className="w-full rounded"
                  />
                </div>
              </div>
            )}

            {/* Content section with solid background */}
            <div className="bg-gray-900 p-6 md:p-8">
              <div className="text-green-400 text-xs mb-6 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">{"// ARTICLE_CONTENT.md"}</span>
              </div>

              <div
                ref={contentRef}
                className="prose prose-invert prose-green max-w-none prose-lg bg-black border-2 border-green-900 rounded-lg p-6 md:p-8"
              >
                <MarkdownRenderer content={post.content.markdown} />
              </div>
            </div>

            {/* Footer section with enhanced styling */}
            <footer className="border-t-2 border-green-900 bg-black p-6 md:p-8">
              <div className="text-green-400 text-xs mb-4 opacity-70 border-l-2 border-green-500 pl-3">
                <span className="font-mono">
                  $ curl -X GET hashnode.dev/api
                </span>
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 border-2 border-green-900 px-6 py-3 rounded-lg bg-gray-900 hover:border-green-500 hover:bg-green-900/20 transition-all font-mono text-lg"
              >
                <span>View Original Post →</span>
              </a>
            </footer>
          </article>

          {/* Enhanced terminal footer */}
          <div className="mt-8 bg-gray-900 border-2 border-green-900 rounded-lg p-4 text-sm shadow-lg shadow-green-900/20">
            <div className="text-green-400 mb-2">
              <span className="text-green-500">$</span> # EOF - End of file
              reached
            </div>
            <div className="text-green-400 mb-2">
              <span className="text-green-500">$</span>
              {' echo "Thanks for reading!"'}
            </div>
            <div className="flex items-center text-green-400">
              <span>arnab@portfolio:~/blog$</span>
              <span className="animate-pulse ml-2">▋</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
