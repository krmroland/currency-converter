const path = require("path");

//extract css from JavaScript modules
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// make errors friendly
const FriendlyErrors = require("friendly-errors-webpack-plugin");

//show some notifications

const WebpackNotifier = require("webpack-notifier");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const plugins = [
    new CleanWebpackPlugin(["dist"], {
        root: path.resolve(__dirname, "../")
    }),
    new WebpackNotifier({
        alwaysNotify: true,
        title: "ALC",
        contentImage: path.resolve(__dirname, "andela.png")
    }),

    new FriendlyErrors(),
    //extract css out of the js modules
    new ExtractTextPlugin({
        filename: "[name].css"
    }),
    //we would want the  scripts and links automatically generated with hashes
    new HtmlWebpackPlugin({
        template: path.resolve("public/index.html"),
        excludeChunks: ["serviceWorker"]
    })
];

module.exports = plugins;
