const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ConfigWebpackPlugin = require('config-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

const srcPath = '../src/'
const publicPath = '../public/'

module.exports = {
    entry: {
        main: path.join(__dirname, srcPath, 'index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
        modules: [
            'node_modules',
            path.join(__dirname, srcPath),
            path.resolve(__dirname, `${srcPath}/modules`),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(jpg|png|eot|svg|otf|ttf|woff|woff2|ico|mp4|webm|ogv)$/,
                use: 'file-loader',
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: path.join(__dirname, publicPath, 'index.html'),
        }),
        new ConfigWebpackPlugin(),
        new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/common/assets/',
                        to: './assets/',
                    },
                ]
            }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
}
