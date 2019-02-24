// TODO: Подключить TS
// const withTypescript = require('@zeit/next-typescript');
// module.exports = withTypescript();
exports.webpack = config =>
  Object.assign(config, {
    target: 'electron-renderer',
    devtool: 'cheap-module-source-map',
    plugins: config.plugins.filter(p => p.constructor.name !== 'UglifyJsPlugin')
  });
