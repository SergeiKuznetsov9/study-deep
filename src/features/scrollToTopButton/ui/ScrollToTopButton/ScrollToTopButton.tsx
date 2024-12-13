import { FC } from "react";
import { Icon } from "@/shared/ui/Icon";
import CicrcleIcon from "@/shared/assets/icons/circle-up.svg";

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  className,
}) => {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Icon
      Svg={CicrcleIcon}
      clickable
      width={32}
      height={32}
      onClick={onClick}
      className={className}
    />
  );
};
