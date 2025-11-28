import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Loader2, Code } from "lucide-react";

import type { Route } from "./+types/blog._index";
import MatrixRain from "~/components/matrix-rain";
import Header from "~/components/header";
import SectionHeader from "~/components/section-header";
import Footer from "~/components/footer";
import Blogs from "~/components/blogs";
import fetchLatestPosts from "~/services/blogs";
import data from "~/data";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = 9; // Load 9 posts per page

  const data = await fetchLatestPosts("ArnabXD", limit, page);
  return { ...data, page };
};

export function meta() {
  return [
    { title: "Blogs | Arnab Paryali" },
    { name: "description", content: "Read my latest thoughts and tutorials." },
  ];
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { posts: initialPosts, page } = loaderData;
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(initialPosts.length === 9); // Assuming if we get full limit, there might be more
  const fetcher = useFetcher<typeof loader>();

  // Update posts when initial loader data changes (e.g. navigation)
  useEffect(() => {
    setPosts(initialPosts);
    setHasMore(initialPosts.length === 9);
  }, [initialPosts]);

  // Append new posts when fetcher loads data
  useEffect(() => {
    if (fetcher.data) {
      const newPosts = fetcher.data.posts;
      setPosts((prev) => [...prev, ...newPosts]);
      setHasMore(newPosts.length === 9);
    }
  }, [fetcher.data]);

  const loadMore = () => {
    const nextPage = Math.ceil(posts.length / 9) + 1;
    fetcher.load(`/blog?page=${nextPage}`);
  };

  const isLoading = fetcher.state === "loading";

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none transition-opacity delay-500">
        <MatrixRain />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="animate-fadeIn">
          {/* Header */}
          <Header contactInfo={data.contactInfo} />

          {/* Blogs Section */}
          <section className="mb-12">
            <SectionHeader icon={<Code />} title="ALL_POSTS" />
            <Blogs data={posts} />

            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="inline-flex items-center px-6 py-3 border border-green-900 rounded bg-black text-green-400 hover:bg-green-900/20 hover:border-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">./load_more.sh</span>
                      <span className="group-hover:translate-y-1 transition-transform">
                        ↓
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasMore && posts.length > 0 && (
              <div className="mt-12 text-center text-green-800 text-sm">
                # End of buffer
              </div>
            )}
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
