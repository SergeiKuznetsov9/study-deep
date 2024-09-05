import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui/Text/Text";
import { ArticleList } from "entities/Article";
import { VStack } from "shared/ui/Stack";
import { rtkApi } from "shared/api/rtkApi";

interface ArticleRecommendationsListProps {
  className?: string;
}

// Здесь мы инжектим эндпоинт в объект rtk. Таким образом, он будет инжектиться лишь при подгрузке страницы,
// использующей этот API
const recommendationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRecommendationsList: build.query({
      query: (limit) => ({
        url: "/articles",
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
});

const useArticleRecommendationsList =
  recommendationsApi.useGetArticleRecommendationsListQuery;

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
