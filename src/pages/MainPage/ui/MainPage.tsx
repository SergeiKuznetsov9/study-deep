import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { Card } from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";
import { VStack } from "@/shared/ui/Stack";

const MainPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Card padding="24" max border="partial">
        <VStack gap="24">
          <Text title={t("Главная")} />
          <VStack gap="8">
            <Text text={t("Для авторизации используйте:")} />
            <VStack gap="4">
              <Text text={t("Логин: admin")} />
              <Text text={t("Пароль: 123")} />
            </VStack>
          </VStack>
        </VStack>
      </Card>
    </Page>
  );
};

export default MainPage;
