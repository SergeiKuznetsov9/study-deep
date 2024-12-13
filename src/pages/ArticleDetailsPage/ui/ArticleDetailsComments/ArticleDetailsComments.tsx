import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { AddCommentForm } from "@/features/addCommentForm";
import { CommentList } from "@/entities/Comment";
import { Text } from "@/shared/ui/Text";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { VStack } from "@/shared/ui/Stack";

import { useArticleCommentsIsLoading } from "../../model/selectors/comments";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

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
    <VStack gap="16" max className={className}>
      <Text size="l" title={t("Комментарии")} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList comments={comments} isLoading={articleCommentsIsLoading} />
    </VStack>
  );
};
