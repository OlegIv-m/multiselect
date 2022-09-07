const path = require("path");

module.exports = {
    entry: ["./src/index.tsx"],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: "asset/resource",
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                "style-lodaer",
                "css-loader",
                "sass-lodaer"
            ]
        },
        {
            test: /\.css$/,
            use: [
                require.resolve("style-lodaer"),
                {
                    loader: require.resolve("css-loader"),
                    options: {
                        importLoaders: 1
                    }
                }
            ]
        }
      ]
    }
}