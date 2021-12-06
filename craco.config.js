const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			console.log(webpackConfig);
			return webpackConfig;
		},
		// plugins: [new BundleAnalyzerPlugin()],
	},
};
