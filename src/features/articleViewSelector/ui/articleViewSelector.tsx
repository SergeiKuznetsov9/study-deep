import { FC } from "react";

import { ArticleView } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import ListIcon from "@/shared/assets/icons/burger.svg";
import TileIcon from "@/shared/assets/icons/tile.svg";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { HStack } from "@/shared/ui/Stack";

import cls from "./articleViewSelector.module.scss";

interface ArticleViewSelectorProps {
  view: ArticleView;
  className?: string;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.BIG,
    icon: ListIcon,
  },
  {
    view: ArticleView.SMALL,
    icon: TileIcon,
  },
];

export const ArticleViewSelector: FC<ArticleViewSelectorProps> = ({
  view,
  className,
  onViewClick,
}) => {
  const onClick = (newView: ArticleView) => () => {
    onViewClick?.(newView);
  };

  return (
    <Card className={classNames("", {}, [className])} border="round">
      <HStack gap="8">
        {viewTypes.map((viewType) => (
          <Icon
            key={viewType.view}
            clickable
            onClick={onClick(viewType.view)}
            Svg={viewType.icon}
            className={classNames("", {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        ))}
      </HStack>
    </Card>
  );
};
