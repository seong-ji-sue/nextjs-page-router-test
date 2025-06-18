import next from 'next';
import express from 'express';
import config from './next.config.js';
import {resolve} from 'path';
import fs from 'node:fs';
import https from 'node:https';
import cors from 'cors';
import * as http from "http";

const __dirname = resolve();
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, dir: __dirname, conf: config});
const handle = app.getRequestHandler();

// const sslOptions = {
//     key: fs.readFileSync('./../../certificates/STAR.netand.co.kr_key.pem'),
//     cert: fs.readFileSync('./../../certificates/STAR.netand.co.kr_crt.pem'),
// };

app.prepare().then(() => {
    const server = express();

    server.use(
        cors({origin: [process.env.NEXT_PUBLIC_HOST_URL], credentials: true}),
    );

    server.use((req, res, next) => {
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

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    http.createServer( server).listen(process.env.NEXT_PUBLIC_REMOTE_PORT, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });
});
