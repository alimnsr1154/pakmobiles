const { override, addWebpackResolve, addWebpackPlugin, overrideDevServer } = require('customize-cra');
const webpack = require('webpack');

// Function to customize the Webpack DevServer configuration
const customDevServerConfig = () => (config) => {
  config.allowedHosts = [
    'localhost',  // Add your allowed hosts here
    'example.com'
  ];
  return config;
};

module.exports = {
  webpack: override(
    addWebpackResolve({
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
      },
    }),
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    )
  ),
  devServer: overrideDevServer(
    customDevServerConfig()
  )
};
