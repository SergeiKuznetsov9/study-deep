import { FC, ReactNode, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Tabs.module.scss";
import { Card } from "../Card/Card";
import { Flex, FlexDirection } from "../Stack/Flex/Flex";

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  direction?: FlexDirection;
  onTabClick: (tab: TabItem) => void;
}

export const Tabs: FC<TabsProps> = ({
  className,
  tabs,
  value,
  direction = "row",
  onTabClick,
}) => {
  const clickHandle = useCallback((tab: TabItem) => {
    return () => {
      onTabClick(tab);
    };
  }, []);

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={classNames(cls.Tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;
        return (
          <Card
            variant={isSelected ? "light" : "normal"}
            className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
            key={tab.value}
            border="round"
            onClick={clickHandle(tab)}
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
};
