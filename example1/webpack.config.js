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
        minimize: false,//webpack4 中默认是打开的，但是为了测试我把关了
        splitChunks: {

            /*
            all  异步和同步都可以共享
            async 表示对动态（异步）导入的模块进行分离。
            initial 表示对初始化值进行分离优化。
             */
            chunks: "all",
            /*
            * 分离合并
            * minSiz
            * 模块被分离前最小的模块大小以字节（b）为单位
            * 比如说现在设置的是430b  大于430b 不会被分离
            * 小于的430b 的文件则会合并
            * maxSize
            * 返回过来，设置了430b 大于这个值 文件就会被分离，防止文件过大
            * 在http1.0最大的请求数是6 在http2.0没有限制要求
            * */
            minSize: 430,
            /*
            *  连接符：
            *  此选项允许您指定用于生成名称的分隔符。
            *  假设我们生成了一个公用文件名字叫version，class-a,和class-b都依赖他，并且我们设置的连接符是"~"那么，
            *  最终生成的就是 version~class-a~class-b.js。
            *  */
            automaticNameDelimiter: '~',
        }
    },
};
