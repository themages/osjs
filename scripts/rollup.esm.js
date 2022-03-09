import { input, version, external, watch, plugins } from './rollup.config'
plugins.pop()
export default {
	input,
	plugins,
	output: [
		{
			file: 'index.js',
			format: 'esm',
			banner: '/* @os-js/like version ' + version + ' */',
			footer: '/* follow me on https://github.com/tankan */',
			globals: {},
		},
	],
	external,
	watch,
}
