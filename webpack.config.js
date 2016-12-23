var webpack = require('webpack');
var path = require('path');
var config = {
   entry: {
      app:'./public/app/App.js'
   },
	
   output: {
      filename:'public/build/bundle.js',
      sourceMapFilename: 'public/build/bundle.map',
   },

   dectool:'#source-map',
	
	  module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;