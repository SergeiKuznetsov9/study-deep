import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useUserAuthData } from "@/entities/User";
import { RatingCard } from "@/entities/Rating";
import { Skeleton } from "@/shared/ui/Skeleton";

import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/articleRatingApi";

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating: FC<ArticleRatingProps> = ({ className, articleId }) => {
  const { t } = useTranslation();
  const userData = useUserAuthData();

  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?._id ?? "",
  });

  const [rateArticleMutation] = useRateArticle();

  const rating = data?.rate;

  const handleRateArticle = useCallback(
    (rate: number, feedback: string = "") => {
      try {
        rateArticleMutation({
          userId: userData?._id ?? "",
          articleId,
          rate,
          feedback,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [articleId, rateArticleMutation, userData?._id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateArticle(starsCount, feedback);
    },
    [handleRateArticle]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateArticle(starsCount);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating}
      className={className}
      title={t("Оцените статью")}
      feedbackTitle={t(
        "Оставьте свой отзыв о статье, это поможет улучшить качество"
      )}
      hasFeedback={true}
    />
  );
};

export default ArticleRating;
