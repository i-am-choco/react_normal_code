const TsconfigPathPlugin = require('tsconfig-paths-webpack-plugin')
const plugins = require('./plugins')
const { resolve } = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')
const fileRules = require('./rules/fileRules')
const optimization = require('./optimization')

module.exports = {
    entry: {
        app: resolve('src/index.tsx'),
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [...jsRules, ...styleRules, ...fileRules],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [
            new TsconfigPathPlugin({
                configFile: resolve('tsconfig.json')
            })
        ]
    },
    plugins: [...plugins],
    optimization,
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
    },
}