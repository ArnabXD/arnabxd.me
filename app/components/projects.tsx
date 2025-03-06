import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  period: string;
  description: string;
  tech: string[];
  link: string;
}

const ProjectCard = ({
  title,
  period,
  description,
  tech,
  link,
}: ProjectCardProps) => (
  <div className="bg-gradient-to-br from-black to-gray-900 p-5 rounded-lg border border-green-900 hover:border-green-500 transition-all duration-300 group hover:shadow-lg hover:shadow-green-900/30">
    <div className="flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center mb-3">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
          {title}
        </h3>
      </div>
      <span className="text-xs bg-black border border-green-700 text-green-500 px-2 py-1 rounded-full">
        {period}
      </span>
    </div>
    <p className="text-sm mb-4 opacity-80 pl-4 border-l border-green-900 group-hover:border-green-500 transition-colors line-clamp-3">
      {description}
    </p>
    <div className="flex flex-wrap gap-2 mb-4">
      {tech.map((item, index) => (
        <span
          key={`${title}-tech-${index}`}
          className="text-xs px-2 py-1 bg-black border border-green-900 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
    <div className="pt-2 border-t border-green-900/50 flex justify-between items-center">
      <span className="text-xs text-green-500 opacity-70">
        ./projects/{title.toLowerCase().replace(/\s+/g, "-")}
      </span>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-xs text-green-500 hover:text-white transition-colors duration-300"
      >
        <SiGithub className="w-3 h-3 mr-1" />
        <span className="mr-1">View source</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  </div>
);

export interface ProjectProps {
  data: {
    title: string;
    period: string;
    description: string;
    tech: string[];
    link: string;
  }[];
}

export default function Projects({ data }: ProjectProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      {data.map((project, index) => (
        <ProjectCard key={`project-item-${index}`} {...project} />
      ))}
    </div>
  );
}
