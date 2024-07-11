import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { Comment } from "entities/Comment";
import { getArticlesPageLimit } from "../../selectors/articlesPageSelectors";

interface FetchArticleListProps {
  page?: number;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>
>(
  "articlesPage/fetchArticlesList",
  async ({ page = 1 }, { rejectWithValue, extra, getState }) => {
    const limit = getArticlesPageLimit(getState());
    try {
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
        },
      });

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("error");
    }
  }
);
