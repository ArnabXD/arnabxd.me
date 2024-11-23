import { useRef } from "react";
import type {
  ActionFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json, useActionData, useLoaderData } from "@remix-run/react";
import Blogs, { BlogData } from "~/components/blogs";
import Contact from "~/components/contact";
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

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log(request.method);
  return json({ success: true });
};

export default function Index() {
  const blogData = useLoaderData<BlogData>();
  const actionData = useActionData<typeof action>();
  const contactUsRef = useRef<HTMLDivElement>(null);
  const onContactClick = () => {
    contactUsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="main">
      <Hero onContactClick={onContactClick} />
      <Blogs data={blogData} />
      <Contact data={actionData} headerRef={contactUsRef} />
    </div>
  );
}
