import express from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { sharedUtils } from '../packages/common/dist/bundle.esm.js'; // Rollup 번들 가져오기

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // Rollup 번들된 유틸리티 함수 테스트 API
    server.get('/api/test', (req, res) => {
        const result = sharedUtils();
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
