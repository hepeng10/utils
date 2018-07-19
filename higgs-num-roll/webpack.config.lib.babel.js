import path from 'path';
import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {
    entry: ['./src/components/NumRoll.jsx'],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'lib'),
        library: 'higgs-result-modal',
        libraryTarget: 'umd',
        filename: 'index.js'
    },
    externals: {
        'react'       : 'umd react',
        'react-dom'   : 'umd react-dom'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            use: ['babel-loader']
        }, {
            test: /\.(css|scss)$/,
            include: path.join(__dirname, 'src'),
            use: ['style-loader', 'css-loader?modules', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `/images/[hash].[ext]`
                }
            }]          
        }, {
            test: /\.ico$/,
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `./images/[name].[ext]`
                }
            }]        
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['lib']),                  // 清除编译目录
        new webpack.LoaderOptionsPlugin({
            minimize: true,                                 // 压缩loader读取的文件
            options: {
                postcss: function () {
                    return [precss, autoprefixer];
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({    // 压缩混淆js文件
            comments: false
        })
    ]
};