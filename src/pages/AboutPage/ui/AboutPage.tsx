import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { Card } from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Card padding="24" max border="partial">
        <Text title={t("О сайте")} />
      </Card>
    </Page>
  );
};

export default AboutPage;
