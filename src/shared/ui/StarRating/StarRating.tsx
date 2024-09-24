import { FC, useState } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import StarIcon from "@/shared/assets/icons/star.svg";
import { Icon } from "../Icon/Icon";

import cls from "./StarRating.module.scss";

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = ({
  className,
  size = 30,
  selectedStars = 0,
  onSelect,
}) => {
  const [currentStarsCount, setCurrentStarsCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <div
          key={starNumber}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
          className={classNames(
            cls.starIconContainer,
            {
              [cls.hovered]: currentStarsCount >= starNumber,
              [cls.selected]: isSelected,
            },
            []
          )}
        >
          <Icon
            Svg={StarIcon}
            className={cls.starIcon}
            width={size}
            height={size}
          />
        </div>
      ))}
    </div>
  );
};
