import { FC, HTMLAttributeAnchorTarget } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text } from "@/shared/ui/Text";
import EyeIcon from "@/shared/assets/icons/eye.svg";
import { Icon } from "@/shared/ui/Icon";
import { Card } from "@/shared/ui/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { Button } from "@/shared/ui/Button";
import { AppImage } from "@/shared/ui/AppImage/AppImage";
import { Skeleton } from "@/shared/ui/Skeleton";
import { getRouteArticleDetails } from "@/shared/const/router";
import { HStack, VStack } from "@/shared/ui/Stack";

import { Article, ArticleTextBlock } from "../../model/types/article";
import { ArticleBlockType, ArticleView } from "../../model/const/const";
import cls from "./ArticleListItem.module.scss";

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  article,
  view,
  target,
}) => {
  const { t } = useTranslation("article");

  const views = (
    <HStack gap="8">
      <Icon Svg={EyeIcon} />
      <Text text={String(article.views)} className={cls.view} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock;

    return (
      <Card
        max
        padding="24"
        className={classNames("", {}, [className, cls[view]])}
      >
        <VStack max gap="16">
          <HStack max gap="8">
            <Avatar size={32} src={article.user.avatar} />
            <Text text={article.user.username} bold />
            <Text text={article.createdAt} />
          </HStack>
          <Text title={article.title} bold />
          <Text title={article.subtitle} size="s" />
          <AppImage
            src={article.img}
            className={cls.img}
            alt={article.title}
            fallback={<Skeleton width="100%" height={250} />}
          />
          {textBlock?.paragraphs && (
            <Text
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(" ")}
            />
          )}
          <HStack max justify="between">
            <AppLink to={getRouteArticleDetails(article._id)} target={target}>
              <Button variant="outline">{t("Читать далее...")}</Button>
            </AppLink>
            {views}
          </HStack>
        </VStack>
      </Card>
    );
  }

  if (view === ArticleView.SMALL) {
    return (
      <AppLink
        target={target}
        to={getRouteArticleDetails(article._id)}
        className={className}
      >
        <Card className={classNames(cls.card, {}, [cls[view]])} border="round">
          <AppImage
            src={article.img}
            className={cls.img}
            alt={article.title}
            fallback={<Skeleton width={200} height={200} />}
          />
          <VStack className={cls.info} gap="4">
            <Text title={article.title} />
            <VStack gap="4" className={cls.footer} max>
              <HStack justify="between" max>
                <Text text={article.createdAt} />
                {views}
              </HStack>
              <HStack gap="4">
                <Avatar size={32} src={article.user.avatar} />
                <Text text={article.user.username} bold />
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  }
};
