import { FC, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextAlign, TextSize } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Avatar } from "@/shared/ui/Avatar";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";
import { Icon } from "@/shared/ui/Icon";
import { HStack, VStack } from "@/shared/ui/Stack";

import { ArticleBlockType } from "../../model/const/const";
import { ArticleBlock } from "../../model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import {
  useArticleDetailsData,
  useArticleDetailsError,
  useArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
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

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          );

        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          );

        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlockComponent
              key={block.id}
              className={cls.block}
              block={block}
            />
          );

        default:
          return null;
      }
    }, []);

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
          align={TextAlign.CENTER}
        />
      );
    }

    if (article) {
      content = (
        <>
          <HStack justify="center" max className={cls.avatarWrapper}>
            <Avatar size={200} src={article.img} className={cls.avatar} />
          </HStack>
          <VStack gap="4" max>
            <Text
              title={article.title}
              text={article.subtitle}
              className={cls.title}
              size={TextSize.L}
            />
            <HStack gap="8" className={cls.articleInfo}>
              <Icon Svg={EyeIcon} className={cls.icon} />
              <Text text={String(article?.views)} />
            </HStack>
            <HStack gap="8" className={cls.articleInfo}>
              <Icon Svg={CalendarIcon} className={cls.icon} />

              <Text text={article?.createdAt} />
            </HStack>
          </VStack>
          {article.blocks.map(renderBlock)}
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
