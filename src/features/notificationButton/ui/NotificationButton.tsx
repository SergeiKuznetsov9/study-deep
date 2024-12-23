import { FC, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import { NotificationList } from "@/entities/Notification";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Popover } from "@/shared/ui/Popover";
import { Icon } from "@/shared/ui/Icon";
import RingBellIcon from "@/shared/assets/icons/bell-ring.svg";
import { Drawer } from "@/shared/ui/Drawer";
import { Button, ButtonTheme } from "@/shared/ui/Button";

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
          trigger={<Icon Svg={RingBellIcon} inverted />}
          className={classNames(cls.NotificationButton, {}, [className])}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
          <Icon Svg={RingBellIcon} inverted />
        </Button>
        <Drawer isOpen={isDrawerOpened} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </>
  );
};
