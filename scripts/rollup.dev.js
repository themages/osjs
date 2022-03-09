import { babel } from '@rollup/plugin-babel'
import { input, external, watch, plugins } from './rollup.config'
plugins.pop()
export default {
	input,
	plugins: [...plugins, babel({ babelHelpers: 'bundled' })],
	output: [
		{
			file: 'index.js',
			format: 'esm',
			name: '@os-js/like',
			globals: {},
		},
	],
	external,
	watch,
}
