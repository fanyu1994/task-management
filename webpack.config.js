const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: "8080",
    hot: true,
    open: true,
    historyApiFallback:{
      index:'/'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp)$/,
        use:[
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        use: "file-loader"
      },
      {
        test: /\.styl(us)?$/,
        use: ["style-loader", "css-loader", "stylus-loader"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html")
    }),
    new webpack.HotModuleReplacementPlugin
  ]
}