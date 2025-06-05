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
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none transition-opacity delay-500">
        <MatrixRain />
      </div>

      {/* Main container */}
      <div className="mx-auto max-w-4xl">
        <div className="animate-fadeIn">
          {/* Back button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors border border-green-900 px-4 py-2 rounded hover:border-green-500 hover:bg-green-500/10 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:text-green-300" />
              <span className="font-mono">cd ../</span>
            </Link>
          </div>

          {/* Post header */}
          <article className="bg-black border border-green-900 rounded-lg p-6 md:p-8 hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/30">
          <header className="mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-green-400 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-green-300 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.publishedAt}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTimeInMinutes} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs border border-green-900 rounded bg-green-500/10 text-green-400 hover:border-green-500 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {post.brief && (
              <p className="text-green-300 text-lg leading-relaxed border-l-2 border-green-500 pl-4 italic">
                {post.brief}
              </p>
            )}
          </header>

          {/* Cover image */}
          {post.coverImage?.url && (
            <div className="mb-8">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full rounded border border-green-900 hover:border-green-500 transition-colors duration-300"
              />
            </div>
          )}

          {/* Post content with markdown rendering and syntax highlighting */}
          <div ref={contentRef} className="prose prose-invert prose-green max-w-none">
            <MarkdownRenderer content={post.content.markdown} />
          </div>

          {/* External link */}
          <div className="mt-8 pt-6 border-t border-green-900">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors border border-green-900 px-4 py-2 rounded hover:border-green-500 hover:bg-green-500/10 group"
            >
              <span className="group-hover:text-green-300">Read on Hashnode →</span>
            </a>
          </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
