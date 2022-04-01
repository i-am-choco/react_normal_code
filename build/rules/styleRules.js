const { resolve } = require('./../utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = [
    {
        test: /\.less$/,
        include: [resolve('src')],
        use: [
            // css写入单独文件中，不写入js
            MiniCssExtractPlugin.loader,
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
            {
                loader: 'less-loader',
                options: {
                    includePaths: [resolve('src/styles')],
                }
            }
        ]
    }
]