import { FC, memo, useEffect } from "react";

import LightIcon from "@/shared/assets/icons/deprecated/light-theme.svg";
import DarkIcon from "@/shared/assets/icons/deprecated/dark-theme.svg";
import { Button, ButtonTheme } from "@/shared/ui/deprecated/Button";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { Icon } from "@/shared/ui/deprecated/Icon";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(({ className }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.remove(Theme.DARK, Theme.LIGHT, Theme.ORANGE);
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <Button
      onClick={toggleTheme}
      className={className}
      theme={ButtonTheme.CLEAR}
    >
      <Icon
        Svg={theme === Theme.LIGHT ? DarkIcon : LightIcon}
        width={"40px"}
        height={"40px"}
        inverted
      />
    </Button>
  );
});
