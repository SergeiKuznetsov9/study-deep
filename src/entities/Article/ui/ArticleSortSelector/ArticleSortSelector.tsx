import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Select, SelectOption } from "@/shared/ui/Select/Select";

import { ArticleSortField } from "../../model/const/const";
import { SortOrder } from "@/shared/types";
import cls from "./ArticleSortSelector.module.scss";

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
      <Select<ArticleSortField>
        options={sortFieldOptions}
        label={t("Сортировать ПО")}
        value={sort}
        onChange={onChangeSort}
      />
      <Select
        options={orderOptions}
        label={t("по")}
        value={order}
        onChange={onChangeOrder}
        className={cls.order}
      />
    </div>
  );
};
