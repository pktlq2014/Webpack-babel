const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// tách các thư viện ra thành vendor.js giúp tăng performance
// const VENDOR_LIST = [
//     'axios',
//     'jquery',
//     'react',
//     'react-dom',
//     'react-redux',
//     'react-router-dom',
//     'redux',
//     'redux-thunk'
// ]
const config = {
    // đang code thì dùng development -> release dự án thì dùng production
    mode: 'development', // // lệnh này sẽ làm cho webpack thông báo lỗi sẽ đến từ file nào luôn chứ không để lỗi ở bundle nữa hoặc dùng devtool: 'inline-source-map',
    // watch: true, // thằng này giúp tự động lắng nghe và cập nhật sự thay đổi nhưng gì dùng devServer rồi không cần dùng nó nữa
    // entry: './src/index.tsx', // điểm bắt đầu
    entry: {
        // chỗ này có thể thêm nhiều điểm bắt đầu và gộp nó lại trong file bundle
        bundle: [
            './src/index.tsx'
        ],
        // vendor: VENDOR_LIST // tách các thư viện ra thành vendor.js giúp tăng performance
    },
    // trường hợp muốn tách ra 2 file riêng
    // entry: {
    //     index: './src/index.tsx',
    //     home: './src/home.tsx' // và thằng bundle.js ở dưới đổi thành [name].js
    // },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: { // kết quả đầu ra sau khi đóng gói
        // và thằng bundle.js ở dưới đổi thành [name].js
        // filename: 'bundle.js', // output ra 1 file tên là bundle.js
        // thêm [chunkhash].js để mã hóa tên file script ở .html
        filename: '[name].js', // output ra 1 file tên là bundle.js
        path: path.join(__dirname, 'dist'), // output nó sẽ tạo ra 1 folder tên là build ngoài cùng và có 1 file tên là: bundle.js
        publicPath: '/', // vị trí file
        clean: true, // dùng để clean những folder or file trong folder dist không dùng ngoài bundle và .html đang dùng ra hoặc dùng new CleanWebpackPlugin
    },
    module: {
        rules: [
            // chuyển đổi es lớn hơn 6 thành es5 bằng cách sử dụng babel-loader
            {
                // tất cả các file .js sử dụng babel-loader
                // use: {

                //     options: {
                //         // presets: ['@babel/preset-env'] // đã setup bên file .babelrc rồi
                //     }
                // },
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
                // test là tìm những file có đuôi là gì đó
                test: /\.(ts|js)x?$/, // tìm hết các file có đuôi là .js (dấu $ là kết thúc, nghĩa là những file kết thúc có đuôi là .js)
                exclude: '/(node_modules|bower_components)/' // không load folder node_modules giúp tăng tốc độ vì folder này rất nặng
                //exclude: '/node_modules/', // không load folder node_modules giúp tăng tốc độ vì folder này rất nặng
            },
            // tách file .css ra ngoài bundle.js
            {
                // test là tìm những file có đuôi là gì đó
                // test: /\.css$/,
                test: /\.scss$/,
                // test: /\.(css|scss)x?$/,
                // tất cả các file .css sử dụng style-loader và css-loader
                // import 2 thằng này vào mới nhận được css import ở component
                use: ['style-loader', 'css-loader', 'sass-loader']
                //use: [MiniCssExtractPlugin.loader, 'css-loader']
                // use: [
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //         options: {
                //         }
                //     },
                //     "css-loader", // thiếu thằng style-loader
                // ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            // {
            //     loader: 'file-loader',
            // }
        ]
    },
    // devtool: 'cheap-module-eval-source-map',
    // devtool: 'inline-source-map', 
    devServer: { // thằng này chỉ dùng cho lệnh npm run serve 
        //contentBase: path.join(__dirname, 'dist'), // đổi ở file bundle tại folder dist
        // contentBase: '/',
        // disableHostCheck: true,
        // historyApiFallback: true,
        // overlay: true,
        // stats: 'minimal',
        // inline: true,
        open: true, // giống live server tự động mở trình duyệt mới
        compress: true,
        port: 9001, // đổi port sang 9000 nếu muốn
    },
    // optimization này giúp giảm dung lượng khi sử dụng thư viện thứ 3
    // VD: khi sử dung lodash, mỗi component khai báo 1 lần
    // nhiều compo khai báo như v sẽ rất năng
    // optimi sẽ giúp tạo ra 1 nơi chứa lodash và các component tự gọi lodash
    // mà k cần phải khai báo ra -> giúp giảm dung lượng file
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'all'
    //             }
    //         }
    //     },
    //     runtimeChunk: {
    //         name: "manifest",
    //     }
    // },
    plugins: [
        //new MiniCssExtractPlugin('style.css') // tên file .css sau khi tách ra khỏi bundle
        // nếu dùng jquery thì khai báo
        // new webpack.ProvidePlugin({
        //     '$': 'jquery',
        //     'jQuery': 'jquery',
        //     'window.$': 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        // kỹ thuật code splitting
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        // names: ['vendor', 'manifest'],
        //     filename: 'vendor.js',
        // }),
        // MiniCssExtractPlugin.loader,
        // new WebpackManifestPlugin({}),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        // new CleanWebpackPlugin
        // packet này giúp tạo ra cùng 1 lượt với file bundle nó là .html -> không cần phải đổi tên lại script trong .html khi file bundle thay đổi
        new HtmlWebpackPlugin({
            template: 'src/index.html',

            // title: 'Webpack - babel',
            // filename: 'index.html',
            // templateContent: `
            // <!DOCTYPE html>
            // <html lang="en">
            // <head>
            //     <meta charset="UTF-8">
            //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
            //     <title>Webpack - babel</title>
            // </head>
            // <body>
            //     <div id="root" ></div>
            // </body>
            // </html>
            // `
        })
    ]
}
module.exports = config;