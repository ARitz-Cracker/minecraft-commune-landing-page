import { resolve as pathResolve } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
const __dirname = import.meta.dirname;

export default (env, argv) => {
	const config = {
		entry: {
			"the-website.dist": ["./src/index.ts", "./styles/index.css"]
		},
		devtool: argv.mode == "production" ? undefined : false,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					use: [MiniCssExtractPlugin.loader, "css-loader"]
				}
			],
		},
		output: {
			filename: "[name].js",
			path: pathResolve(__dirname, "static", "md-bundle"),
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
			// I hate that TSC's decision to not support module import rewriting has knockoff effects like this
			extensionAlias: {
				'.js': ['.js', '.ts'],
			}
		},
		plugins: [new MiniCssExtractPlugin()],
		optimization: argv.mode == "production" ? {
			minimizer: [
				`...`,
				new CssMinimizerPlugin(),
			]
		} : {
			providedExports: true,
			usedExports: true,
			concatenateModules: true,
			flagIncludedChunks: true,
			removeAvailableModules: true,
			sideEffects: true
		},
		mode: argv.mode,
		stats: argv.mode == "production" ? "normal" : "detailed"
	};
	return config;
};
