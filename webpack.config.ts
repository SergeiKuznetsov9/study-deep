import webpack from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildPaths } from "./config/build/types/config";
import path from "path";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
};

const mode = "development";
const isDev = mode === "development";

const config: webpack.Configuration = buildWebpackConfig({
  mode: "development",

  // тут будут различные пути (до входной точки, до папки куда делается сборка,
  // до HTML и т.д.)
  // Это будет выглядить так: мы будем принимать их из вне. И там, откуда они будут
  // поступать, мы будем их конфигурировать по условию
  paths,
  isDev,
});

export default config;
