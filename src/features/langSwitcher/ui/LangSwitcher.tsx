import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { Button, ButtonTheme } from "@/shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = memo(
  ({ className, short }) => {
    const { t, i18n } = useTranslation();

    const onToggle = () => {
      i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    };
    return (
      <Button
        theme={ButtonTheme.CLEAR}
        onClick={onToggle}
        className={className}
      >
        {t(short ? "Короткий язык" : "Язык")}
      </Button>
    );
  }
);
