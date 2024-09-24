import { Counter } from "@/entities/Counter";
import { useTranslation } from "react-i18next";

import { ListBox } from "@/shared/ui/ListBox/ListBox";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Page } from "@/widgets/Page";

import { Example } from "@/entities/Example/Example";

const MainPage = () => {
  const { t } = useTranslation("main");

  return (
    <Page>
      <div>{t("Главная страница")}</div>
      <Counter />
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
      <Example />
      <StarRating size={50} />
    </Page>
  );
};

export default MainPage;
