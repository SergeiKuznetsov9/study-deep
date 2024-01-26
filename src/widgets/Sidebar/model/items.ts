import HomeIcon from "shared/assets/icons/home.svg";
import AboutIcon from "shared/assets/icons/about.svg";
import ProfileIcon from "shared/assets/icons/profile.svg";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

export interface SideBarItemType {
  path: string;
  text: string;
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  authOnly?: boolean;
}

export const SideBarItemsList: SideBarItemType[] = [
  {
    path: RoutePath.main,
    text: "Главная страница",
    Icon: HomeIcon,
  },
  {
    path: RoutePath.about,
    text: "О сайте",
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: "Профиль",
    Icon: ProfileIcon,
    authOnly: true,
  },
];
