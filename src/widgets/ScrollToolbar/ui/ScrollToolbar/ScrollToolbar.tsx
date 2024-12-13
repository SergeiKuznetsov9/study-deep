import { FC } from "react";
import { ScrollToTopButton } from "@/features/scrollToTopButton";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import cls from "./ScrollToolbar.module.scss";

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar: FC<ScrollToolbarProps> = ({ className }) => {
  return (
    <VStack
      justify="center"
      align="center"
      max
      className={classNames(cls.ScrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
};
