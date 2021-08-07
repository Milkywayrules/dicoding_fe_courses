// @ts-check
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');

// use [contenthash] for better and specific hashing related to "the content"

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // handle css files
      {
        test: /.*\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // handle modern js
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
      // handle fonts
      {
        test: /.*\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    // handle html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    // split(?) css
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
      chunkFilename: 'assets/css/[id].[contenthash].css',
    }),
    // handle & generate favicons
    new FaviconsWebpackPlugin({
      logo: './static/images/icon/favicon-310.png',
      prefix: '',
      publicPath: '/static/images/icon',
      outputPath: './static/images/icon',
      cache: true,
      inject: true, // inject these icons to html tag
      favicons: {
        theme_color: '#EA580C', // match with inside of index.html (orange-600)
        icons: {
          // `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
          favicons: true,
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
  optimization: {
    // split js for better cache and split runtime aka node_modules etc
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // splitChunks: {
    //   chunks: 'all',
    // },
    minimizer: [
      // js minified by default in webpack 5
      // but we use multiple minimizer, so we init the terser again here
      new TerserPlugin({
        terserOptions: {
          // keep_classnames: true,
          // keep_fnames: true,
          mangle: false, // minified var etc names
        },
      }),
      // minify css
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
};
