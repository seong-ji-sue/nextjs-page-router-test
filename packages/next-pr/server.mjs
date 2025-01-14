import express from 'express';
import next from 'next';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 디렉토리 경로 가져오기
const __dirname = dirname(fileURLToPath(import.meta.url));

// 번들 결과물 경로 설정
const commonBundlePath = join(__dirname, '.next/static/common/bundle.esm.js');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Rollup 번들된 유틸리티 함수 테스트 API
    server.get('/api/test', async (req, res) => {
        // 동적으로 모듈 가져오기
        const sharedUtils = await import(commonBundlePath);
        const result = sharedUtils.add(5, 3); // 예: add 함수 호출
        res.json({ result });
    });

    // Default Next.js request handler
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
