var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "frontend"),
    entry: {
        home: './home',
        about: './about'
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].js',
        library: '[name]'
                //path: path.resolve(__dirname, 'dist')
    },
    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: NODE_ENV == 'development' ? 'source-map' : '',
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            // (the commons chunk name)
//            filename: "commons.js",
            // (the filename of the commons chunk)
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
            new UglifyJSPlugin()
            );
}