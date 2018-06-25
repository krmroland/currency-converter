const path = require("path");
//extract css from JavaScript modules
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    rules: [
        {
            //use absolute path to speed up module resolution instead of regular expressions like test:/\.scss$/
            test: path.resolve("src/sass/app.scss"),
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: "css-loader",
                        options: {
                            minimize: global.inProduction
                        }
                    },
                    {
                        loader: "postcss-loader",
                        // Necessary for external CSS imports to work
                        ident: "postcss",
                        options: {
                            plugins: [
                                new require("autoprefixer")({
                                    browsers: [">1%", "last 4 versions"],
                                    // dont add old flexbox spec properties for webkit
                                    flexbox: "no-2009"
                                })
                            ]
                        }
                    },

                    {
                        loader: "sass-loader",
                        options: {
                            //use 8 decimal places for all sass calculations
                            precision: 8
                        }
                    }
                ]
            })
        }
    ]
};
