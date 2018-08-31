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
    /*
    *  该项操作webpack只关心异步(动态)导入，
    * 即使 english.js、 math.js 、chinese.js 都引入了 class-c.js,也不会被打包为一个独立的文件。
    * */
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'initial',  //  async、 initial 、 all
            /*
            * all 见example 1
            * async 该项操作webpack只关心异步(动态)导入，即使 english.js、 math.js 、chinese.js 都引入了 class-c.js,也不会被打包为一个独立的文件。
            * initial 这个属性的意思是告诉webpack，我希望将动态导入的文件和非动态导入的文件分别打包，如果一个模块被动态引入，也被非动态引入。那么这个模块将会被分离2次。被分别打包到不同的文件中。
            * */
            minSize: 0,
            automaticNameDelimiter: '~',
        }
    },
};
/*
* 当 chunks: 'initial',时 解答下运行过程
* 运行webpack，dist下会有7个文件，不要惊慌我将会解答每个文件生成的过程。 english.bundle.js、math.bundle.js、chinese.bundle.js、这三个是入口文件不做过多的解释。
   async-class-a.bundle.js 是因为chinese.js、english.js、math.js。 都异步引入了class-a。
   async-class-b.bundle.js 是因为chinese.js异步引入了class-b。然而english~math.bundle.js 文件的内容和async-class-b.bundle.js几乎完全一样，都包含了class-b模块。这是因为 english.js、math.js都非异步的引入了class-b。
  chinese~english~math.bundle.js 是因为chinese.js、english.js、math.js。 都非异步引入了class-c.js。
* */
