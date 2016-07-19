module.exports = {
  entry: "./build/main.js",
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0"]
      }
    }]
  }
};
