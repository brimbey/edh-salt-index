const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: {
    main: ['./src/index.js'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'app.bundle.js',
  },
  stats: {
    assets: true,
    publicPath: true,
    entrypoints: true,
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|api/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        include: /node_modules\/@react-spectrum/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl|\.css$/,
        include: /src/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: './build/app.bundle.js.map',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    }),
    new webpack.DefinePlugin({
      'process.env.SCALE_MEDIUM': 'true',
      'process.env.SCALE_LARGE': 'true',
      'process.env.THEME_LIGHT': 'true',
      'process.env.THEME_LIGHTEST': 'false',
      'process.env.THEME_DARK': 'false',
      'process.env.THEME_DARKEST': 'true',
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/public'),
        to: path.join(__dirname, '/build'),
      },
    ]),
  ],
  mode: 'production',
  optimization: {
    minimize: true,
  },
  devServer: {
    port: 3000,
    openPage: 'index.html',
  },
  resolve: {
    symlinks: false,
  },
};

module.exports = (env, argv) => {
  const { mode } = argv;
  if (mode === 'development') {
    config.devtool = 'source-map';
    config.mode = mode;
    config.optimization.minimize = false;
  } else if (mode === 'production') {
    config.mode = mode;
    config.entry = './src/index.js';
  }
  return config;
};
