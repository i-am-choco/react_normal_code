const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        app: path.join(__dirname, './../', 'src/app.tsx'),
    },
    output: {
        path: path.join(__dirname, './../', 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                include: [path.join(__dirname, './../','src')],
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            // 是否使用css modules
                            modules: true,
                            // 类名导出
                            namedExport: true,
                            // 支持驼峰
                            camelCase: true,
                            // 使用less
                            less: true
                        }
                    },
                    'less-loader',
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'build/tpl/index.html'
        })
    ]
}