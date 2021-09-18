module.exports = {
	webpack: {
		configure: (webpackConfig, { env, paths }) => {
			console.log(webpackConfig);
			return webpackConfig;
		},
	},
};
