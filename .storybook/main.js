const path = require('path')

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx|svelte)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-svelte-csf',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	framework: '@storybook/svelte',
	svelteOptions: {
		preprocess: import('../svelte.config.js').preprocess,
	},
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: [/\.stories\.js$/, /index\.js$/],
			use: [require.resolve('@storybook/source-loader')],
			include: [path.resolve(__dirname, '../src')],
			enforce: 'pre',
		})
		config.resolve.alias = {
			...config.resolve.alias,
			$src: path.resolve(__dirname, '../src'),
			$components: path.resolve(__dirname, '../src/components'),
			$routes: path.resolve(__dirname, '../src/routes'),
		}
		return config
	},
	core: {
		builder: 'webpack4',
	},
}
