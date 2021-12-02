const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolveAssetsRootDir } = require('./utils')
module.exports = [
    // 简化网页打包
    new HtmlWebpackPlugin({
        template: 'build/tpl/index.html',
        minify: {
            /**
             * @description 删除注释、空格，尽可能删除属性的引号，主要用作压缩
             */
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        }
    }),
    // 分离css与js
    new MiniCssExtractPlugin({
        filename: resolveAssetsRootDir('css/[name].css')
    })
]