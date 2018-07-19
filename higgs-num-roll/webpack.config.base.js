import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const STATIC_PATH = 'static';
const extractVendor = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].vendor.css`);
const extractStyle = new ExtractTextPlugin(`${STATIC_PATH}/css/[contenthash].style.css`);

export default {
    entry: {
        main: ['./src/index.jsx'],
        vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'build'),
        filename: `${STATIC_PATH}/js/[chunkhash].[name].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            use: ['babel-loader']
        /**
         * 第三方组件的css, scss抽离为独立文件vendor.css
         */
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'node_modules'),
            use: extractVendor.extract(['css-loader', 'postcss-loader', 'sass-loader'])
        /**
         * 主项目的css合并到style.css
         */
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'src'),
            use: extractStyle.extract(['css-loader?modules', 'postcss-loader', 'sass-loader'])
        /**
         * 字体加载器
         */
        }, {
            test: /\.(woff|eot|ttf|svg)$/,
            include: path.join(__dirname, 'src/fonts'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/fonts/[hash].[ext]`
                }
            }]
        /**
         * 图片加载器
         */
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/images/[hash].[ext]`
                }
            }]          
        }, {
            test: /\.ico$/,
            include: path.join(__dirname, 'src/images'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${STATIC_PATH}/images/[name].[ext]`
                }
            }]        
        }]
    },
    plugins: [
        extractVendor,
        extractStyle,
        new CleanWebpackPlugin(['build']),                  // 清除编译目录
        new webpack.optimize.CommonsChunkPlugin('vendor'),  // 提取公共模块
        new HtmlWebpackPlugin({                             // 主页面入口index.html
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,                                 // 压缩loader读取的文件
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        })
    ]
};