import { FC } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";
import { HStack, VStack } from "@/shared/ui/Stack";

import { ArticleView } from "../../model/const/const";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemSkeletonProps {
  className?: string;
  view: ArticleView;
}

export const ArticleListItemSkeleton: FC<ArticleListItemSkeletonProps> = ({
  className,
  view,
}) => {
  if (view === ArticleView.BIG) {
    return (
      <Card
        max
        padding="24"
        className={classNames("", {}, [className, cls[view]])}
      >
        <VStack max gap="16">
          <HStack max gap="8">
            <Skeleton borderRadius={16} height={32} width={32} />
            <Skeleton height={16} width={100} />
            <Skeleton height={16} width={150} />
          </HStack>
          <Skeleton height={20} width={100} />
          <Skeleton height={20} width={220} />
          <Skeleton className={cls.img} />
          <Skeleton className={cls.textBlock} />
          <HStack max justify="between">
            <Skeleton borderRadius={16} height={30} width={120} />
            <HStack gap="8">
              <Skeleton height={16} width={20} />
              <Skeleton height={16} width={36} className={cls.view} />
            </HStack>
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (view === ArticleView.SMALL) {
    return (
      <Card className={classNames(cls.card, {}, [cls[view]])} border="round">
        <Skeleton className={cls.img} />
        <VStack className={cls.info} gap="4">
          <Skeleton width={130} height={24} />
          <VStack gap="16" className={cls.footer} max>
            <HStack justify="between" max>
              <Skeleton width={80} height={16} />
              <Skeleton width={70} height={16} />
            </HStack>
            <HStack gap="4">
              <Skeleton width={110} height={20} />
            </HStack>
          </VStack>
        </VStack>
      </Card>
    );
  }
};
