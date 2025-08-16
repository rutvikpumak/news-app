// src/services/api.ts
import axios from "axios";

const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY;
const BBC_API_KEY = process.env.REACT_APP_NYT_KEY;
const GNEWS_API_KEY = process.env.REACT_APP_GNEWS_KEY;
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDAPI_KEY;

// --- Types ---
interface Filters {
  date?: string;
  category?: string;
}

export interface Article {
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  imgSrc: string;
}

// --- Helper function to make API requests ---
const makeApiRequest = async (url: string, params: Record<string, any>) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    return null;
  }
};

// --- Helper function to normalize article data ---
const normalizeArticles = (articles: any[], source: string): Article[] => {
  return articles.map((article) => ({
    title:
      article.title || article.webTitle || article.headline?.main || "No Title",
    description:
      article.description ||
      article.fields?.trailText ||
      article.lead_paragraph ||
      article?.multimedia?.caption,

    url: article.url || article.webUrl || article.web_url || "",
    source: article?.source?.name || article?.fields?.publication || source,
    publishedAt:
      article.publishedAt || article.webPublicationDate || article.pub_date,
    author:
      article?.author ||
      article?.fields?.byline ||
      article?.byline?.original ||
      "Unknown Author",
    category: article?.category || article?.sectionName || "General",
    imgSrc:
      article?.urlToImage ||
      article?.image ||
      article?.fields?.thumbnail ||
      article?.multimedia?.default?.url,
  }));
};

// --- Fetch NewsAPI articles ---
export const fetchNewsAPIArticles = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const searchUrl = `https://newsapi.org/v2/everything?q=${query}&from=${filters.date}`;
  const topHeadUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${filters.category}`;
  const categoryUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${filters.category}`;

  const url = query ? searchUrl : filters.category ? categoryUrl : topHeadUrl;
  const params = { apiKey: NEWS_API_KEY };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.articles, "NewsAPI") : [];
};

// --- Fetch NYTimes articles ---
export const fetchNYTimesArticles = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`;
  const params = {
    fq: query,
    from: filters.date,
    "api-key": BBC_API_KEY,
    category: filters.category,
  };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.response.docs, "NYTimes") : [];
};

// --- Fetch GNews articles ---
export const fetchGnewsArticles = async (
  query: string,
  filters: Filters
): Promise<Article[]> => {
  const url = `https://gnews.io/api/v4/top-headlines`;
  const params = {
    q: query,
    from: filters.date,
    category: filters.category || "general",
    apikey: GNEWS_API_KEY,
  };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.articles, "GNews") : [];
};

export const fetchGuardianArticles = async (
  query: string,
  filters: Filters
) => {
  const searchUrl = `https://content.guardianapis.com/search`;
  const searchWithDateUrl = `https://content.guardianapis.com?from-date=${filters.date}`;
  const url =
    query || filters.category
      ? searchUrl
      : filters.date
      ? searchWithDateUrl
      : searchUrl;

  const params = {
    q: query || filters.category,
    "api-key": GUARDIAN_API_KEY,
    "show-fields": "all",
  };

  const data = await makeApiRequest(url, params);
  return data ? normalizeArticles(data.response.results, "The Guardian") : [];
};
