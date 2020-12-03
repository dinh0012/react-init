/**
 * COMMON WEBPACK CONFIGURATION
 */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== 'undefined';
const isProduction = typeof process.env.BUNDLE_ANALYZE === 'production';
const ManifestPlugin = require('webpack-manifest-plugin');

const appDirectory = process.cwd();

const publicPath = path.resolve(appDirectory, 'public');
const buildPath = path.resolve(appDirectory, 'build');

// eslint-disable-next-line max-lines-per-function
module.exports = options => {
  isAnalyze &&
    options.plugins.push(new BundleAnalyzerPlugin({ generateStatsFile: true }));

  return {
    mode: options.mode,
    entry: options.entry,
    output: {
      // Compile into js/build.js
      path: buildPath,
      publicPath: '/',

      // Merge with env dependent settings
      ...options.output,
    },
    optimization: options.optimization,
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: options.babelQuery,
          },
        },
        {
          test: /\.ts(x?)$/, // Transform typescript files with ts-loader
          exclude: /node_modules/,
          use: options.tsLoaders,
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader', // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                  paths: [path.resolve(__dirname, 'node_modules')],
                  webpackImporter: false,
                  modifyVars: {
                    'ant-prefix': 'inflow',
                    'font-size-base': '12px',
                  },
                },
              },
            },
          ],
        },
        {
          // Preprocess 3rd party .css files located in node_modules
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
                noquotes: true,
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'images/[name].[ext]',
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
              },
            },
            /* {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
            },
          }, */
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        },
      ],
    },
    plugins: options.plugins
      .concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; Terser will automatically
        // drop any unreachable code.
        new webpack.EnvironmentPlugin({
          NODE_ENV: 'development',
        }),
        // Generate a manifest file which contains a mapping of all asset filenames
        // to their corresponding output file so that tools can pick it up without
        // having to parse `index.html`.
        // new ManifestPlugin(),
        // Moment.js is an extremely popular library that bundles large locale files
        // by default due to how Webpack interprets its code. This is a practical
        // solution that requires the user to opt into importing specific locales.
        // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
        // You can remove this if you don't use Moment.js:
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        isProduction &&
          new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            exclude: [/\.map$/, /asset-manifest\.json$/],
            importWorkboxFrom: 'cdn',
            navigateFallbackBlacklist: [
              // Exclude URLs starting with /_, as they're likely an API call
              new RegExp('^/_'),
              // Exclude URLs containing a dot, as they're likely a resource in
              // public/ and not a SPA route
              new RegExp('/[^/]+\\.[^/]+$'),
            ],
          }),
        isProduction &&
          new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/service-worker.js',
            exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/, /\.html$/],
            // Bump up the default maximum size (2mb) that's precached,
            // to make lazy-loading failure scenarios less likely.
            // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
            maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
          }),
        // Run typescript checker
        new ForkTsCheckerWebpackPlugin({
          async: !isProduction,
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: publicPath,
              to: buildPath,
            },
          ],
        }),
      ])
      .filter(Boolean),
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
  };
};
