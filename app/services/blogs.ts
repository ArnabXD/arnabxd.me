import ky from "ky";

interface PostListResponse {
  data?: {
    user: {
      posts: {
        nodes: {
          id: string;
          slug: string;
          title: string;
          url: string;
          views: number;
          brief: string;
          publishedAt: string;
          readTimeInMinutes: number;
          tags: {
            name: string;
          }[];
        }[];
      };
    };
  };
  errors?: { message: string }[];
}

interface PublicationPostResponse {
  data?: {
    publication: {
      post: {
        id: string;
        slug: string;
        title: string;
        url: string;
        views: number;
        brief: string;
        publishedAt: string;
        readTimeInMinutes: number;
        content: {
          // html: string;
          markdown: string;
        };
        coverImage?: {
          url: string;
        };
        tags: {
          name: string;
        }[];
      };
    };
  };
  errors?: { message: string }[];
}

export default async function fetchLatestPosts(username: string, limit = 3) {
  const query = `
    query GetLatestPosts($username: String!, $limit: Int!) {
      user(username: $username) {
        posts(pageSize: $limit, page: 1) {
          nodes {
            id
            slug
            title
            url
            views
            brief
            publishedAt
            readTimeInMinutes
            tags {
              name
            }
          }
        }
      }
    }
  `;

  const response = await ky
    .post<PostListResponse>("https://gql.hashnode.com", {
      json: {
        query,
        variables: { username, limit },
      },
    })
    .json();

  if (!response.errors) {
    return {
      posts: (response.data?.user?.posts?.nodes ?? []).map((post) => ({
        ...post,
        tags: post.tags.map((tag) => tag.name),
        publishedAt: formatDate(post.publishedAt),
      })),
    };
  }

  throw new Error("Failed to fetch posts");
}

export async function fetchPostBySlug(slug: string) {
  const query = `
    query GetPostBySlug($slug: String!) {
      publication(host: "blog.arnabxd.me") {
        post(slug: $slug) {
          id
          slug
          title
          url
          views
          brief
          publishedAt
          readTimeInMinutes
          content {
            markdown
          }
          coverImage {
            url
          }
          tags {
            name
          }
        }
      }
    }
  `;

  const response = await ky
    .post<PublicationPostResponse>("https://gql.hashnode.com", {
      json: {
        query,
        variables: { slug },
      },
    })
    .json();

  if (!response.errors && response.data?.publication?.post) {
    const post = response.data.publication.post;

    return {
      ...post,
      tags: post.tags.map((tag) => tag.name),
      publishedAt: formatDate(post.publishedAt),
    };
  }

  throw new Error("Failed to fetch post");
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
