const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: "production",
    entry: {
        english: "./src/english.js",
        math: "./src/math.js",
        chinese: "./src/chinese.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',  //  async、 initial 、 all
            minSize: 0,
            // maxInitialRequests : 入口点的最大并行请求数。这个要看情况而定，
            //maxAsyncRequests ：number 按需加载时并行请求的最大数目
            maxInitialRequests: 1,
            automaticNameDelimiter: '~',
            /*
            * maxSize的优先级高于maxInitialRequest / maxAsyncRequests。
             * 实际优先级为maxInitialRequest / maxAsyncRequests <maxSize <minSize。
            * */
        }
    },
};

