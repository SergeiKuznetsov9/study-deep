import { FC, memo, useMemo, useState } from "react";

import { ThemeSwitcher } from "@/features/themeSwitcher";
import { LangSwitcher } from "@/features/langSwitcher";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { Icon } from "@/shared/ui/Icon";
import ArrowIcon from "@/shared/assets/icons/arrow-bottom.svg";

import { SideBarItem } from "../SideBarItem/SideBarItem";
import cls from "./Sidebar.module.scss";
import { useSidebarItems } from "../../model/selectors/getSidebarItems";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const sidebarItemsList = useSidebarItems();

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SideBarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [collapsed, sidebarItemsList]
  );

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
      ])}
    >
      <VStack role="navigation" gap={"8"} className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        clickable
        onClick={onToggle}
        className={cls.collapsBtn}
        Svg={ArrowIcon}
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </aside>
  );
});
