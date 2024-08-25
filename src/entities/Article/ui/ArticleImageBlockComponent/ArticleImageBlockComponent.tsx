import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleImageBlockComponent.module.scss";
import { ArticleImageBlock } from "../../model/types/article";
import { Text, TextAlign } from "shared/ui/Text/Text";

interface ArticleImageBlockComponentProps {
  block: ArticleImageBlock;
  className?: string;
}

export const ArticleImageBlockComponent: FC<ArticleImageBlockComponentProps> =
  memo(({ className, block }) => {

    return (
      <div
        className={classNames(cls.ArticleImageBlockComponent, {}, [className])}
      >
        <img src={block.src} className={cls.img} alt={block.title} />
        {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
      </div>
    );
  });
