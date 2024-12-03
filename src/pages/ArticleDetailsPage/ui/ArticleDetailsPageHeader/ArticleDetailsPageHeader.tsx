import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { HStack } from "@/shared/ui/Stack";
import { getRouteArticleEdit, getRouteArticles } from "@/shared/const/router";
import { useArticleDetailsData } from "@/entities/Article";
import { useCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
  const navigate = useNavigate();
  const article = useArticleDetailsData();
  const canEdit = useCanEditArticle();

  const onBackToList = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    if (article?._id) {
      navigate(getRouteArticleEdit(article._id));
    }
  }, [article?._id, navigate]);

  return (
    <HStack max justify="between" className={classNames("", {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t("Назад к списку")}
      </Button>
      {canEdit && (
        <Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
          {t("Редактировать")}
        </Button>
      )}
    </HStack>
  );
};
