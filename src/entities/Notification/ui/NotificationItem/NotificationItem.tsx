import { FC } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Card, CardTheme } from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";

import { Notification } from "../../model/types/notification";
import cls from "./NotificationItem.module.scss";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = ({
  className,
  item,
}) => {
  const content = (
    <Card
      theme={CardTheme.OUTLINE}
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a target="_blank" href={item.href} rel="noreferrer" className={cls.link}>
        {content}
      </a>
    );
  }

  return content;
};
