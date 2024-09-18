import { FC } from "react";

import { NotificationList } from "entities/Notification";
import { classNames } from "shared/lib/classNames/classNames";
import { Popover } from "shared/ui/Popover/Popover";
import { Icon } from "shared/ui/Icon/Icon";
import RingBellIcon from "shared/assets/icons/bell-ring.svg";

import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = ({
  className,
}) => {
  return (
    <Popover
      trigger={<Icon Svg={RingBellIcon} inverted />}
      className={classNames(cls.NotificationButton, {}, [className])}
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  );
};
