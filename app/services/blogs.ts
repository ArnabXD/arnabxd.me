import ky from "ky";

interface HashNodeResponse {
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

interface PostResponse {
  data?: {
    post: {
      id: string;
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
    .post<HashNodeResponse>("https://gql.hashnode.com", {
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

export async function fetchPostById(postId: string) {
  const query = `
    query GetPost($id: ID!) {
      post(id: $id) {
        id
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
  `;

  const response = await ky
    .post<PostResponse>("https://gql.hashnode.com", {
      json: {
        query,
        variables: { id: postId },
      },
    })
    .json();

  if (!response.errors && response.data?.post) {
    const post = response.data.post;

    console.log(post.content);

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
