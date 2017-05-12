var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanCSSPlugin = require("less-plugin-clean-css");
const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});
module.exports = {
	entry: './main.js',
	output: {
		filename: 'bundle.js'
	},
	resolve: {
		modules: [
			"node_modules"
		]
	},
	module: {
		rules: [
			{
				test: /\.js/,
				use: ['babel-loader'],
				exclude: /(node_modules|)/
			},
			{
				test : /\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			},
			{
                test: /\.hbs/,
				use: ['handlebars-loader'],
                exclude: /(node_modules|bower_components)/
            },
			{
				test:/\.less$/,
				use: extractLess.extract({
					use: [
                        {
                            loader:"css-loader"
                        },
                        {
                            loader:"less-loader", options: {
								plugins: [
									new CleanCSSPlugin({ advanced: true })
								]
                        	}
                        }
                    ],
                    fallback: "style-loader"
				})
			}

		]
	},
	plugins:[
		new ExtractTextPlugin('bundle.css'),
        extractLess
	]
};