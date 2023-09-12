const path = require("path");
module.exports = {
  entry: "./src/index.tsx",
    module: {
      rules: [
          {
              test: /\.jsx?$/,
              use: "ts-loader",
              exclude: /node_modules/,
          },
          {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/,
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
          },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    output: {
      filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    }
};