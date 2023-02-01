const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')
const path = require('path')

// 双页面
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html', chunks: ['admin']
    })],
};


// 动态无限多页面
const filenames = fs.readdirSync('./src/pages')
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'))
const entries = filenames.reduce((result, name) =>
  ({ ...result, [name]: `./src/pages/${name}.js` }), {})
const plugins = filenames.map((name) =>
  new HtmlWebpackPlugin({
    filename: name + '.html', chunks: [name]
  }))
module.exports = {
  entry: { ...entries },
  plugins: [...plugins],
};