import { FC, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { ArticleView } from "../../model/const/const";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "@/shared/ui/Text/Text";

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
      key={article.id}
      target={target}
    />
  );

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles?.length > 0 ? articles.map(renderArticles) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};
