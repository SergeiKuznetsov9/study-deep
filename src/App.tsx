import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainPageAsync } from "./pages/MainPage/MainPageAsync";
import { AboutPageAsync } from "./pages/AboutPage/AboutPageAsync";
import { Suspense } from "react";

export const App = () => (
  <div>
    <Link to={"/"}>ГЛАВНАЯ</Link>
    <Link to={"/about"}>О НАС</Link>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={"/"} element={<MainPageAsync />} />
        <Route path={"/about"} element={<AboutPageAsync />} />
      </Routes>
    </Suspense>
  </div>
);
