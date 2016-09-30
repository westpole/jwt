const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: './client/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'form.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: 'body'
        })
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }
};