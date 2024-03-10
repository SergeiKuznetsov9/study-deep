import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading: boolean;
  view?: ArticleView;
}

export const ArticleList: FC<ArticleListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleView.SMALL,
}) => {
  const { t } = useTranslation();

  const renderArticles = (article: Article) => (
    <ArticleListItem article={article} view={view} />
  );

  return (
    <div className={classNames(cls.ArticleList, {}, [className])}>
      {articles.length && articles.map(renderArticles)}
    </div>
  );
};
