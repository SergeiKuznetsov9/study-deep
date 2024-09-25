import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { ListBox } from "@/shared/ui/ListBox/ListBox";

const MainPage = () => {
  const { t } = useTranslation("main");

  return (
    <Page>
      <div>{t("Главная страница")}</div>
      <ListBox
        defaultValue="Выберите значение"
        onChange={(value: string) => console.log(value)}
        value={undefined}
        items={[
          { value: "1", content: "123" },
          { value: "12", content: "vdxb", disabled: true },
          { value: "13", content: "mh" },
        ]}
      />
    </Page>
  );
};

export default MainPage;
