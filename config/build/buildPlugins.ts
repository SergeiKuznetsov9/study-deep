import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import webpack from "webpack";
import { BuildOptions } from "./types/config";
import CopyPlugin from "copy-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

export const buildPlugins = ({
  paths,
  isDev,
  apiUrl,
}: BuildOptions): webpack.WebpackPluginInstance[] => [
  new HtmlWebpackPlugin({
    template: paths.html,
  }),

  new webpack.ProgressPlugin(),
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].css",
  }),
  new webpack.DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev),
    __API__: JSON.stringify(apiUrl),
  }),
  new CopyPlugin({
    patterns: [{ from: paths.locales, to: paths.buildLocales }],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new BundleAnalyzerPlugin({
    openAnalyzer: false,
  }),

  new CircularDependencyPlugin({
    exclude: /node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      diagnosticOptions: {
        semantic: true,
        syntactic: true,
      },
      mode: "write-references",
    },
  }),
];
