import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import HomeIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/about.svg";
import ProfileIcon from "@/shared/assets/icons/profile.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { SideBarItemType } from "../types/sidebar";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sideBarItemsList: SideBarItemType[] = [
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
  ];

  if (userData) {
    sideBarItemsList.push(
      {
        path: `${RoutePath.profile}${userData.id}`,
        text: "Профиль",
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: "Статьи",
        Icon: ArticleIcon,
        authOnly: true,
      }
    );
  }

  return sideBarItemsList;
});
