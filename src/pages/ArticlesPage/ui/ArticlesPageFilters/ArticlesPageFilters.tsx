import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleViewSelector } from "@/features/articleViewSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import { Input } from "@/shared/ui/Input";
import { Card } from "@/shared/ui/Card";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticlesPageFilters.module.scss";
import { useArticleFilters } from "../../lib/hooks/useArticleFilters";

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");

  const {
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
  } = useArticleFilters();

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
