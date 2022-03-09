import { babel } from '@rollup/plugin-babel'
import { input, version, external, watch, plugins } from './rollup.config'
export default {
	input,
	plugins: [...plugins, babel({ babelHelpers: 'bundled' })],
	output: [
		{
			file: 'umd.js',
			format: 'umd',
			name: '@os-js/like',
			indent: true,
			globals: {},
			banner: '/* @os-js/like version ' + version + ' */',
			footer: '/* follow me on https://github.com/tankan */',
		},
	],
	external,
	watch,
}
