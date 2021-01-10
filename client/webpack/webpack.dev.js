const merge = require('webpack-merge')
const path = require('path')

module.exports = {
    mode: 'development',
    target: 'web',
    output: {
        publicPath: '/',
    },
    devtool: 'eval-source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: path.resolve('dist'),
        historyApiFallback: true,
        inline: true,
        disableHostCheck: true,
        overlay: true,
    },
}
