const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { resolveAssetsRootDir } = require('./utils');
const { message } = require('antd');
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
    }),
    // 项目打包进度条
    new WebpackBar(),
    // 优化控制台输出
    // new FriendlyErrorsWebpackPlugin({
    //     // 运行成功
    //     compilationSuccessInfo: {
    //         message: ['你的应用程序在这里运行http://localhost:8080/']
    //     },
    //     // 运行错误
    //     onErrors: function(severity,errors){
            
    //     },
    //     clearConsole: true,
    // })
]