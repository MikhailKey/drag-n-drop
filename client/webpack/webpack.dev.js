const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base')

const { api:  { url, endpoints } } = require('config')

module.exports = merge(baseConfig, {
    mode: 'development',
    target: 'web',
    output: {
        publicPath: '/',
    },
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        contentBase: path.resolve('dist'),
        historyApiFallback: true,
        inline: true,
        disableHostCheck: true,
        overlay: true,
        proxy: [
            {
                context: Object.values(endpoints),
                changeOrigin: true,
                logLevel: 'debug',
                target: url,
            },
        ],
    },
})