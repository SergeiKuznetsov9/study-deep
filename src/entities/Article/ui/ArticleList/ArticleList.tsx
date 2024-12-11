import { FC, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text";
import { HStack } from "@/shared/ui/Stack";

import { ArticleView } from "../../model/const/const";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";

import cls from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList: FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleView.SMALL,
  target,
}) => {
  const { t } = useTranslation("article");

  const renderArticles = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article._id}
      target={target}
    />
  );

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames("", {}, [className, cls[view]])}>
        <Text size="l" title={t("Статьи не найдены")} />
      </div>
    );
  }

  return (
    <HStack gap="16" wrap="wrap">
      {articles?.length > 0 ? articles.map(renderArticles) : null}
      {isLoading && getSkeletons(view)}
    </HStack>
  );
};
