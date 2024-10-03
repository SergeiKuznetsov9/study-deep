import { FC } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { ArticleList } from "@/entities/Article";
import { Text } from "@/shared/ui/Text/Text";

import { getArticles } from "../../model/slices/articlesPageSlice";
import {
  useArticlesPageError,
  useArticlesPageIsLoading,
  useArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";

interface ArticlesInfinitListProps {
  className?: string;
}

export const ArticlesInfinitList: FC<ArticlesInfinitListProps> = ({
  className,
}) => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useArticlesPageIsLoading();
  const error = useArticlesPageError();
  const view = useArticlesPageView();
  const { t } = useTranslation();

  if (error) {
    return <Text text={t("Ошибка при загрузке статей")} />;
  }

  return (
    <ArticleList
      view={view}
      articles={articles}
      isLoading={isLoading}
      className={className}
    />
  );
};
