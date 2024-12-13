import { FC } from "react";

import { Avatar } from "@/shared/ui/Avatar";
import { Text } from "@/shared/ui/Text";
import { Skeleton } from "@/shared/ui/Skeleton";
import { HStack, VStack } from "@/shared/ui/Stack";
import { AppLink } from "@/shared/ui/AppLink";
import { Card } from "@/shared/ui/Card";
import { getRouteProfile } from "@/shared/const/router";

import { Comment } from "../../model/types";

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
      <VStack gap="8" max className={className}>
        <HStack gap="8">
          <Skeleton width={30} height={30} borderRadius="50%" />
          <Skeleton width={100} height={16} />
        </HStack>
        <Skeleton width={"100%"} height={50} />
      </VStack>
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <Card padding="24" border="round" max>
      <VStack gap="8" max className={className}>
        <AppLink to={getRouteProfile(comment.user._id)}>
          <HStack gap="8">
            {comment.user.avatar ? (
              <Avatar size={30} src={comment.user.avatar} />
            ) : null}
            <Text text={comment.user.username} bold />
          </HStack>
        </AppLink>
        <Text text={comment.text} />
      </VStack>
    </Card>
  );
};
