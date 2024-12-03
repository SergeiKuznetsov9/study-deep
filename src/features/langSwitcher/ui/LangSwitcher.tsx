import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(({ short }) => {
  const { t, i18n } = useTranslation();

  const onToggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <Button variant="clear" onClick={onToggle}>
      {t(short ? "Короткий язык" : "Язык")}
    </Button>
  );
});
