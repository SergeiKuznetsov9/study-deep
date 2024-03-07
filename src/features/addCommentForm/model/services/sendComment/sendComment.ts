import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { getUserAuthData } from "entities/User";
import { getAddCommentFormText } from "../../selectors/addCommentFormSelectors";
import { getArticleDetailsData } from "entities/Article";
import { addCommentFormActions } from "../../slices/addCommentFormSlice";

export const sendComment = createAsyncThunk<Comment, void, ThunkConfig<string>>(
  "addCommentForm/sendComment",
  async (_, { dispatch, rejectWithValue, extra, getState }) => {
    const userData = getUserAuthData(getState());
    const text = getAddCommentFormText(getState());
    const article = getArticleDetailsData(getState());

    console.log(text);

    if (!userData || !text || !article) {
      return rejectWithValue("no data");
    }

    try {
      const response = await extra.api.post<Comment>("/comments", {
        articleId: article.id,
        userId: userData.id,
        text,
      });

      if (!response.data) {
        throw new Error();
      }

      dispatch(addCommentFormActions.setText(""));
      return response.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
