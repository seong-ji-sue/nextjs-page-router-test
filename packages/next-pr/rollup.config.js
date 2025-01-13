import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser';
import {join} from 'path';

const commonSrcPath = join(__dirname, '../common/src/index.js'); // common 소스 파일
const outputPath = join(__dirname, '.next/static/common'); // 번들링 결과 저장 위치

export default {
	input: commonSrcPath, // common의 시작 파일
	output: [
		{
			file: join(outputPath, 'bundle.esm.js'), // ESM 번들
			format: 'esm',
			sourcemap: true,
		},
		{
			file: join(outputPath, 'bundle.cjs.js'), // CommonJS 번들
			format: 'cjs',
			sourcemap: true,
		},
	],
	plugins: [
		resolve(), // Node.js 의존성 해석
		commonjs(), // CommonJS 모듈을 ESM으로 변환
		json(), // JSON 파일 지원
		terser(), // 코드 최소화
	],
	external: ['react', 'react-dom'], // React 및 ReactDOM은 외부 의존성으로 처리
};
