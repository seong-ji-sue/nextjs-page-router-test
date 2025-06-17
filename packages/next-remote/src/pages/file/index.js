import {useState} from 'react';

const Index = () => {
	const [file1, setFile1] = useState(null);
	const [file2, setFile2] = useState(null);
	const [username, setUsername] = useState('');

	const handleUpload = async () => {
		if (!file1 || !file2 || !username) {
			alert('이름과 파일 2개를 모두 선택해주세요.');
			return;
		}

		console.log(file1, file2);

		const formData = new FormData();
		formData.append('requestBody', JSON.stringify({name: username}));

		[file1, file2].forEach((file) => {
			const ext = file.name.split('.').pop();
			if (ext) {
				formData.append(ext, file);
			}
		});

		console.log(formData);
		const res = await fetch('/api/upload', {
			method: 'PUT',
			body: formData,
		});

		console.log('응답:', await res.text());
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Your name'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<br />
			<label>File 1:</label>
			<input
				type='file'
				onChange={(e) => setFile1(e.target.files?.[0] || null)}
			/>
			<br />
			<label>File 2:</label>
			<input
				type='file'
				onChange={(e) => setFile2(e.target.files?.[0] || null)}
			/>
			<br />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default Index;
