const { resolve } = require('./../utils')
module.exports = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: 'awesome-typescript-loader',
                options: {
                    // 构建缓存
                    useCache: true,
                    cacheDirectory: resolve('.cache-loader')
                }
            }
        ]
    }
]