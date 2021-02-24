module.exports = {
  lintOnSave: false,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/, // this is what you are looking for
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
}
