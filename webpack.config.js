'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const webPath = process.env.NODE_ENV === 'production' ? './dist' : './tmp'

const config = {
    entry: './src/renderer/index.jsx',
    output: {
        path: './build/renderer',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
        }, {
            test: /\.html$/,
            loader: 'html?sourceMap'
        }, {
            test: /\.json$/,
            loader: 'json?sourceMap'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: process.env.NODE_ENV === 'production' ?
                'strip-loader?strip[]=console.log&strip[]=console.dir&strip[]=console.debug!webpack-unassert-loader!babel?sourceMap' : 'babel?sourceMap'
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: process.env.NODE_ENV === 'production' ?
                'strip-loader?strip[]=console.log&strip[]=console.dir&strip[]=console.debug!webpack-unassert-loader!babel?sourceMap' : 'babel?sourceMap'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: 'src/renderer/index.html'
        }, {
            from: 'src/package.json',
            to: '../'
        }, {
            from: 'src/browser/app.js',
            to: '../browser/'
        }, {
            from: 'src/app.icns',
            to: '../'
        }, {
            from: 'src/app.ico',
            to: '../'
        }, {
            from: 'src/browser/tray-icon.png',
            to: '../browser'
        }]),
        new CleanWebpackPlugin(['build'], {
            verbose: true,
            dry: false
        })
    ],
    devtool: '#source-map',
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    target: 'electron'
}

module.exports = config
