const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'web3modal.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json'], // Add more extensions if necessary
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "process": require.resolve("process/browser.js"), // Specify the extension
      "assert": require.resolve("assert/"),
      "zlib": require.resolve("browserify-zlib"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "url": require.resolve("url/"),
      "os": require.resolve("os-browserify/browser")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser.js', // Specify the extension
      Buffer: ['buffer', 'Buffer'],
    }),
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
