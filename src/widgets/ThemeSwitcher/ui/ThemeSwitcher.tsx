import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import LightIcon from "shared/assets/icons/light-theme.svg";
import DarkIcon from "shared/assets/icons/dark-theme.svg";
import { Button, ThemeButton } from "shared/ui/Button/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      theme={ThemeButton.CLEAR}
    >
      {theme === Theme.LIGHT ? (
        <DarkIcon width={"40px"} height={"40px"} />
      ) : (
        <LightIcon width={"40px"} height={"40px"} />
      )}
    </Button>
  );
};
