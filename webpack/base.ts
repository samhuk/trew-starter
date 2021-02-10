import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isProduction = process.env.NODE_ENV === 'production'

// -- Paths
const ENTRY_FILE_PATH = './src/client/main.tsx'
const INDEX_HTML_FILE_PATH = './src/client/index.html'
const OUTPUT_DIR = './build/client'

// -- Helpful functions
const fileNameTemplate = (ext: string) => (isProduction
  ? `[name].[chunkhash].min.${ext}`
  : `[name].${ext}`)

const fileLoaderFileNameTemplate = () => (isProduction
  ? 'content/[name].[hash].[ext]'
  : 'content/[name].[ext]')

// -- Config
export const config: webpack.Configuration = {
  entry: [ENTRY_FILE_PATH],
  output: {
    path: path.resolve(OUTPUT_DIR),
    filename: fileNameTemplate('js'),
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.css', '.scss'] },
  plugins: [
    new HtmlWebpackPlugin({
      template: INDEX_HTML_FILE_PATH,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml',
        options: { name: fileLoaderFileNameTemplate() },
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff',
        options: { name: fileLoaderFileNameTemplate() },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream',
        options: { name: fileLoaderFileNameTemplate() },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: { name: fileLoaderFileNameTemplate() },
      },
    ],
  },
}

export default config
