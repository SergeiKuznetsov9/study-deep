import { FC } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/deprecated/Text";
import { ArticleList } from "@/entities/Article";
import { VStack } from "@/shared/ui/Stack";
import { useArticleRecommendationsList } from "../../api/ArticleRecommendationsApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList: FC<
  ArticleRecommendationsListProps
> = ({ className }) => {
  const { t } = useTranslation();

  const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

  if (error || !articles) {
    return null;
  }

  return (
    <VStack gap="8" className={classNames("", {}, [className])}>
      <Text size={TextSize.L} title={t("Рекомендуем")} />
      <ArticleList articles={articles} isLoading={isLoading} target="_blank" />
    </VStack>
  );
};
