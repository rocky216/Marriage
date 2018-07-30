var path = require("path")
var webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    "./src/index.js"
  ],
  output: {
    publicPath: '',
    path:  path.resolve(__dirname + '/dist/'),
    filename: "build.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
      extensions: ['.js', '.jsx'], //后缀名自动补全
      modules : [path.resolve(__dirname, "src"), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {loader:'less-loader',options: {sourceMap:true}}
        ]
      },
      {
        test: /\.css$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'}
        ]
      },
    ]
  }

}
