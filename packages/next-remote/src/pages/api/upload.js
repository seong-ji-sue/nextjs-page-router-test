import formidable from 'formidable';
import {PassThrough, Readable} from 'stream';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
	api: {
		bodyParser: false,
	},
};

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
			method: 'PATCH', // ✅ PATCH로 변경
			headers: form.getHeaders(),
			body: form,
		});

		res.status(200).end();
	} catch (err) {
		console.error('❌ Upload error:', err);
		res.status(500).end();
	}
}
