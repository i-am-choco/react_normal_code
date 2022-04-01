module.exports = {
    // 缓存webpack固定生成的代码块，该代码块通常不变，用于维系各个模块之间的关系
    runtimeChunk: {
        name: 'manifest'
    },
    // 指定需要进行分块的代码，和分块后文件名
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all'
            }
        }
    }
}