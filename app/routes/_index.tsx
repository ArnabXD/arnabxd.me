import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Blogs, { BlogData } from "~/components/blogs";
import Hero from "~/components/hero";
import fetchLatestPosts from "~/services/blogs";

export const meta: MetaFunction = () => {
  return [
    { title: "ArnabXD" },
    { name: "description", content: "Portfolio website of Arnab Paryali" },
  ];
};

export const loader: LoaderFunction = async () => {
  return await fetchLatestPosts("ArnabXD", 3);
};

export default function Index() {
  const data = useLoaderData<BlogData>();

  return (
    <div className="main">
      <Hero />
      <Blogs blogData={data} />
    </div>
  );
}
