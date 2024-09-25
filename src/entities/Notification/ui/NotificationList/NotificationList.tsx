import { FC } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { Skeleton } from "@/shared/ui/Skeleton";

import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";

import cls from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
}

export const NotificationList: FC<NotificationListProps> = ({ className }) => {
  const { data, isLoading } = useNotifications(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width="100%" height={80} borderRadius={8} />
        <Skeleton width="100%" height={80} borderRadius={8} />
        <Skeleton width="100%" height={80} borderRadius={8} />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((notification) => (
        <NotificationItem key={notification.id} item={notification} />
      ))}
    </VStack>
  );
};
