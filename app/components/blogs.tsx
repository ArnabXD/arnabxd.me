import fetchLatestPosts from "~/services/blogs";
import { Views } from "./icons";

export type BlogData = Awaited<ReturnType<typeof fetchLatestPosts>>;

type BlogProps = {
  data: BlogData;
};

const Blog = ({ data }: BlogProps) => {
  if (!data || data.posts.length === 0) return null;

  return (
    <>
      <section className="pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto md:mb-[60px] max-w-[510px] text-center">
                <h2 className=" text-3xl text-primary font-bold sm:text-4xl md:text-[40px]">
                  Recent Blogs
                </h2>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap">
            {data.posts.map((post) => (
              <BlogCard
                key={post.id}
                image={post.coverImage?.url || "/blog-placeholder.webp"}
                date={post.publishedAt}
                title={post.title}
                description={post.brief}
                views={post.views}
                url={post.url}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

interface BlogCardProps {
  image?: string;
  date: string;
  title: string;
  description: string;
  views: number;
  url: string;
}

function BlogCard({
  image,
  date,
  title,
  description,
  views,
  url,
}: BlogCardProps) {
  return (
    <>
      <div className="w-full px-4 pt-10 lg:pt-0 md:w-1/2 lg:w-1/3">
        <div className="mb-10x w-full">
          <div className="mb-6 overflow-hidden rounded-lg">
            <a href={url} rel="noopener noreferrer" target="_blank">
              <img
                src={image}
                alt={title}
                className="w-full aspect-video object-cover"
              />
            </a>
          </div>
          <div>
            <div className="flex flex-row justify-between">
              <span className="mb-5 inline-block rounded-lg surface px-4 py-1 text-center text-sm font-semibold leading-loose">
                <span className="align-middle">{date}</span>
              </span>
              <span className="mb-5 inline-block rounded-lg px-4 py-1 text-center text-sm font-semibold leading-loose">
                <Views
                  fill="currentColor"
                  className="inline"
                  height={18}
                  width={18}
                />
                <span className="align-middle ml-2">{views}</span>
              </span>
            </div>
            <h3>
              <a
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {title}
              </a>
            </h3>
            <p className="text-base text-body-color dark:text-dark-6">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
