var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx','.json']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: process.env.NODE_ENV === 'production'
		})
	],
	devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
	module : {
		loaders : [
			{
				test : /(\/index)?\.jsx?/,
				include : APP_DIR,
				loader : 'babel-loader'
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
			}
		],
	}
};

module.exports = config;
