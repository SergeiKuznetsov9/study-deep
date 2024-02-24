import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  string | undefined,
  ThunkConfig<string>
>(
  "articleDetails/fetchCommentsByArticleId",
  async (articleId, { rejectWithValue, extra }) => {
    if (!articleId) {
      return rejectWithValue("error");
    }

    try {
      const response = await extra.api.get<Comment[]>("/comments/", {
        // _expand: "user" - таким способом мы таже будем получать данные юзера-автора
        // коммента. Это описано в доке JSON-сервера
        params: { articleId, _expand: "user" },
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
