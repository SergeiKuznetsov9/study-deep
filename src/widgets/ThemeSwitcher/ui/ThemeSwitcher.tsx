import { FC, useEffect } from "react";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import LightIcon from "shared/assets/icons/light-theme.svg";
import DarkIcon from "shared/assets/icons/dark-theme.svg";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Button
      onClick={toggleTheme}
      className={classNames(cls.ThemeSwitcher, {}, [className])}
      theme={ButtonTheme.CLEAR}
    >
      {theme === Theme.LIGHT ? (
        <DarkIcon width={"40px"} height={"40px"} />
      ) : (
        <LightIcon width={"40px"} height={"40px"} />
      )}
    </Button>
  );
};
