const path = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname);

const extractPlugin = new extractTextWebpackPlugin({
    filename: 'main.css'
})

const config = {
    context: path.resolve(ROOT),

    entry: {
        app: './src/app.js',
        loader:'./src/loader.js'
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
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
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
        new HtmlWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.join(ROOT, 'src'), 
        port: 8080
    }
}

module.exports = config;