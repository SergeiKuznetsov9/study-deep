import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AddCommentForm } from "@/features/addCommentForm";
import { CommentList } from "@/entities/Comment";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/shared/ui/Stack";

import { useArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

import cls from "./ArticleDetailsComments.module.scss";

interface ArticleDetailsCommentsProps {
  id: string;
  className?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = ({
  id,
  className,
}) => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const comments = useAppSelector(getArticleComments.selectAll);
  const articleCommentsIsLoading = useArticleCommentsIsLoading();

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  }, [dispatch, id]);

  return (
    <VStack gap="16" max className={classNames("", {}, [className])}>
      <Text
        size={TextSize.L}
        title={t("Комментарии")}
        className={cls.commentTitle}
      />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={articleCommentsIsLoading} />
    </VStack>
  );
};
