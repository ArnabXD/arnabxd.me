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
import { sendMessage, contactSchema, Env } from "~/services/telegram";

export const meta: MetaFunction = () => {
  return [
    { title: "ArnabXD" },
    { name: "description", content: "Portfolio website of Arnab Paryali" },
  ];
};

export const loader: LoaderFunction = async () => {
  return await fetchLatestPosts("ArnabXD", 3);
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const body = await request.formData();
  const jsonData = contactSchema.safeParse(Object.fromEntries(body));
  let success = false;

  if (!jsonData.success) {
    return json({ success: false });
  }

  if (jsonData.data) {
    success = await sendMessage(context.cloudflare.env as Env, {
      name: jsonData.data.firstName + " " + jsonData.data.lastName,
      email: jsonData.data.email,
      message: jsonData.data.message,
    });
  }

  return json({ success });
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
