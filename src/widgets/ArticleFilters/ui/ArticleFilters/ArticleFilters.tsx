import { FC } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortSelector } from "@/features/articleSortSelector";
import { ArticleTypeTabs } from "@/features/articleTypeTabs";
import { ArticleSortField, ArticleType } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import SearchIcon from "@/shared/assets/icons/search.svg";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { VStack } from "@/shared/ui/Stack";
import { SortOrder } from "@/shared/types";
import { Icon } from "@/shared/ui/Icon";

import cls from "./ArticleFilters.module.scss";

interface ArticleFiltersProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  type: ArticleType;
  search: string;
  onChangeSearch: (value: string) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleFilters: FC<ArticleFiltersProps> = ({
  className,
  type,
  sort,
  search,
  order,
  onChangeType,
  onChangeOrder,
  onChangeSearch,
  onChangeSort,
}) => {
  const { t } = useTranslation();
  return (
    <Card
      className={classNames(cls.ArticleFilters, {}, [className])}
      padding="24"
    >
      <VStack gap="32">
        <Input
          placeholder={t("Поиск")}
          onChange={onChangeSearch}
          value={search}
          size="s"
          addonLeft={<Icon Svg={SearchIcon} />}
        />
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />

        <ArticleTypeTabs
          value={type}
          onChangeType={onChangeType}
          className={cls.tabs}
        />
      </VStack>
    </Card>
  );
};
