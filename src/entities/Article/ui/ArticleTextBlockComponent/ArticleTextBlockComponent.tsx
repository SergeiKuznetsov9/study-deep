import { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleTextBlockComponent.module.scss";
import { ArticleTextBlock } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";

interface ArticleTextBlockComponentProps {
  block: ArticleTextBlock;
  className?: string;
}

export const ArticleTextBlockComponent: FC<ArticleTextBlockComponentProps> =
  memo(({ block, className }) => {

    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph) => (
          <Text key={paragraph} text={paragraph} className={cls.paragraph} />
        ))}
      </div>
    );
  });
