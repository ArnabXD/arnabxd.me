/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";

import type { Route } from "./+types/_index";
import { Terminal, Code, Briefcase, User, Book } from "lucide-react";

import Header from "~/components/header";
import SectionHeader from "~/components/section-header";
import WorkExperienceCard from "~/components/work-experience";
import Education from "~/components/education";
import Projects from "~/components/projects";
import Blogs from "~/components/blogs";
import Skills from "~/components/skills";
import ContactMe from "~/components/contact";
import Footer from "~/components/footer";
import {
  HiddenTerminal,
  MatrixEffect,
  useEasterEgg,
} from "~/components/easter-egg";

import data from "~/data";

import fetchLatestPosts from "~/services/blogs";
import { contactSchema, sendMessage } from "~/services/telegram";

export const loader = async () => {
  return await fetchLatestPosts("ArnabXD", 3);
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  const body = await request.json();
  const jsonData = contactSchema.safeParse(body);
  let success = false;

  if (!jsonData.success) {
    return Response.json({ success: false });
  }

  if (jsonData.data) {
    success = await sendMessage(context.cloudflare.env, {
      name: jsonData.data.name,
      email: jsonData.data.email,
      message: jsonData.data.message,
    });
  }

  return Response.json({ success });
};

export function meta() {
  return [
    { title: "Arnab | arnabxd.me" },
    { name: "description", content: "Arnab's Portfolio" },
  ];
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const { activeEasterEgg, initEasterEggs, closeEasterEgg } = useEasterEgg();

  // Initialize easter eggs
  useEffect(() => {
    const cleanup = initEasterEggs();
    return cleanup;
  }, [initEasterEggs]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none transition-opacity delay-500">
        {/* <MatrixRain /> */}
      </div>

      {/* Loader terminal */}
      <div className="mx-auto max-w-4xl">
        <div className="animate-fadeIn">
          {/* Header */}
          <Header contactInfo={data.contactInfo} />

          {/* Work Experience */}
          <section className="mb-12">
            <SectionHeader icon={<Briefcase />} title="WORK_EXPERIENCE" />
            <WorkExperienceCard data={data.experience} />
          </section>

          {/* Education */}
          <section className="mb-12">
            <SectionHeader icon={<Book />} title="EDUCATION" />
            <Education />
          </section>

          {/* Projects */}
          <section className="mb-12">
            <SectionHeader icon={<Terminal />} title="PROJECTS" />
            <Projects data={data.projects} />
          </section>

          {/* Blogs */}
          <section className="mb-12">
            <SectionHeader icon={<Code />} title="BLOGS" />
            <Blogs data={loaderData.posts} />
          </section>

          {/* Skills */}
          <section className="mb-12">
            <SectionHeader icon={<User />} title="SKILLS" />
            <Skills data={data.skills} />
          </section>

          <section className="mb-12">
            <SectionHeader icon={<User />} title="CONTACT_ME" />
            <ContactMe />
          </section>

          {activeEasterEgg === "matrix" && <MatrixEffect />}
          <dialog
            open={activeEasterEgg === "terminal"}
            className="backdrop:backdrop-blur-sm"
          >
            <HiddenTerminal
              key={`isOpen-${activeEasterEgg === "terminal"}`}
              onClose={closeEasterEgg}
            />
          </dialog>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
