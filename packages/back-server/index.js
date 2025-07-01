import express from 'express';
import cors from 'cors';
import formidable from 'formidable';
import {PassThrough} from 'stream';

const app = express();
const port = 5001;

app.use(cors({origin: '*'}));

app.patch('/upload', (req, res) => {
	const form = formidable({
		multiples: true,
		fileWriteStreamHandler: () => new PassThrough(),
	});

	form.parse(req, async (err, fields, files) => {
		if (err) {
			console.error('❌ Form parse error:', err);
			return res.status(500).end();
		}

		const name = JSON.parse(fields.requestBody || '{}')?.name || '';
		console.log('✅ 사용자 이름:', name);

		// ✅ 병렬로 파일 내용 모두 읽기
		await Promise.all(
			Object.keys(files).map(async (ext) => {
				const file = Array.isArray(files[ext]) ? files[ext][0] : files[ext];
				const chunks = [];

				for await (const chunk of file._writeStream) {
					chunks.push(chunk);
				}

				const content = Buffer.concat(chunks).toString('utf-8');
				console.log(`📄 파일 확장자: .${ext}`);
				console.log(`📄 파일 이름: ${file.originalFilename}`);
				console.log(`📄 파일 내용:\n${content}`);
				console.log('='.repeat(50));
			}),
		);

		res.status(200).json({success: true});
	});
});

app.listen(port, () => {
	console.log(`✅ Node 서버 실행 중: http://localhost:${port}`);
});
