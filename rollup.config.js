import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from "@rollup/plugin-json";
// import css from "rollup-plugin-import-css";
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const plugins = [
  resolve(),
  json(),
  // css(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
  }),
  commonjs(),
  postcss({
    plugins: [],
  }),
  production && terser() // minify, but only in production
];

const external = ['react', 'react-dom', 'styled-components', 'react-redux', 'react-markdown', 'styled-components', 'draft-js', 'markdown-draftjs', 'prop-types'];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        compact: true,
      },
    ],
    external,
    plugins,
  },
];
