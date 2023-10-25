const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "src", "index.ts"),

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),

    new webpack.ProgressPlugin(),
  ],

  module: {
    // правила обработки файлов, подпадающих под условие в test
    rules: [
      {
        // под эту регулярку попадают и tsx и ts
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // При импорте файлов с таким расширением не нужно указывать расширение
    extensions: [".tsx", ".ts", ".js"],
  },
};
