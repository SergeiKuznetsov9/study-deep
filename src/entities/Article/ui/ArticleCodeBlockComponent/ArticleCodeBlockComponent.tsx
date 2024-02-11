import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleCodeBlockComponent.module.scss";
import { ArticleCodeBlock } from "../../model/types/article";
import { Code } from "shared/ui/Code/Code";

interface ArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
  memo(({ className, block }) => {
    const { t } = useTranslation();

    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code} />
      </div>
    );
  });
