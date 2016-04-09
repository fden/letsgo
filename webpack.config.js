var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './src/index'
        ],
        dashboard: './src/app',
        monitoring: './src/app'
    },
    output: {
        path: path.join(__dirname, '/static/'),
        filename: '[name].bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'config')]
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: [path.join(__dirname, 'src'), path.join(__dirname, 'config/fakeApi')]
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /\.svg$/, loader: 'svg-loader' }
        ]
    },
    resolve: {
        root: path.join(__dirname, "src")
    }
};