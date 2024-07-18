import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Article } from "entities/Article";
import { Comment } from "entities/Comment";
import {
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
} from "../../selectors/articlesPageSelectors";
import { addQueryParams } from "shared/lib/url/addQueryParams/addQueryParams";

interface FetchArticleListProps {
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticleListProps,
  ThunkConfig<string>
>(
  "articlesPage/fetchArticlesList",
  async (_, { rejectWithValue, extra, getState }) => {
    const limit = getArticlesPageLimit(getState());

    const sort = getArticlesPageSort(getState());
    const order = getArticlesPageOrder(getState());
    const search = getArticlesPageSearch(getState());
    const page = getArticlesPageNum(getState());

    try {
      addQueryParams({
        sort,
        order,
        search,
      });
      const response = await extra.api.get<Article[]>("/articles", {
        params: {
          _expand: "user",
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
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
