import buble from 'rollup-plugin-buble';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';
import json from 'rollup-plugin-json';
import nodent from 'rollup-plugin-nodent';

const base = {
    input: 'src/sdk.js',
    output: {
        file: `dist/pomment-sdk.${process.env.NODE_ENV === 'production' ? 'min.' : ''}js`,
        name: 'Pomment',
        format: 'umd',
        sourcemap: true,
    },
    plugins: [
        progress({
            clearLine: false,
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        json(),
        eslint({
            exclude: ['**/*.html', '**/*.css', '**/*.json'],
        }),
        nodent({
            promises: true,
            noRuntime: true,
        }),
        buble({
            transforms: {
                modules: false,
                dangerousForOf: true,
            },
            objectAssign: 'Object.assign',
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify()),
    ],
};

if (process.env.NODE_ENV === 'development') {
    base.watch = {
        chokidar: true,
        include: 'src/',
    };
}

export default base;
