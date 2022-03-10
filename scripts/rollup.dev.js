import { babel } from '@rollup/plugin-babel'
import { external, watch, plugins } from './rollup.config'
plugins.pop()
export default {
	input: 'src/dev.js',
	plugins: [...plugins, babel({ babelHelpers: 'bundled' })],
	output: [
		{
			file: 'dev.js',
			format: 'esm',
			name: '@os-js/like',
			globals: {},
		},
	],
	external,
	watch,
}
