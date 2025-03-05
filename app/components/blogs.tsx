import { ExternalLink } from "lucide-react";

export interface BlogsProps {
  data: {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readTime: string;
  }[];
}

export default function Blogs({ data }: BlogsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      {data.map((blog, index) => (
        <BlogCard key={`blog-${index}`} {...blog} />
      ))}
    </div>
  );
}

interface BlogCardProps {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
}

function BlogCard({ title, date, excerpt, tags, readTime }: BlogCardProps) {
  return (
    <div className="border border-green-900 p-4 rounded-md hover:border-green-500 transition-all duration-300 bg-black bg-opacity-70 transform hover:-translate-y-1 group">
      <div className="border-l-2 pl-2 border-green-500 mb-2">
        <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors">
          {title}
        </h3>
      </div>
      <div className="flex justify-between items-center mb-3 text-xs">
        <span className="text-green-400">{date}</span>
        <span className="bg-green-900 bg-opacity-50 px-2 py-1 rounded">
          {readTime}
        </span>
      </div>
      <p className="text-sm mb-4 opacity-80">{excerpt}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-black border border-green-900 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end">
        <a
          href="#"
          className="text-green-500 text-xs hover:text-white transition-colors inline-flex items-center"
        >
          READ_MORE <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
}
