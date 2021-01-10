const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const baseConfig = require('../webpack.base')

const srcPath = '../../src/'

module.exports = merge(
    {
        entry: {
            main: path.join(__dirname, srcPath, 'index.ts'),
        },
        mode: 'production',
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                hash: true,
                template: path.resolve(__dirname, 'src/index.html'),
                production: true,
            }),
        ],
    },
    baseConfig
)
