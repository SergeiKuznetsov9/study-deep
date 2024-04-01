import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleViewSelector.module.scss";
import { ArticleView } from "../../model/types/article";
import ListIcon from "shared/assets/icons/list.svg";
import TileIcon from "shared/assets/icons/tile.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";

interface ArticleViewSelectorProps {
  view: ArticleView;
  className?: string;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TileIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon,
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
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button theme={ButtonTheme.CLEAR} onClick={onClick(viewType.view)}>
          <Icon
            Svg={viewType.icon}
            className={classNames(cls.icon, {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
};
