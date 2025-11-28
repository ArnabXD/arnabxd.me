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
      // Small delay to show the effect
      const timer = setTimeout(() => {
        window.location.href = post.url;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [post.url]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <MatrixRain />
      </div>

      <div className="relative z-10 max-w-2xl w-full bg-black border border-green-900 rounded-lg p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
        <div className="flex items-center justify-between mb-4 border-b border-green-900 pb-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-green-700">redirect.sh</div>
        </div>

        <div className="space-y-2 font-mono text-sm md:text-base">
          <div className="flex">
            <span className="text-green-300 mr-2">➜</span>
            <span className="text-blue-400">~</span>
            <span className="ml-2">./redirect.sh --target="{post.title}"</span>
          </div>

          <div className="text-green-400 animate-pulse">
            [INFO] Initiating jump sequence...
          </div>

          <div className="text-gray-500">
            Target: <span className="text-green-600">{post.url}</span>
          </div>

          <div className="flex items-center space-x-2 text-green-300 mt-4">
            <span className="animate-spin">⠋</span>
            <span>Redirecting to original post...</span>
          </div>

          <div className="mt-8 pt-4 border-t border-green-900/50 text-xs text-center text-gray-500">
            <p>
              If you are not redirected automatically,{" "}
              <a
                href={post.url}
                className="text-green-400 hover:underline hover:text-green-300"
              >
                click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
