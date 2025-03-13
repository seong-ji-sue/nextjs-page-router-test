import {parse} from 'url';
import next from 'next';
import https from 'node:https';
import fs from 'node:fs';
import {resolve} from 'path';
import config from './next.config.js';
import express from 'express';
import cors from 'cors';

const __dirname = resolve();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, dir: __dirname, conf: config});
const handle = app.getRequestHandler();

// const httpsOptions = {
// 	key: fs.readFileSync('./certificates/STAR.netand.co.kr_key.pem'),
// 	cert: fs.readFileSync('./certificates/STAR.netand.co.kr_crt.pem'),
// };



app.prepare().then(() => {
    const server = express();

    server.use(
        cors({origin: [process.env.NEXT_PUBLIC_HOST_URL], credentials: true}),
    );

    server.use(function (req, res, next) {
        res.setHeader(
            'Access-Control-Allow-Origin',
            process.env.NEXT_PUBLIC_HOST_URL,
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Range, Content-Type, Authorization',
        );
        res.setHeader(
            'Access-Control-Expose-Headers',
            'Content-Range, Content-Type, Authorization',
        );

        next();
    });

    server.use((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    https.createServer(server).listen(process.env.NEXT_PUBLIC_REMOTE_URL);
});
