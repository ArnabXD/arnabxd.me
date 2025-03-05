import { Mail, MapPin } from "lucide-react";

const DATA = {
  experience: [
    {
      title: "Software Engineer",
      company: "Indus Net Technologies",
      period: "September 2024 - Present",
      responsibilities: [
        // "Co-Leading 2 Projects",
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
    // {
    //   icon: <Phone className="w-4 h-4 mr-2 text-green-500" />,
    //   text: "8910369288",
    // },
    {
      icon: <MapPin className="w-4 h-4 mr-2 text-green-500" />,
      text: "Kolkata",
    },
  ],
};

export default DATA;
