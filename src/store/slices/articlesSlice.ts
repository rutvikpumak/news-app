import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNewsAPIArticles,
  fetchNYTimesArticles,
  fetchGnewsArticles,
  fetchGuardianArticles,
} from "../../config/api";

// --- Types ---
interface Article {
  id?: string;
  title: string;
  description?: string;
  url?: string;
  source?: string;
  publishedAt?: string;
  [key: string]: any;
}

interface Source {
  key: string;
  name: string;
}

interface Filters {
  query: string;
  category: string;
  date: string;
  source: Source | string;
  author: string;
  preferredSources: Source[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

export interface ArticlesState {
  articles: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: Filters;
}

// --- Async Thunk ---
export const fetchArticles = createAsyncThunk<
  Article[],
  any,
  { state: { articles: ArticlesState } }
>("articles/fetchArticles", async (params, { getState }) => {
  const { query, source } = getState().articles.filters;

  let articles: Article[] = [];

  // Fetch from GNews API
  if (
    (source as Source).key === "gnews-api" ||
    (source as Source).key === "all"
  ) {
    const gnewsArticles = await fetchGnewsArticles(query, params);
    articles = [...articles, ...gnewsArticles];
  }

  // Fetch from NewsAPI
  if (
    (source as Source).key === "news-api" ||
    (source as Source).key === "all"
  ) {
    const newsAPIArticles = await fetchNewsAPIArticles(query, params);
    articles = [...articles, ...newsAPIArticles];
  }

  // Fetch from NYTimes
  if (
    (source as Source).key === "ny-times" ||
    (source as Source).key === "all"
  ) {
    const nyTimesArticles = await fetchNYTimesArticles(query, params);
    articles = [...articles, ...nyTimesArticles];
  }

  if (
    (source as Source).key === "guardian-api" ||
    (source as Source).key === "all"
  ) {
    const guardianArticles = await fetchGuardianArticles(query, params);
    articles = [...articles, ...guardianArticles];
  }

  return articles;
});

// --- Initial State ---
const initialState: ArticlesState = {
  articles: [],
  status: "idle",
  error: null,
  filters: {
    query: "",
    category: "",
    date: "",
    source: "",
    author: "",
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: [],
  },
};

// --- Slice ---
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.filters.date = action.payload;
    },
    setSource(state, action: PayloadAction<Source | string>) {
      state.filters.source = action.payload;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.filters.author = action.payload;
    },
    setPreferredSources(state, action: PayloadAction<Source[]>) {
      state.filters.preferredSources = action.payload;
    },
    setPreferredCategories(state, action: PayloadAction<string[]>) {
      state.filters.preferredCategories = action.payload;
    },
    setPreferredAuthors(state, action: PayloadAction<string[]>) {
      state.filters.preferredAuthors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchArticles.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.status = "succeeded";
          state.articles = action.payload;
        }
      )
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  setQuery,
  setCategory,
  setDate,
  setAuthor,
  setSource,
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
} = articlesSlice.actions;

export default articlesSlice.reducer;
