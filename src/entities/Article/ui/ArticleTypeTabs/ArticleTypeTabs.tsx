import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ArticleType } from "../../model/const/const";
import { TabItem, Tabs } from "@/shared/ui/Tabs/Tabs";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs: FC<ArticleTypeTabsProps> = ({
  className,
  value,
  onChangeType,
}) => {
  const { t } = useTranslation();

  const typeTabs = useMemo<TabItem[]>(
    () => [
      { content: t("Все статьи"), value: ArticleType.All },
      { content: t("Айти"), value: ArticleType.IT },
      { content: t("Экономика"), value: ArticleType.ECONOMICS },
      { content: t("Наука"), value: ArticleType.SCIENCE },
    ],
    [t]
  );

  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType]
  );

  return (
    <Tabs
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
      className={classNames("", {}, [className])}
    />
  );
};
