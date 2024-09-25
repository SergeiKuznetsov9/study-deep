import { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Code } from "@/shared/ui/Code";

import cls from "./ArticleCodeBlockComponent.module.scss";
import { ArticleCodeBlock } from "../../model/types/article";

interface ArticleCodeBlockComponentProps {
  block: ArticleCodeBlock;
  className?: string;
}

export const ArticleCodeBlockComponent: FC<ArticleCodeBlockComponentProps> =
  memo(({ className, block }) => (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
      <Code text={block.code} />
    </div>
  ));
