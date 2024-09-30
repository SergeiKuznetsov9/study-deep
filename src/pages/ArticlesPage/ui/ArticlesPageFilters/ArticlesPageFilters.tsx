import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import { ArticleSortField, ArticleType, ArticleView } from "@/entities/Article";
import {} from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Input } from "@/shared/ui/Input/Input";
import { Card } from "@/shared/ui/Card/Card";
import { SortOrder } from "@/shared/types";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";

import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import cls from "./ArticlesPageFilters.module.scss";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

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

  return (
    <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
      </div>
      <Card className={cls.search}>
        <Input
          placeholder={t("Поиск")}
          onChange={onChangeSearch}
          value={search}
        />
      </Card>
      <ArticleTypeTabs
        value={type}
        onChangeType={onChangeType}
        className={cls.tabs}
      />
    </div>
  );
};
