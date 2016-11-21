let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        inline: true,
        contentBase: './static',
        outputPath: path.join(__dirname, 'build')
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        root: '',
        alias: {
            TweenMax: __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.tpl.html',
            inject: 'body',
            filename: 'index.html',
            hash: true
        }),
        new CopyWebpackPlugin(
            [{
                from: 'static'
            }],
            {
                ignore: ['.DS_Store', '.keep']
            }
        ),
        new webpack.ProvidePlugin({
           $: "jquery",
           jquery: "jquery",
           "windows.jQuery": "jquery",
           jQuery:"jquery"
        })
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['add-module-exports']
                }
            },
            {
               test: /node_modules/,
               loader: 'ify'
             },
             {
               test: /\.(glsl|frag|vert)$/,
               exclude: /node_modules/,
               loader: 'raw!glslify'
             },
             { test: /\.css$/, loader: "style-loader!css-loader" },
             {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
             {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
             {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
             {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
             {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
              {
                test: /\.json$/,
                loader: 'json'
              },
             {
              test: /\.(jpe?g|png|gif)$/i,
              loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]'
                // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
              ]
            }
        ]
    }
};
