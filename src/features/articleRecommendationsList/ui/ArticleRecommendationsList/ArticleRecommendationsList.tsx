import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui/Text/Text";
import { ArticleList } from "entities/Article";
import { VStack } from "shared/ui/Stack";
import { useArticleRecommendationsList } from "../../api/ArticleRecommendationsApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

// с точки зрения методологии FSD, запросы за данными следует хранить в отдельном
// сегменте API, что и сделаем

export const ArticleRecommendationsList: FC<
  ArticleRecommendationsListProps
> = ({ className }) => {
  const { t } = useTranslation();

  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

  if (error) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames("", {}, [className])}>
      <Text size={TextSize.L} title={t("Рекомендуем")} />
      <ArticleList articles={articles} isLoading={isLoading} target="_blank" />
    </VStack>
  );
};
