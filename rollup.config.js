import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import path from 'path'
const name = path.basename(__dirname)

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/global.js',
      format: 'iife',
      name: name.toUpperCase().replace(/\W/g, '_'),
    },
    {
      file: 'dist/esm.js',
      format: 'es',
    },
  ],
  plugins: [typescript(), babel({ extensions: ['ts'] }), terser()],
}
