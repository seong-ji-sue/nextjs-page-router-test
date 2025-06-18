import formidable from 'formidable';
import {PassThrough, Readable} from 'stream';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
	api: {
		bodyParser: false,
	},
};

// export const parseForm = (req) =>
// 	new Promise((resolve, reject) => {
// 		const form = formidable({
// 			multiples: true,
// 			keepExtensions: true,
// 			//버퍼를 소비하지 않는 백프레셔 문제 해결 (
// 			fileWriteStreamHandler: (file) => {
// 				const pass = new PassThrough(); //스트림 생성
// 				let fileBuffer = Buffer.from(''); //버퍼 준비
// 				pass.on(
// 					//데이터 올 때마다 버퍼 채우기
// 					'data',
// 					(chunk) => (fileBuffer = Buffer.concat([fileBuffer, chunk])),
// 				);
// 				pass.on('end', () => (file.buffer = fileBuffer)); //버퍼 다 차면 파일 객체 저장
// 				pass.on('error', (err) => reject(err));
// 				return pass;
// 			},
// 		});
//
// 		form.parse(req, (err, fields, files) => {
// 			if (err) return reject(err);
// 			resolve({fields, files}); // 파싱된 필드와 파일을 반환
// 		});
// 	});

const parseForm = (req) =>
	new Promise((resolve, reject) => {
		const form = formidable({
			multiples: true,
			keepExtensions: true,
			fileWriteStreamHandler: () => new PassThrough(),
		});
		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			else resolve({fields, files});
		});
	});

export default async function handler(req, res) {
	if (req.method !== 'PUT') {
		res.status(405).end();
		return;
	}

	try {
		const {fields, files} = await parseForm(req);
		const name = JSON.parse(fields.requestBody || '{}')?.name || '';

		console.log('handler', files);

		const form = new FormData();
		form.append('requestBody', JSON.stringify({name}));

		for (const key of Object.keys(files)) {
			const file = Array.isArray(files[key]) ? files[key][0] : files[key];
			const chunks = [];

			for await (const chunk of file._writeStream) {
				chunks.push(chunk);
			}
			const buffer = Buffer.concat(chunks);

			form.append(key, Readable.from(buffer), {
				filename: file.originalFilename,
				contentType: file.mimetype,
			});
		}

		await fetch('http://localhost:5001/upload', {
			method: 'PATCH',
			headers: form.getHeaders(),
			body: form,
		});

		res.status(200).end();
	} catch (err) {
		console.error('❌ Upload error:', err);
		res.status(500).end();
	}
}
