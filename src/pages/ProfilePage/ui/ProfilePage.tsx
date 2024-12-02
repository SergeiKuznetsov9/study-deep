import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { VStack } from "@/shared/ui/deprecated/Stack";
import { Text } from "@/shared/ui/deprecated/Text";

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { t } = useTranslation("profile");

  if (!username) {
    return <Text text={t("Профиль не найден")} />;
  }
  return (
    <Page>
      <VStack max gap={"16"}>
        <EditableProfileCard username={username} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
