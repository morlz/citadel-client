const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglify-es-webpack-plugin')

var config = {
    context: path.join(__dirname, 'src'),
    entry: {
        main: ['babel-polyfill', './main.js'],
		curtains: ['./curtains.js']
	},
    output: {
        path: path.join(__dirname, process.env.NODE_ENV == 'dev' ? 'assets' : 'dist'),
        filename: '[name].js'
    },
    plugins: [
		new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
			'serverAddr' : process.env.NODE_ENV == 'dev' ? '`http://77.51.118.12/www15/blog/public`' : "'public'",
        })
	],
    resolve: {
        alias: {
            //'@': path.join(__dirname, '../', 'src/'),
            vue: 'vue/dist/vue.js'
        }
    },
    target: 'web',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(jquery|socket|vue|less)/,
            loader: 'babel-loader'
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: true
                }
            }
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    less: "style-loader!css-loader!less-loader!"
                }
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2|otf|css|png|gif)$/,
            loader: 'file-loader',
			options: {
				name: 'resources/[sha512:hash:base64:7].[ext]',
			}
        }]
    },
    //devtool: "source-map",
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
}

if (process.env.NODE_ENV == 'production') config.plugins.push(new UglifyJSPlugin())

module.exports = config
