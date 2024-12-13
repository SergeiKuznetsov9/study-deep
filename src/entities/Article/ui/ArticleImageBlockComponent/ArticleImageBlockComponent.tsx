import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text";

import { ArticleImageBlock } from "../../model/types/article";
import cls from "./ArticleImageBlockComponent.module.scss";

interface ArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  className?: string;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> =
  memo(({ className, block }) => (
    <div
      className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
    >
      <img src={block.src} className={cls.img} alt={block.title} />
      {block.title && <Text text={block.title} align="center" />}
    </div>
  ));
