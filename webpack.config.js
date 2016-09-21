var webpack = require('webpack');
module.exports = {
    entry:{
        index:'./js/index.js'
    },
    output:{
        path:'./js',
        filename:'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",query:{presets: ['es2015']}}
        ]
    }
}