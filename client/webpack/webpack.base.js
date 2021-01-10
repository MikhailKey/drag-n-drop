const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ConfigWebpackPlugin = require('config-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const srcPath = '../src/'

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }
    return loaders;
}

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
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
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),

            }
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
        new HtmlWebpackPlugin({
            inject: true,
            hash: true,
            template: path.join(__dirname, srcPath, 'index.html'),
        }),
        new ConfigWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                patterns: [
                    {
                        from: 'src/common/assets/',
                        to: './asserts/',
                    },
                ]
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
}
