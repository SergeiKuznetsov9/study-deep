import { FC } from "react";
import { useTranslation } from "react-i18next";

import { User } from "@/entities/User";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

interface ArticleAdditionalInfoProps {
  className?: string;
  author: User;
  createdAt: string;
  views: number;
  onEdit: () => void;
}

export const ArticleAdditionalInfo: FC<ArticleAdditionalInfoProps> = ({
  className,
  author,
  createdAt,
  onEdit,
  views,
}) => {
  const { t } = useTranslation("article");
  return (
    <VStack gap="32" className={className}>
      <HStack gap="8">
        <Avatar src={author.avatar} size={32} />
        <Text text={author.username} bold />
        <Text text={createdAt} />
      </HStack>
      <Button onClick={onEdit}>{t("Редактировать")}</Button>
      <Text text={t("{{count}} просмотров", { count: views })} />
    </VStack>
  );
};
