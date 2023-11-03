import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import webpack from "webpack";
import { BuildOptions } from "./types/config";

export const buildPlugins = ({
  paths,
  isDev,
}: BuildOptions): webpack.WebpackPluginInstance[] => [
  new HtmlWebpackPlugin({
    template: paths.html,
  }),

  new webpack.ProgressPlugin(),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  }),
  // Здесь мы присваиваем значение isDev в __IS_DEV__
  // теперь __IS_DEV__ нам доступна в коде приложения
  new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev),
  }),
];
