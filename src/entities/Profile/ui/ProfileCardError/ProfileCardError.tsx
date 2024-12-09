import { FC } from "react";
import { useTranslation } from "react-i18next";

import { HStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

export const ProfileCardError: FC = () => {
  const { t } = useTranslation();

  return (
    <HStack justify="center" max>
      <Text
        variant="error"
        title={t("Произошла ошибка при загрузке профиля")}
        text={t("Попробуйте обновить страницу")}
        align="center"
      />
    </HStack>
  );
};
