const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler);
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const publicPath = webpackConfig.output.publicPath;
  const middleware = webpackDevMiddleware(compiler, {
    publicPath,
    serverSideRender: true,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  const regexString = `^(?:(?!\/${process.env.PEFIX_API}).)+$`;
  const regex = new RegExp(regexString);
  app.get(regex, (req, res) => {
    const { devMiddleware } = res.locals.webpack;
    const fs = devMiddleware.outputFileSystem;
    res.sendFile(path.resolve(compiler.outputPath, 'index.html'));
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
