//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
//var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
//var WebpackChunkHash = require("webpack-chunk-hash");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [
                    path.resolve(__dirname, "src"),
                ],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [
                    {
                        loader: 'react-hot-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'stage-0', 'react'],
                            plugins: ['transform-runtime']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer,
                                    precss
                                ];
                            }
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
//        new webpack.NoEmitOnErrorsPlugin()
    ]
};