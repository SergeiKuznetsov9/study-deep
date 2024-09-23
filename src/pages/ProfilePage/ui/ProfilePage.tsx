import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("profile");

  if (!id) {
    return <Text text={t("Профиль не найден")} />;
  }
  return (
    <Page>
      <VStack max gap={"16"}>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
