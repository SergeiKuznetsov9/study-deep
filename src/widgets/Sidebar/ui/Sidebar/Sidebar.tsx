import { FC, memo, useMemo, useState } from "react";

import { ThemeSwitcher } from "@/features/themeSwitcher";
import { LangSwitcher } from "@/features/langSwitcher";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { VStack } from "@/shared/ui/Stack";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";

import { SideBarItem } from "../SideBarItem/SideBarItem";
import cls from "./Sidebar.module.scss";
import { getSidebarItems } from "../../model/selectors/getSidebarItems";

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = memo(({ className }) => {
  const sidebarItemsList = useAppSelector(getSidebarItems);

  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => setCollapsed((prev) => !prev);

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
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        type="button"
        className={cls.collapsBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? ">" : "<"}
      </Button>
      <VStack role="navigation" gap={"8"} className={cls.items}>
        {itemsList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher className={cls.lang} short={collapsed} />
      </div>
    </aside>
  );
});
