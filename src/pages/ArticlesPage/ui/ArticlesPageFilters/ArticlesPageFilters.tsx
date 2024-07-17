import { FC, useCallback } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticlesPageFilters.module.scss";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import {
  ArticleSortField,
  ArticleView,
  ArticleViewSelector,
} from "entities/Article";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Card } from "shared/ui/Card/Card";
import { ArticleSortSelector } from "entities/Article";
import { SortOrder } from "shared/types";

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

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
    },
    [dispatch]
  );

  const onChangeOrder = useCallback(
    (newOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(newOrder));
    },
    [dispatch]
  );

  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
    },
    [dispatch]
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
    </div>
  );
};
