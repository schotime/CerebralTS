module.exports = {
  entry: "./src/main.tsx",
  output: {
    path: './build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 3000
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        loader: 'babel-loader!ts-loader'
      }
    ]
  }
};
