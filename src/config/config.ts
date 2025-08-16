import moment from "moment";

// --- Types ---
export interface Source {
  name: string;
  key: string;
}

export type Category =
  | "general"
  | "business"
  | "entertainment"
  | "health"
  | "science"
  | "sports"
  | "technology";

export interface ArticleSource {
  name: string;
  id: string | number;
}

export interface Article {
  id: string | number;
  title: string;
  description: string;
  publishedAt: string;
  source: ArticleSource;
  image: string;
  url: string;
}

// --- Functions ---
export const header = (category: string) => `News - Top ${category} Headlines`;
export const summary = "Source, Author, and Published Date";
export const newsChannel = (channel: string) => `${channel}`;

export const lastUpdate = (published: string) =>
  moment(published).format("DD MMM YYYY, HH:mm");

export const noResultFound = "No Results Found";

// --- Sources & Categories ---
export const sources: Source[] = [
  { name: "All Data Sources", key: "all" },
  { name: "News API", key: "news-api" },
  { name: "New York Times API", key: "ny-times" },
  { name: "Gnews API", key: "gnews-api" },
  { name: "Guardian API", key: "guardian-api" },
];

export const categories: Category[] = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

// --- Utility ---
export const capitaLize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

// --- Mock Articles ---
function createMockArticle(id: number): Article {
  return {
    id,
    title: `Article Title ${id}`,
    description: `Description for article ${id}...`,
    publishedAt: new Date().toISOString(),
    source: {
      name: `Source Name ${id}`,
      id,
    },
    image: `https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_960_720.jpg`,
    url: `https://example.com/article${id}`,
  };
}

export function generateMockArticles(count: number): Article[] {
  const articles: Article[] = [];
  for (let i = 1; i <= count; i++) {
    articles.push(createMockArticle(i));
  }
  return articles;
}
