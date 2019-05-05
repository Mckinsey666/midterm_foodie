const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', path.join(__dirname, "js", "index.js")],
    node: {
      net: "empty",
      fs: "empty",
      tls: "empty",
      "child_process": "empty",
      './types/standard': "empty",
      './types/other': "empty"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js",
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
        publicPath: "/"
    }, 
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    }
};