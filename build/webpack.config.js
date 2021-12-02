const TsconfigPathPlugin = require('tsconfig-paths-webpack-plugin')
const plugins = require('./plugins')
const { resolve } = require('./utils')
const jsRules = require('./rules/jsRules')
const styleRules = require('./rules/styleRules')

module.exports = {
    entry: {
        app: resolve('src/app.tsx'),
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [...jsRules, ...styleRules],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        plugins: [
            new TsconfigPathPlugin({
                configFile: resolve('tsconfig.json')
            })
        ]
    },
    plugins: [...plugins]

}