const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/main.js',
    persistance: './src/js/persistance.js',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      }
    ]
  }
};
