const path = require('path');

module.exports = {
    target: "node",
    mode: "production",
    devtool: "eval-source-map",
    entry: {
        app: './src/index.ts',
        playground: './src/playground.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
        ],
    },
    resolve: {
        extensions: ['.ts','.js'],
    },
    output: {
        publicPath: "dist",
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        hot: true,
    },
};
