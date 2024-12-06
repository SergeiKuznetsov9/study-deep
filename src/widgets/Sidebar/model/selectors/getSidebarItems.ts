import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import HomeIcon from "@/shared/assets/icons/home.svg";
import AboutIcon from "@/shared/assets/icons/Info.svg";
import ProfileIcon from "@/shared/assets/icons/avatar.svg";
import ArticleIcon from "@/shared/assets/icons/article.svg";
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from "@/shared/const/router";
import { buildSelector } from "@/shared/lib/store";

import { SideBarItemType } from "../types/sidebar";

export const [useSidebarItems, getSidebarItems] = buildSelector(
  createSelector(getUserAuthData, (userData) => {
    const sideBarItemsList: SideBarItemType[] = [
      {
        path: getRouteMain(),
        text: "Главная",
        Icon: HomeIcon,
      },
      {
        path: getRouteAbout(),
        text: "О сайте",
        Icon: AboutIcon,
      },
    ];

    if (userData) {
      sideBarItemsList.push(
        {
          path: getRouteProfile(userData._id),
          text: "Профиль",
          Icon: ProfileIcon,
          authOnly: true,
        },
        {
          path: getRouteArticles(),
          text: "Статьи",
          Icon: ArticleIcon,
          authOnly: true,
        }
      );
    }

    return sideBarItemsList;
  })
);
