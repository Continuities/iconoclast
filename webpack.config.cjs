const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    "app": "./src/index.js"
  },
  mode: "development",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: [ "babel-loader", 'eslint-loader' ]
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.json/,
      type: 'asset/resource'
    }]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx"],
    modules: ["src", "node_modules"],
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/",
    filename: "[name].js"
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "static", "index.html"),
      filename: 'index.html'
    }),
    new CopyPlugin({
      patterns: [{ 
        from: 'static/manifest.webmanifest',
        to: 'static'
      }]
    })
  ]
};