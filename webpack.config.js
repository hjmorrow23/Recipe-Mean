var webpack = require('webpack'),
       path = require('path');
      
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//Webpag config including angular and bundling into recipe.bundle.js
module.exports = {
    context: __dirname + '/app',
    entry: {
        app: './app.js',
        vendor: ['angular', 'angular-route']  
    },
    output: {
        path: __dirname + '/public/js',
        filename: 'recipe.bundle.js'
    },
    
    watch: true,
    
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"})
    ]
};