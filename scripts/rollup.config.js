// https://www.rollupjs.com/guide/big-list-of-options
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
const version = require('../package.json').version
const input = 'src/index.js'
const plugins = [nodeResolve(), commonjs(), terser()]
const external = []
const watch = {
	exclude: 'node_modules/**',
}

export { input, plugins, external, watch, version }
