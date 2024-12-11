import { FC, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { NotificationList } from "@/entities/Notification";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Popover } from "@/shared/ui/Popover";
import { Icon } from "@/shared/ui/Icon";
import NotitficationIcon from "@/shared/assets/icons/notification.svg";
import { Drawer } from "@/shared/ui/Drawer";

import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton: FC<NotificationButtonProps> = ({
  className,
}) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const onOpenDrawer = () => {
    setIsDrawerOpened(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpened(false);
  };

  return (
    <>
      <BrowserView>
        <Popover
          trigger={<Icon Svg={NotitficationIcon} />}
          className={classNames(cls.NotificationButton, {}, [className])}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        <Icon Svg={NotitficationIcon} clickable onClick={onOpenDrawer} />
        <Drawer isOpen={isDrawerOpened} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  );
};
