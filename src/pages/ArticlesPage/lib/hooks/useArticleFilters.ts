import { useCallback } from "react";

import { ArticleView, ArticleSortField, ArticleType } from "@/entities/Article";
import { SortOrder } from "@/shared/types";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

import {
  useArticlesPageView,
  useArticlesPageSort,
  useArticlesPageOrder,
  useArticlesPageSearch,
  useArticlesPageType,
} from "../../model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

export const useArticleFilters = () => {
  const dispatch = useAppDispatch();

  const view = useArticlesPageView();
  const sort = useArticlesPageSort();
  const order = useArticlesPageOrder();
  const search = useArticlesPageSearch();
  const type = useArticlesPageType();

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, debouncedFetchData]
  );

  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
};
