const webpack = require('webpack');
var autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//const extractSass = new ExtractTextPlugin({
//    filename: "bundle.css",
//    disable: process.env.NODE_ENV === "development"
//});

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'bootstrap-loader',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        publicPath: '/dist/',
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }, 
                    {
                        loader: "sass-loader"
                    },
//                    {
//                        loader: 'postcss-loader',
//                    }
                ]
//                        [
//                    {
//                        loader: 'style-loader'
//                    },
//                    {
//                        loader: 'css-loader',
//                        options: {
//                            importLoaders: 1,
//                            modules: true,
//                            localIdentName: '[path][name]--[local]'
//                        }
//                    },
//                    {
//                        loader: 'postcss-loader',
//                        options: {
//                            plugins: function () {
//                                return [
//                                    autoprefixer,
//                                ];
//                            }
//                        }
//                    },
//                    {
//                        loader: 'sass-loader'
//                    }
//                ]
            }

        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new ExtractTextPlugin('bundle.css'),
//        extractSass,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
};