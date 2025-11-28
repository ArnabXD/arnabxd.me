import { useEffect } from "react";
import type { Route } from "./+types/blog.$slug";
import MatrixRain from "~/components/matrix-rain";
import { fetchPostBySlug } from "~/services/blogs";

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

  useEffect(() => {
    if (post.url) {
      const timer = setTimeout(() => {
        window.location.href = post.url;
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [post.url]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-4 overflow-hidden">
      {/* Subtle matrix background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Minimal header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 uppercase tracking-widest">
              Redirecting
            </span>
          </div>

          {/* Title with gradient effect */}
          <h1 className="text-2xl md:text-3xl font-bold text-green-100 mb-3 leading-tight">
            {post.title}
          </h1>

          {/* Brief description */}
          {post.brief && (
            <p className="text-green-500/60 text-sm max-w-lg mx-auto leading-relaxed">
              {post.brief}
            </p>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mb-8">
          <div className="h-1 bg-green-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full animate-[progress_2.5s_ease-in-out]"></div>
          </div>
        </div>

        {/* Minimal status */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 text-green-400/80 text-sm">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-mono">Taking you to Hashnode...</span>
          </div>

          {/* Manual link - more prominent */}
          <div className="pt-6 border-t border-green-900/30">
            <a
              href={post.url}
              className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors text-sm group"
            >
              <span>Continue manually</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Add keyframe animation for progress bar */}
      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
