const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env']
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'inline-source-map',
    devServer: {
        port: '3001',
        host: '0.0.0.0',
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
