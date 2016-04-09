var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var devConfig =  require('./webpack.dev.config.js');
var testConfig = require('./webpack.test.config');

const env = process.env.NODE_ENV || 'development';

if (env == 'development') {
    var config = devConfig;
} else {
    var config = testConfig;
}

console.log(process.env.NODE_ENV );

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3000');
    });