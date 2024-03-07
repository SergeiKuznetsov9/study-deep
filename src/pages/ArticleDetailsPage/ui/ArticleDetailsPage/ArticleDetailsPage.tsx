import { FC, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { ArticleDetails } from "entities/Article";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui/Text/Text";
import { CommentList } from "entities/Comment";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { getArticleCommentsIsLoading } from "../../model/selectors/comments";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { AddCommentForm } from "features/addCommentForm";

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("article-details");
  const { id } = useParams<{ id: string }>();
  const comments = useAppSelector(getArticleComments.selectAll);
  const articleCommentsIsLoading = useAppSelector(getArticleCommentsIsLoading);

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t("Статья не найдена")}
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetails id={id} />
        <Text title={t("Комментарии")} className={cls.commentTitle} />
        <AddCommentForm />
        <CommentList comments={comments} isLoading={articleCommentsIsLoading} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
