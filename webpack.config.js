const webpack = require('webpack');
const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname);

const extractPlugin = new extractTextWebpackPlugin({
    filename: '[name].css'
})
const config = {
    context: path.resolve(ROOT),

	devtool: 'inline-source-map',
    entry: {
        app: './src/app.js',
        login:'./src/login.js',
        loader: './src/loader.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(ROOT, 'src', 'dist'),
        publicPath: '/src/dist/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.scss|css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            },
            {
                test: /\.(woff|woff2|ttf|svg)$/,
                loader: 'url-loader?limit=8192&name=[name]-[hash].[ext]',
                options: {
                    prefix: 'etc'
                }
            },
            {
                test: /\.(ttf)$/,
                loader: 'file-loader'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                loader: 'file-loader'
            },
            {
                test: /\.jpg/,
                loader: 'file'
            }
        ]
    },
    plugins: [
        extractPlugin,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),  

    ],
    devServer: {
        contentBase: path.join(ROOT, 'src'),
        port: 8080, 
        hotOnly: true,
		historyApiFallback: true
    }
}

module.exports = config;
