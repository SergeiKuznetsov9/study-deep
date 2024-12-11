import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { ArticleRating } from "@/features/articleRating";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { VStack } from "@/shared/ui/Stack";
import { StickyContentLayout } from "@/shared/layouts/StickyContentLayout";

import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";

import cls from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const { t } = useTranslation("article");
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </Page>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StickyContentLayout
        content={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
              <DetailsContainer id={id} />
              <ArticleRating articleId={id} />
              <ArticleRecommendationsList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        right={<AdditionalInfoContainer />}
      ></StickyContentLayout>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
