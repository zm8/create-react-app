const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			console.log(webpackConfig);
			return webpackConfig;
		},
		alias: {
			Src: path.resolve(__dirname, 'src'),
		},
		// plugins: [new BundleAnalyzerPlugin()],
	},
};
