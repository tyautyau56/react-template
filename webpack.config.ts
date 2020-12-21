import { Configuration } from "webpack";
import * as path from "path";
import {nodeModules} from "ts-loader/dist/constants";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;

const baseURL = process.env.BASE_URL ?? "/";

const config : Configuration = {
    target: "web",
    mode: isProduction ? "production" : "development",
    entry: {
        index: path.join(__dirname, "src", "index.tsx"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: baseURL,
        filename: "assets/script/[name].[contenthash:8].js",
        chunkFilename: "assets/script/chunk.[contenthash:8].js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader"
                    },
                ],
            },
        ]
    },
    devServer:{
        historyApiFallback: true,
    }
};

export default config;