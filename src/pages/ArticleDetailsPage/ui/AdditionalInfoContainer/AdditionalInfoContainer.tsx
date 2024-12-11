import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import { getArticleDetailsData } from "@/entities/Article";
import { Card } from "@/shared/ui/Card";
import { getRouteArticleEdit } from "@/shared/const/router";

import cls from "./AdditionalInfoContainer.module.scss";

export const AdditionalInfoContainer: FC = () => {
  const article = useSelector(getArticleDetailsData);

  const navigate = useNavigate();

  const onEditArticle = useCallback(() => {
    if (article?._id) {
      navigate(getRouteArticleEdit(article._id));
    }
  }, [article?._id, navigate]);

  if (!article) return null;

  return (
    <Card padding="24" border="round" className={cls.card}>
      <ArticleAdditionalInfo
        author={article.user}
        createdAt={article.createdAt}
        views={article.views}
        onEdit={onEditArticle}
      />
    </Card>
  );
};
