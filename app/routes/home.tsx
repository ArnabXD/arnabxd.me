import { useState, useEffect } from "react";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arnab | arnabxd.me" },
    { name: "description", content: "Arnab's Portfolio" },
  ];
}

import {
  Terminal,
  Code,
  Briefcase,
  User,
  Book,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import Loader from "~/components/loader";
import Header from "~/components/header";
import SectionHeader from "~/components/section-header";
import WorkExperienceCard from "~/components/work-experience";
import MatrixRain from "~/components/matrix-rain";
import Education from "~/components/education";
import Projects from "~/components/projects";
import Blogs from "~/components/blogs";
import Skills from "~/components/skills";
import Footer from "~/components/footer";

// Data objects
const data = {
  experience: [
    {
      title: "Software Engineer",
      company: "Indus Net Technologies",
      period: "September 2024 - Present",
      responsibilities: [
        "Co-Leading 2 Projects",
        "Project Scoping & Feasibility Study, SOW listing",
        "Worked on Next JS & React Native",
      ],
    },
    {
      title: "Asst. Tech Lead, Developer",
      company: "Qubited",
      period: "July 2022 - August 2024",
      responsibilities: [
        "Promoted to Asst Tech Lead on Feb 2023",
        "React Native apps with features like realtime data sync, twilio chat, animations and more",
        "Firebase JS SDK, NodeJS APIs",
        "Worked on React-Native apps",
      ],
    },
    {
      title: "Developer",
      company: "Freelancer",
      period: "April 2021 - June 2022",
      responsibilities: ["NextJS, React, React-Native"],
    },
  ],
  projects: [
    {
      title: "TGVCBot",
      period: "Aug 2021 - Jan 2023",
      description:
        "A music streaming bot for Telegram, using JioSaavn and YT Music as source. Got to learn Media Transcoding.",
      tech: ["NodeJS", "Telegram", "TypeScript"],
      link: "https://github.com/ArnabXD/TGVCBot",
    },
    {
      title: "DropBox Index",
      period: "Dec 2021 - Aug 2022",
      description:
        "A simple website that allows you to public a specific folder or all dropbox files.",
      tech: ["NextJS", "TypeScript", "Tailwind"],
      link: "https://github.com/ArnabXD/Dropbox-Index",
    },
    {
      title: "XorGram",
      period: "Jan 2022 - Aug 2022",
      description:
        "A telegram userbot, that let's you utilize the power of telegram API through using commands.",
      tech: ["Deno", "TypeScript"],
      link: "https://github.com/xorgram",
    },
  ],
  blogs: [
    {
      title: "Understanding React Native Animations",
      date: "March 1, 2025",
      excerpt:
        "A deep dive into React Native's Animated API and how to create fluid user experiences.",
      tags: ["React Native", "Animation", "UI/UX"],
      readTime: "5 min read",
    },
    {
      title: "TypeScript Best Practices",
      date: "February 15, 2025",
      excerpt:
        "Exploring TypeScript patterns that improved my code quality and developer experience.",
      tags: ["TypeScript", "Best Practices"],
      readTime: "7 min read",
    },
    {
      title: "Firebase + React Native: A Complete Guide",
      date: "January 28, 2025",
      excerpt:
        "Setting up Firebase with React Native for authentication, real-time database, and more.",
      tags: ["Firebase", "React Native", "Backend"],
      readTime: "10 min read",
    },
  ],
  skills: [
    {
      title: "FRONTEND_SKILLS",
      skills: [
        "React-Native",
        "React",
        "TypeScript",
        "JavaScript (ES6+)",
        "Redux",
        "Context API",
        "Jotai",
        "Animations",
      ],
    },
    {
      title: "BACKEND_SKILLS",
      skills: [
        "Node.js",
        "Deno",
        "Firebase",
        "Git",
        "Debugging",
        "REST APIs",
        "Database Design",
      ],
    },
  ],
  contactInfo: [
    {
      icon: <Mail className="w-4 h-4 mr-2 text-green-500" />,
      text: "arnabxd@proton.me",
    },
    {
      icon: <Phone className="w-4 h-4 mr-2 text-green-500" />,
      text: "8910369288",
    },
    {
      icon: <MapPin className="w-4 h-4 mr-2 text-green-500" />,
      text: "Kolkata",
    },
  ],
};

const Home = () => {
  const [text, setText] = useState<string>("");
  const fullText = "System initialized... Access granted.";
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showHiddenTerminal, setShowHiddenTerminal] = useState<boolean>(false);

  // Typewriter effect & Easter eggs
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(
        () => setText(fullText.slice(0, text.length + 1)),
        100
      );
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [text]);

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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showContent]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 overflow-x-hidden">
      {/* Matrix background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <MatrixRain />
      </div>

      {/* Loader terminal */}
      <div className="mx-auto max-w-4xl">
        {!showContent && <Loader text={text} fullText={fullText} />}

        {showContent && (
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
              <Blogs data={data.blogs} />
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
              className={`hidden-terminal ${
                showHiddenTerminal ? "active" : ""
              }`}
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
                  You found the easter egg! Here's a joke: Why do programmers
                  prefer dark mode? Because light attracts bugs!
                </p>
                <div className="flex">
                  <span className="text-green-500 text-xs">$</span>
                  <span className="text-xs ml-1 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
