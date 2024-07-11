import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from "../../selectors/articlesPageSelectors";
import { articlesPageActions } from "../../slices/articlesPageSlice";
import { fetchArticlesList } from "../fetchArticlesList/fetchArticlesList";

// Это санка.
// Это имя "articlesPage/fetchNextArticlesPage" используется для создания экстраредьюсера
// 1 дженерик тип createAsyncThunk - тип возвращаемого значения (в случае успешности)
// 2 дженерик тип createAsyncThunk - тип первого аргумента колбэка
// 3 дженерик тип createAsyncThunk - тип второго аргумента колбэка

// По своей сути - это функция, которая принимает вторым аргументом функцию и вызывает ее,
// прокидывая в нее переданные значения и разные редаксовские штуки, такие как dispatch,
// getState и т.д.
export const fetchNextArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>("articlesPage/fetchNextArticlesPage", async (_, { dispatch, getState }) => {
  const hasMore = getArticlesPageHasMore(getState());
  const page = getArticlesPageNum(getState());
  const isLoading = getArticlesPageIsLoading(getState());

  if (hasMore && !isLoading) {

    // Здесь как раз пример, как вызывается функция редьюсера
    dispatch(articlesPageActions.setPage(page + 1));
    dispatch(
      fetchArticlesList({
        page: page + 1,
      })
    );
  }
});
