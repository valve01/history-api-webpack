// Ставим вот это вот все: 

// npm i -D @babel/core @babel/preset-env babel-loader copy-webpack-plugin cross-env css-loader css-minimizer-webpack-plugin csv-loader dart-sass eslint eslint-webpack-plugin file-loader html-webpack-plugin mini-css-extract-plugin postcss postcss-loader postcss-preset-env sass sass-loader style-loader terser-webpack-plugin webpack webpack-bundle-analyzer webpack-cli webpack-dev-server xml-loader xml2js

// npm i jquery normalize.css

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === "development";
console.log("is Dev:", isDev);

const filename = (extention) =>
	isDev ? `[name].${extention}` : `[name].[contenthash].${extention}`;

const cssLoaders = (preProcLoader) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		"css-loader",
		{
			loader: "postcss-loader",
			options: {
				postcssOptions: {
					plugins: [
						[
							"postcss-preset-env",
							{
								// Options
							},
						],
					],
				},
			},
		},
	];
	if (preProcLoader) {
		loaders.push(preProcLoader);
	}
	return loaders;
};

const plugins = () => {
	const basePlugins = [
		new HTMLWebpackPlugin({
			template: "./index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "src/assets/favicon"),
					to: path.resolve(__dirname, "dist/assets/favicon"),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename("css"),
		}),
		new ESLintPlugin(),
	];
	if (!isDev) {
		basePlugins.push(new BundleAnalyzerPlugin());
	}
	return basePlugins;
};

module.exports = {
	mode: "development",

	entry: {
		main: ["./index.js"],
		analytics: "./analytics.js",
	},

	output: {
		filename: filename("js"),
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},

	plugins: plugins(),

	devtool: isDev ? "source-map" : false,

	context: path.resolve(__dirname, "src"),

	resolve: {
		extensions: [".js", ".json", ".png"],
		alias: {
			"@models": path.resolve(__dirname, "src", "models"),
			"@": path.resolve(__dirname, "src"),
		},
	},

	optimization: {
		splitChunks: {
			chunks: "all",
		},
		minimize: !isDev,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},

	devServer: {
		hot: isDev,
		watchFiles: [path.join(__dirname, "src/**/*.*"), path.join(__dirname, "*.*")],
		port: 4400,
		static: {
			directory: path.join(__dirname, "dist"),
		},
		open: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders("sass-loader"),
			},
			{
				test: /\.(ico|png|gif|jpe?g|svg)$/,
				type: "asset/resource",
				// Указываем куда положить обработанные фалы внутри папки dist
				generator: {
					filename: "assets/images/[name][ext]",
				},
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[name][ext]",
				},
			},
			{
				test: /\.xml$/,
				use: ["xml-loader"],
			},
			{
				test: /\.csv$/,
				use: ["csv-loader"],
			},
		],
	},
};
