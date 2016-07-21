module.exports = {
  entry: {
    main: "./src/main.tsx"
  },
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
        test: /\.tsx?$/,
        loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0!ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
