const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
require("@babel/register")

module.exports = {
    entry: ['@babel/polyfill', './src/index.ts'],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        //     name: (dev || noHash) ? '[name].[ext]' : '[name].[contenthash].[ext]',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.css', '.less'],
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    output: {
        path: __dirname + '/public',
        filename: 'game.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            hash: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/data',
                    to: './data',
                    filter: async (resourcePath) => {
                        // const data = await fs.promises.readFile(resourcePath)

                        // add your custom extension here if not listed
                        var texture = /\.(jpe?g|gif|png|svg|heic|pkm|pvr)$/
                        var fnt = /\.(woff|woff2|ttf|fnt)$/
                        var map = /\.(tmx|tsx)$/
                        var audio = /\.(wav|mp3|mpeg|opus|ogg|oga|wav|aac|caf|m4a|m4b|mp4|weba|webm|dolby|flac)$/
                        var misc = /\.(xml|bin|glsl|ym|json|js)$/

                        // only copy production files
                        var ret = texture.test(resourcePath) ||
                            fnt.test(resourcePath) ||
                            map.test(resourcePath) ||
                            audio.test(resourcePath) ||
                            misc.test(resourcePath)

                        if (ret === false) {
                            console.log("ignoring data: " + resourcePath)
                        }
                        return ret
                    },
                }
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: './src/favicon/logo.png', // svg works too!
            mode: 'auto', // optional can be 'webapp', 'light' or 'auto' - 'auto' by default
            devMode: 'webapp', // optional can be 'webapp' or 'light' - 'light' by default
            favicons: {
                appName: '???????????????',
                appDescription: '??????????????????????????????',
                developerName: 'jianguoke.cn',
                developerURL: "http://www.jianguoke.cn", // prevent retrieving from the nearest package.json
                icons: {
                    coast: false,
                    yandex: false
                }
            }
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        hot: true,
        port: 9000,
        open: true
    },
    watch: false

}