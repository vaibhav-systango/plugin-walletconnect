const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'web3modal.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "process": require.resolve("process/browser"),
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
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
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
