'use strict';
var path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const rimraf = require('rimraf');
//const extractCSS = new ExtractTextPlugin('[name].css', {allChunks: true});

var ccsnew = new ExtractTextPlugin({
    filename: 'common.css',
//    filename: 'common.[contenthash].css',
    allChunks: true
});
//  var ccsnew  = new ExtractTextPlugin({
//      filename:'[name].css',
//      allChunks: true
//  });
module.exports = {
    context: path.resolve(__dirname, "frontend"),
    entry: {
        home: './home',
        about: './about',
        common: './common'
    },
//    entry: {
//        about: [
//            'webpack-dev-server/client?http://localhost:8081',
//            'webpack/hot/only-dev-server',
//            './about'
//        ],
//        home: [
//            'webpack-dev-server/client?http://localhost:8081',
//            'webpack/hot/only-dev-server',
//            './home'
//        ],
//        common: [
//            'webpack-dev-server/client?http://localhost:8081',
//            'webpack/hot/only-dev-server',
//            './common'
//        ]
//
//    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        publicPath: '/assets/',
//        filename: '[name].[chunkhash].js',
        filename: '[name].js',
        chunkFilename: '[id].js',
//        chunkFilename: '[id].[chunkhash].js',
        library: '[name]'
    },

    resolve: {
        extensions: ['.js', '.styl']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'file-loader?name=[path][name].[ext]',
//                    loader: 'file-loader?name=[path][name].[hash:6].[ext]',
                }
            },
            {
                test: /\.jade$/,
                use: {
                    loader: 'jade-loader',
                }
            },
            {
                test: /\.styl$/,
//                use: ExtractTextPlugin.extract({
//                    fallback: 'style-loader',
//                    use: ['css-loader', 'stylus-loader']
//                })

                use: ['style-loader', 'css-loader', 'stylus-loader']
//                use: ccsnew.extract({
//                    fallback: 'style-loader',
//                    use: ['css-loader', 'stylus-loader']
//                })
            }
        ]
    },

    plugins: [
        {
            apply: (compiler) => {
                rimraf.sync(compiler.options.output.path);
            }
        },

//        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
        }),
        ccsnew,

        new AssetsPlugin({
            filename: 'assets.json',
            path: __dirname + '/public/assets'
        }),
//        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        host: 'localhost',
        port: 8081,
//        proxy: {
//            '*': 'http://localhost:8080'
//        },
        hot: true,
//        publicPath: '/',
//        proxy: [
//            {
//                path: /.*/,
//                target: 'http://localhost:3000'
//            }
//        ]
        contentBase: path.resolve(__dirname, "public"),
    }
};