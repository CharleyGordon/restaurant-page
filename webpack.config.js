const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, "./src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 5000,
    hot: true,
    open: true,
  },
  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      title: "restaurant page",
      filename: "index.html",
      template: path.resolve(__dirname, "./src/template.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(svg|jpg|jpeg|webp|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizer()],
    minimize: true,
  },
};
