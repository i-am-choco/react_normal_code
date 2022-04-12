const { resolve } = require('./../utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = [
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'less-loader',
                options: {
                    javascriptEnabled: true,
                }
            },
        ]
    }
]