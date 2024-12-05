import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ArticleSortField } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { SortOrder } from "@/shared/types";
import { SelectOption, ListBox } from "@/shared/ui/ListBox";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import cls from "./articleSortSelector.module.scss";

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = ({
  className,
  sort,
  order,
  onChangeOrder,
  onChangeSort,
}) => {
  const { t } = useTranslation("article");

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: "asc",
        content: t("возрастанию"),
      },
      {
        value: "desc",
        content: t("убыванию"),
      },
    ],
    [t]
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED,
        content: t("дате создания"),
      },
      {
        value: ArticleSortField.TITLE,
        content: t("названию"),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t("количеству просмотров"),
      },
    ],
    [t]
  );

  return (
    <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
      <VStack gap="8">
        <Text text={t("Сортировать по:")} />
        <ListBox
          items={sortFieldOptions}
          value={sort}
          onChange={onChangeSort}
        />
        <ListBox items={orderOptions} value={order} onChange={onChangeOrder} />
      </VStack>
    </div>
  );
};
