/**
 * Created by jsliu on 2017/11/16.
 */
const webpack=require("webpack");
const path=require("path");
const htmlPlugin=require("html-webpack-plugin");
const extractTextPlugin=require("extract-text-webpack-plugin");
const website={
    publicPath:"http://localhost:1717/"
};
const glob=require("glob");
const purifyCssPlugin=require("purifycss-webpack");
module.exports={
    entry:{
        entry1:'./src/entrys/entry1.js',
        entry2:'./src/entrys/entry2.js',
        entry3:'./src/entrys/entry3.js',
        entry4:'./src/entrys/testJquery.js',
        cssCommon:'./src/css/common.css',
        cssEntry1:'./src/css/entry1.css',
        cssEntry2:'./src/css/entry2.css',
        cssEntry3:'./src/css/entry3.css',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
        publicPath:website.publicPath
    },
    module:{
        rules:[{
            test:/\.css$/,
            use:extractTextPlugin.extract({
                fallback: "style-loader",
                use:[
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {loader:'postcss-loader'}
                ]
            })
        },{
            test:/\.(jpg|png|gif)$/,
            use:[{
                loader:'url-loader',
                options:{
                    limit:5000,
                    outputPath:'images/'
                }
            }]
        },{
            test:/\.(html|htm)$/i,
            use:['html-withimg-loader']
        },{
            test:/\.(js|jsx)$/,
            use:['babel-loader'],
            exclude:/node_modules/
        }]
    },
    plugins:[
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin('[name].css'),
        new purifyCssPlugin({
             paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        new webpack.ProvidePlugin({
            $:'jquery'
        }),
        new webpack.BannerPlugin('刘建省学习所用')
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:'1717'
    }
}