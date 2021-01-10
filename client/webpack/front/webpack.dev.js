const { merge } = require('webpack-merge')
const path = require('path')

const { api:  { url, endpoints } } = require('config')

const baseConfig = require('../webpack.base')
const devConfig = require('../webpack.dev')

const srcPath = '../../src/'

module.exports = merge(baseConfig, devConfig, {
    entry: {
        main: path.join(__dirname, srcPath, 'index.ts'),
    },
    devServer: {
        port: 4004,
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