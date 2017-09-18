const path = require('path');
const autoprefixer = require('autoprefixer');
//const postcssImport = require('postcss-import');
const merge = require('webpack-merge');

const development = require('./dev.config.js');
const production = require('./prod.config.js');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

process.env.BABEL_ENV = TARGET;

const common = {
    entry: [
        PATHS.app,
    ],

    output: {
        path: PATHS.build,
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss'],
        modules: [
            PATHS.app,
            "node_modules"
        ]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [
                    path.resolve(__dirname, '../src')
                ]
            },
            {
                test: /bootstrap-sass\/assets\/javascripts\//,
                loader: "imports-loader",
                options: {
                    jQuery: 'jquery'
                }

            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                }

            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff2',
                }

            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/octet-stream',
                }

            },
            {
                test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'application/font-otf'
                }

            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    mimetype: 'image/svg+xml'
                }

            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
            },
             {
                test: /\.png$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }

            },
             {
                test: /\.jpg$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }

            },
        ],
    },

//    postcss: (webpack) => {
//        return [
//            autoprefixer({
//                browsers: ['last 2 versions'],
//            }),
//            postcssImport({
//                addDependencyTo: webpack,
//            }),
//        ];
//    },
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(production, common);
}