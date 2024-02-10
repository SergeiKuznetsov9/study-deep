import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetails.module.scss";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchArticleById } from "../../model/services/fetchArticleById/fetchArticleById";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { Text, TextAlign } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface ArticleDetailsProps {
  id: string;
  className?: string;
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails: FC<ArticleDetailsProps> = memo(
  ({ className, id }) => {
    const { t } = useTranslation("article-details");
    const dispatch = useAppDispatch();
    const article = useAppSelector(getArticleDetailsData);
    // const isLoading = true;
    const isLoading = useAppSelector(getArticleDetailsIsLoading);
    const error = useAppSelector(getArticleDetailsError);

    useEffect(() => {
      dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <div>
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
        </div>
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
      content = <div>Article Details</div>;
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
        <div className={classNames(cls.ArticleDetails, {}, [className])}>
          {content}
        </div>
      </DynamicModuleLoader>
    );
  }
);
