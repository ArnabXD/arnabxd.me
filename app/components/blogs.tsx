import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

export interface BlogsProps {
  data: {
    publishedAt: string;
    id: string;
    title: string;
    url: string;
    views: number;
    brief: string;
    readTimeInMinutes: number;
    tags: string[];
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
  id: string;
  title: string;
  publishedAt: string;
  brief: string;
  url: string;
  tags: string[];
  readTimeInMinutes: number;
}

function BlogCard({
  id,
  title,
  publishedAt,
  brief,
  url,
  tags,
  readTimeInMinutes,
}: BlogCardProps) {
  return (
    <div className="flex flex-col gap-1 border border-green-900 p-4 rounded-md hover:border-green-500 transition-all duration-300 bg-black bg-opacity-70 group">
      <div className="border-l-2 pl-2 border-green-500 mb-2">
        <Link to={`/blog/${id}`}>
          <h3 className="font-bold text-lg text-white group-hover:text-green-400 transition-colors line-clamp-3 min-h-20">
            {title}
          </h3>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center mb-3 text-xs">
        <span className="text-green-400">{publishedAt}</span>
        <span className="bg-green-900 bg-opacity-50 px-2 py-1 rounded">
          {`${readTimeInMinutes} min read`}
        </span>
      </div>
      <p className="text-sm mb-4 opacity-80 line-clamp-4">{brief}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-black border border-green-900 rounded-full inline-flex"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-1 justify-between items-end">
        <Link
          to={`/blog/${id}`}
          className="text-green-500 text-xs hover:text-white transition-colors inline-flex items-center py-2"
        >
          READ_FULL_POST →
        </Link>
        <a
          href={url}
          target="_blank"
          className="text-green-400 text-xs hover:text-white transition-colors inline-flex items-center py-2"
          rel="noreferrer"
        >
          HASHNODE <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </div>
  );
}
