import { useState, useEffect } from "react";

import type { Route } from "./+types/_index";

import { Terminal, Code, Briefcase, User, Book } from "lucide-react";

import Header from "~/components/header";
import SectionHeader from "~/components/section-header";
import WorkExperienceCard from "~/components/work-experience";
import Education from "~/components/education";
import Projects from "~/components/projects";
import Blogs from "~/components/blogs";
import Skills from "~/components/skills";
import Footer from "~/components/footer";

import data from "~/data";
import fetchLatestPosts from "~/services/blogs";
import MatrixRain from "~/components/matrix-rain";

export const loader = async () => {
  return await fetchLatestPosts("ArnabXD", 3);
};

export function meta() {
  return [
    { title: "Arnab | arnabxd.me" },
    { name: "description", content: "Arnab's Portfolio" },
  ];
}

const Home = ({ loaderData }: Route.ComponentProps) => {
  const [, setEasterEggInput] = useState<string>("");
  const [showHiddenTerminal, setShowHiddenTerminal] = useState<boolean>(false);

  // Konami code & 'hack' command
  useEffect(() => {
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    const keysPressed: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.push(e.key);
      if (keysPressed.length > konamiSequence.length) keysPressed.shift();

      if (JSON.stringify(keysPressed) === JSON.stringify(konamiSequence)) {
        document.body.classList.add("matrix-mode");
        setTimeout(() => document.body.classList.remove("matrix-mode"), 5000);
      }

      setEasterEggInput((prev) => {
        const updated = prev + e.key;
        const lastFour = updated.slice(-4);
        if (lastFour === "hack") {
          setShowHiddenTerminal(true);
          return "";
        }
        return updated.length > 10 ? updated.slice(-10) : updated;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none transition-opacity delay-500">
        <MatrixRain />
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

          {/* Footer */}
          <Footer />

          {/* Hidden Terminal Easter Egg */}
          <div
            className={`hidden-terminal ${showHiddenTerminal ? "active" : ""}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-500 text-sm">Secret Terminal</span>
              <button
                onClick={() => setShowHiddenTerminal(false)}
                className="text-red-500 hover:text-red-300"
              >
                x
              </button>
            </div>
            <div className="terminal-content">
              <p className="text-green-500 text-xs mb-1">$ whoami</p>
              <p className="text-xs mb-2">Arnab Paryali - Developer</p>
              <p className="text-green-500 text-xs mb-1">$ cat secret.txt</p>
              <p className="text-xs mb-2">
                You found the easter egg! Here&apos;s a joke: Why do programmers
                prefer dark mode? Because light attracts bugs!
              </p>
              <div className="flex">
                <span className="text-green-500 text-xs">$</span>
                <span className="text-xs ml-1 animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
