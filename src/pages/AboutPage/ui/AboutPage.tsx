import { useTranslation } from "react-i18next";
import { Page } from "shared/ui/Page/page";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return <Page>{t("О сайте")}</Page>;
};

export default AboutPage;
