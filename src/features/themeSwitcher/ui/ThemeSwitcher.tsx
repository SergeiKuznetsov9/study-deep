import { FC, memo, useEffect } from "react";

import ThemeIcon from "@/shared/assets/icons/theme.svg";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { Theme } from "@/shared/const/theme";
import { Icon } from "@/shared/ui/Icon";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo(() => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.classList.remove(Theme.DARK, Theme.LIGHT, Theme.ORANGE);
    document.body.classList.add(theme);
  }, [theme]);

  return <Icon Svg={ThemeIcon} clickable onClick={toggleTheme} />;
});
