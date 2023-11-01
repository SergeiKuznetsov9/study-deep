import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
}

// Здесь мы просто укажем путь до соответсвующего компонента до каждого маршрута
// Record<AppRoutes, string> означает объект, содержащий в качестве ключей составляющие
// enum AppRoutes, а в качестве значений - строки (сам путь)
export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
};

// далее объявляем сами роуты (маршруты, соответсвующие им компоненты)
// RouteProps - это тип из самого реакт-рутер-дом - это тип просов комопнента Route
export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    element: <AboutPage />,
  },
};
