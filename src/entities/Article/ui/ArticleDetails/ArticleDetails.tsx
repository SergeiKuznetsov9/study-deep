import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import { VStack } from "@/shared/ui/Stack";
import { AppImage } from "@/shared/ui/AppImage/AppImage";

import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import {
  useArticleDetailsData,
  useArticleDetailsError,
  useArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { renderArticleBlock } from "./renderArticleBlock";
import cls from "./ArticleDetails.module.scss";

interface ArticleDetailsProps {
  id: string;
  className?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const { t } = useTranslation("article");
    const dispatch = useAppDispatch();
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();
    const error = useArticleDetailsError();

    useEffect(() => {
      dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            borderRadius={"50%"}
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width={"100%"} height={200} />
          <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        </>
      );
    }

    if (error) {
      content = (
        <Text
          title={t("Произошла ошибка при загрузке статьи")}
          align="center"
        />
      );
    }

    if (article) {
      content = (
        <>
          <Text title={article.title} size="l" bold />
          <Text title={article.subtitle} />
          <AppImage
            fallback={
              <Skeleton width="100%" height={420} borderRadius="16px" />
            }
            src={article.img}
            className={cls.img}
          />

          {article.blocks.map(renderArticleBlock)}
        </>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <VStack
          gap="16"
          max
          className={classNames(cls.ArticleDetails, {}, [className])}
        >
          {content}
        </VStack>
      </DynamicModuleLoader>
    );
  }
);
