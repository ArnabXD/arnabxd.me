import ky from "ky";

interface HashnodeResponse {
  data?: {
    user: {
      posts: {
        nodes: {
          id: string;
          title: string;
          url: string;
          views: number;
          brief: string;
          publishedAt: string;
          coverImage?: {
            url: string;
          };
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
            title
            url
            views
            brief
            publishedAt
            coverImage {
              url
            }
          }
        }
      }
    }
  `;

  const response = await ky
    .post<HashnodeResponse>("https://gql.hashnode.com", {
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
        // coverImage: {
        //   url: "/blog-placeholder.webp",
        // },
        publishedAt: formatDate(post.publishedAt),
      })),
    };
  }

  throw new Error("Failed to fetch posts");
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
