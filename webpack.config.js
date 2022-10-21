const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const env = process.env.NODE_ENV;

module.exports = {
    entry: './src/index.js',
    mode: env,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
      clean: true,
    },
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'public'),
          watch: true,
        },
      ],
      port: 3132,
    },
    optimization: {
      runtimeChunk: 'single',
    }, module: {
    rules: [
      {
        test: /\.(png|jpg|gif|otf|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000000,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        options: {
          esModule: true,
        },
        type: 'javascript/auto',
      },
    ],
  }, plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    env === 'development' ?
        new webpack.HotModuleReplacementPlugin() :
        new HtmlInlineScriptPlugin(),
        new HTMLInlineCSSWebpackPlugin(),
  ],
};
