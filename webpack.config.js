const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // Use 'production' for minified output
  entry: {
    bundle: './src/contentScript.js', // Entry point for your content script
    // You can add more entry points if you have other scripts
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: '[name].js', // Output filename, [name] is replaced by the name of the entry
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files
        exclude: /node_modules/, // except those in "node_modules"
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env'], // Preset used for env setup
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    fallback: {
      "process": require.resolve("process/browser"),
      "buffer": require.resolve("buffer/"),
      "Buffer": require.resolve("buffer/"),
    },
  },
};
