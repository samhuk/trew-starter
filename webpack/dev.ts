import webpackMerge from 'webpack-merge'
import webpack from 'webpack'
import base from './base'

// Note: This *must* be relative to the directory of ENTRY_FILE_PATH
const TS_LOADER_TS_CONFIG_FILE_PATH = '../../tsconfig/dev.json'

export const config: webpack.Configuration = webpackMerge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
  ],
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        // This must be, oddly, relative to the entry file defined above (i.e. app.tsx)
        options: { configFile: TS_LOADER_TS_CONFIG_FILE_PATH },
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  }
})

export default config
