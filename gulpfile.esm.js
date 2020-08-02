import babel from '@rollup/plugin-babel';
import cleanCss from 'gulp-clean-css';
import commonjs from '@rollup/plugin-commonjs';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import csslint from 'gulp-csslint';
// import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import htmllint from 'gulp-htmllint';
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
	watch as _watch,
} from 'gulp';
import { pipeline } from 'readable-stream';
import { terser } from 'rollup-plugin-terser';

export async function lintScripts() {
	return pipeline(
		src('./app/js/*.js'),
		// debug(),
		eslint(),
		eslint.format(),
		eslint.failAfterError(),
	);
}

export async function buildScripts() {
	const stream = pipeline(
		src('./app/js/index.js'),
		// debug(),
		rollup({
			plugins: [
				babel({
					babelHelpers: 'bundled',
				}),
				resolve(),
				commonjs(),
			],
		}, [
			{
				file: 'index.js',
				format: 'iife',
				plugins: [
					terser(),
				],
			},
		]),
		dest('./dist/static/'),
		connect.reload(),
	);
	return new Promise((res) => stream.on('end', res));
}

export async function lintStyle() {
	return pipeline(
		src('./app/css/*.css'),
		// debug(),
		csslint(),
		csslint.formatter(),
	);
}

export async function buildStyle() {
	const stream = pipeline(
		src('./app/css/*.css'),
		// debug(),
		concat('index.css'),
		cleanCss({
			level: 2,
		}),
		dest('./dist/static/'),
		connect.reload(),
	);
	return new Promise((res) => stream.on('end', res));
}

export async function lintHtml() {
	return pipeline(
		src('./app/index.html'),
		// debug(),
		include({
			prefix: '<!-- ',
			suffix: ' -->',
		}),
		htmllint(),
	);
}

export async function buildHtml() {
	const sources = src([
		'./dist/static/*.js',
		'./dist/static/*.css',
	], {
		read: false,
	});
	return pipeline(
		src('./app/index.html'),
		// debug(),
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
		dest('./dist/'),
		connect.reload(),
	);
}

export async function buildAssets() {
	return pipeline(
		src('./app/static/*'),
		// debug(),
		dest('./dist/static'),
		connect.reload(),
	);
}

export const scripts = series([lintScripts, buildScripts]);
export const style = series([lintStyle, buildStyle]);
export const html = series([lintHtml, buildHtml]);
export const assets = buildAssets;

export async function watch() {
	_watch(['./app/js/*.js'], scripts);
	_watch(['./app/css/*.css'], style);
	_watch(['./app/index.html', './app/svg/*.svg'], html);
	_watch(['./app/static/*'], assets);
	connect.server({
		root: './dist/',
		livereload: true,
	});
}

export const lint = parallel([lintScripts, lintStyle, lintHtml]);
export const build = series([
	buildScripts,
	buildStyle,
	buildAssets,
	buildHtml,
]);

export const all = series([lint, build]);

export default all;
