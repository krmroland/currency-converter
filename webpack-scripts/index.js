const path = require("path");

// web pack environment
const mode = process.env.NODE_ENV || "development";

global.inProduction = mode === "production";

const modules = require("./module");

const plugins = require("./plugins");

const config = {
    mode,
    module: modules,
    plugins,
    //entry points
    entry: {
        app: path.resolve("src/js/app.js")
    },

    //destination for trans-piled files
    output: {
        path: path.resolve("dist"),
        // hash the file name
        filename: "js/[name].[hash:8].js"
    },

    performance: {
        hints: false
    },
    stats: {
        entrypoints: false
    }
};

module.exports = config;
