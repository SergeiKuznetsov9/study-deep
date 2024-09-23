import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./CommentCard.module.scss";
import { Comment } from "../../model/types";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Text } from "@/shared/ui/Text/Text";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { VStack } from "@/shared/ui/Stack";

interface CommentCardProps {
  className?: string;
  isLoading?: boolean;
  comment?: Comment;
}

export const CommentCard: FC<CommentCardProps> = ({
  className,
  comment,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <VStack
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className, cls.loading])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} borderRadius="50%" />
          <Skeleton width={100} height={16} className={cls.username} />
        </div>
        <Skeleton width={"100%"} height={50} className={cls.text} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.CommentCard, {}, [className])}
    >
      <AppLink
        to={`${RoutePath.profile}${comment.user.id}`}
        className={cls.header}
      >
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}
        <Text title={comment.user.username} className={cls.username} />
      </AppLink>
      <Text text={comment.text} className={cls.text} />
    </VStack>
  );
};
