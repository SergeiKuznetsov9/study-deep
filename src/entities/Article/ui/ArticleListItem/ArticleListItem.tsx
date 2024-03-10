import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleListItem.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  article,
  view,
}) => {
  const { t } = useTranslation();

  if (view === ArticleView.BIG) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        {article.title}
      </div>
    );
  }

  if (view === ArticleView.SMALL) {
    return (
      <div
        className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
      >
        <div className={cls.card}>
            <div className={cls.imageWrapper}>
                <img src={article.img} className={cls.img} />
                <Text text={article.createdAt} className={cls.date} />
            </div>
            <div className={cls.infoWrapper}>
                <Text text={article.type.join(', ')} className={cls.types} />
                <Text text={String(article.views)} className={cls.views} />
            </div>
        </div>
        {article.title}
      </div>
    );
  }
};
