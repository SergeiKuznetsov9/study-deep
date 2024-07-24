import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCanEditArticle } from "pages/ArticleDetailsPage/model/selectors/article";
import { getArticleDetailsData } from "entities/Article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader: FC<ArticleDetailsPageHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation("article");
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
        {t("Назад к списку")}
      </Button>
      {canEdit && (
        <Button
          theme={ButtonTheme.OUTLINE}
          onClick={onEditArticle}
          className={cls.editBtn}
        >
          {t("Редактировать")}
        </Button>
      )}
    </div>
  );
};
