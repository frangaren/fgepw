import babel from '@rollup/plugin-babel';
import cleanCss from 'gulp-clean-css';
import commonjs from '@rollup/plugin-commonjs';
import concat from 'gulp-concat';
import debug from 'gulp-debug';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-file-include';
import inject from 'gulp-inject';
import injectSvg from 'gulp-inject-svg';
import resolve from '@rollup/plugin-node-resolve';
import rollup from 'gulp-better-rollup';
import {
	dest,
	series,
	src,
	parallel,
} from 'gulp';
import { pipeline } from 'readable-stream';
import { terser } from "rollup-plugin-terser";

export async function lintScripts() {

}

export async function buildScripts() {
	return pipeline(
		src('./app/js/index.js', { read: false }),
		debug(),
		rollup({
			plugins: [
				babel({
					babelHelpers: 'bundled',
				}),
				resolve(),
				commonjs(),
			]
		}, [
			{
				file: 'index.js',
				format: 'iife',
				plugins: [
					terser(),
				],
			}
		]),
		dest('./dist/static/'),
	);
}

export async function lintStyle() {

}

export async function buildStyle() {
	return pipeline(
		src('./app/css/*.css'),
		debug(),
		concat('index.css'),
		cleanCss({
			level: 2,
		}),
		dest('./dist/static/')
	);
}

export async function lintHtml() {

}

export async function buildHtml() {
	const sources = src([
		'./dist/static/*.js',
		'./dist/static/*.css'
	], {
		read: false
	});
	return pipeline(
		src('./app/index.html'),
		debug(),
		include({
			prefix: '<!-- ',
			suffix: ' -->',
		}),
		inject(sources, {
			ignorePath: '/dist/',
			addRootSlash: false,
		}),
		injectSvg({ base: './app/' }),
		htmlmin(),
		dest('./dist/')
	);
}

export async function buildAssets() {
	return pipeline(
		src('./app/static/*'),
		debug(),
		dest('./dist/static'),
	);
}

export const scripts = series([lintScripts, buildScripts]);
export const style = series([lintStyle, buildStyle]);
export const html = series([lintHtml, buildHtml]);
export const assets = buildAssets;

export const lint = parallel([lintScripts, lintStyle, lintHtml]);
export const build = series([
	parallel(buildScripts, buildStyle, buildAssets),
	buildHtml
]);

export const all = series([lint, build]);
export default all;
