module.exports = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                        '@babel/preset-typescript'
                    ],
                    plugins: [
                        ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
                    ],
                }
            }

        ]
    }
]