import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text";
import { VStack } from "@/shared/ui/Stack";

import { CommentCard } from "../CommentCard/CommentCard";
import { Comment } from "../../model/types";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FC<CommentListProps> = memo(
  ({ className, comments, isLoading }) => {
    const { t } = useTranslation();

    if (isLoading) {
      <VStack gap="16" max className={classNames("", {}, [className])}>
        <CommentCard isLoading />
        <CommentCard isLoading />
        <CommentCard isLoading />
      </VStack>;
    }

    return (
      <VStack gap="16" max className={classNames("", {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))
        ) : (
          <Text text={t("Комментарии отсутствуют")} />
        )}
      </VStack>
    );
  }
);
