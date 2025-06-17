import React, {useState, useRef} from 'react';

const MultiFileUpload = () => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [message, setMessage] = useState('');
	// 드래그 중인지 표시하는 상태
	const [isDragActive, setIsDragActive] = useState(false);

	const fileInputRef = useRef(null);

	// 실제 input을 클릭하는 함수
	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// 선택된 파일들을 state에 추가하는 공통 로직
	const addFilesToSelectedState = (files) => {
		const newFiles = Array.from(files);
		if (newFiles.length > 0) {
			// 기존 파일에 새로 선택된 파일들을 추가
			setSelectedFiles((prevFiles) => {
				// 중복 파일 필터링 로직 (선택 사항):
				// 파일 이름과 크기가 같으면 이미 존재하는 파일로 간주하고 추가하지 않음
				const uniqueNewFiles = newFiles.filter(
					(newFile) =>
						!prevFiles.some(
							(existingFile) =>
								existingFile.name === newFile.name &&
								existingFile.size === newFile.size,
						),
				);
				return [...prevFiles, ...uniqueNewFiles];
			});
			setMessage(''); // 새 파일 선택 시 메시지 초기화
		}
	};

	// input을 통한 파일 선택 핸들러
	const handleFileChange = (event) => {
		addFilesToSelectedState(event.target.files);
		// input 요소는 같은 파일을 다시 선택하면 change 이벤트를 발생시키지 않을 수 있으므로 reset
		if (fileInputRef.current) {
			// Ref가 null이 아닌지 확인
			fileInputRef.current.value = '';
		}
	};

	// 드래그 앤 드롭 이벤트 핸들러들
	const handleDragOver = (event) => {
		event.preventDefault(); // 드롭을 허용하기 위해 기본 동작 막기
	};

	const handleDragEnter = (event) => {
		event.preventDefault();
		setIsDragActive(true); // 드래그 활성 상태로 변경 (시각적 피드백)
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDragActive(false); // 드래그 비활성 상태로 변경
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setIsDragActive(false); // 드래그 비활성 상태로 변경
		addFilesToSelectedState(event.dataTransfer.files); // 드롭된 파일 추가
	};

	// 파일 제거 핸들러
	const handleRemoveFile = (indexToRemove) => {
		setSelectedFiles((prevFiles) =>
			prevFiles.filter((_, index) => index !== indexToRemove),
		);
		setMessage('');
		setUploading(false);
	};

	// 파일 업로드 핸들러 (이전 코드와 동일)
	const handleUpload = async () => {
		if (selectedFiles.length === 0) {
			setMessage('업로드할 파일이 없습니다.');
			return;
		}

		setUploading(true);
		setMessage('업로드 중...');

		const formData = new FormData();
		selectedFiles.forEach((file) => {
			formData.append('files', file);
		});

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				const data = await response.json();
				setMessage(`업로드 성공: ${data.message}`);
				setSelectedFiles([]);
			} else {
				const errorData = await response.json();
				setMessage(`업로드 실패: ${errorData.message || '서버 오류'}`);
			}
		} catch (error) {
			console.error('업로드 중 오류 발생:', error);
			setMessage(`네트워크 오류: ${error.message}`);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div style={styles.container}>
			{/* 파일 입력 부분 */}
			<div style={styles.fileInputSection}>
				<input
					type='file'
					multiple
					onChange={handleFileChange}
					ref={fileInputRef}
					style={styles.hiddenInput}
				/>

				<button onClick={handleButtonClick} style={styles.selectFileButton}>
					파일 선택
				</button>

				<span style={styles.selectedFileStatus}>
					{selectedFiles.length > 0
						? `${selectedFiles.length}개 파일 선택됨`
						: '선택된 파일 없음'}
				</span>
			</div>

			{/* 드래그 앤 드롭 영역 겸 파일 목록 */}
			<div
				style={{
					...styles.fileListContainer,
					...(isDragActive ? styles.dragActive : {}), // 드래그 중일 때 스타일 적용
				}}
				onDragOver={handleDragOver}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				{selectedFiles.length > 0 ? (
					<ul style={styles.fileList}>
						{selectedFiles.map((file, index) => (
							<li key={index} style={styles.fileListItem}>
								<span style={styles.fileName}>{file.name}</span>
								<button
									onClick={() => handleRemoveFile(index)}
									style={styles.removeFileButton}
								>
									<span style={styles.removeIcon}>—</span>
								</button>
							</li>
						))}
					</ul>
				) : (
					<p style={styles.noFileSelectedText}>
						파일을 드래그하여 여기에 놓거나
						<br />
						'파일 선택' 버튼을 클릭해주세요.
					</p>
				)}
			</div>

			<button
				onClick={handleUpload}
				disabled={uploading || selectedFiles.length === 0}
				style={styles.uploadButton}
			>
				{uploading ? '업로드 중...' : '선택 파일 업로드'}
			</button>

			{message && <p style={styles.message}>{message}</p>}
		</div>
	);
};

export default MultiFileUpload;

const styles = {
	container: {
		padding: '20px',
		maxWidth: '500px',
		margin: '20px auto',
		border: '1px solid #ddd',
		borderRadius: '8px',
		fontFamily: 'Arial, sans-serif',
		boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
	},
	fileInputSection: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '15px',
	},
	hiddenInput: {
		display: 'none',
	},
	selectFileButton: {
		padding: '8px 15px',
		border: '1px solid #ccc',
		borderRadius: '4px',
		backgroundColor: '#f0f0f0',
		cursor: 'pointer',
		fontSize: '14px',
		marginRight: '10px',
		whiteSpace: 'nowrap',
		boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
		transition: 'background-color 0.2s',
		'&:hover': {
			backgroundColor: '#e0e0e0',
		},
	},
	selectedFileStatus: {
		fontSize: '14px',
		color: '#555',
	},
	fileListContainer: {
		border: '2px dashed #a0a0a0', // 드래그 앤 드롭을 위한 점선 테두리
		borderRadius: '4px',
		minHeight: '150px',
		padding: '10px',
		marginBottom: '15px',
		backgroundColor: '#f9f9f9',
		overflowY: 'auto',
		display: 'flex', // 내부 콘텐츠를 중앙 정렬하기 위함
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		transition: 'border-color 0.2s, background-color 0.2s',
	},
	dragActive: {
		// 드래그 중일 때 적용될 스타일
		borderColor: '#007bff',
		backgroundColor: '#e6f3ff',
	},
	fileList: {
		listStyle: 'none',
		padding: 0,
		margin: 0,
		width: '100%',
		flexGrow: 1, // 목록이 차지하는 공간을 늘림
	},
	fileListItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '8px 5px',
		borderBottom: '1px solid #eee',
		backgroundColor: '#fff',
		borderRadius: '3px',
		marginBottom: '5px',
		boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
	},
	fileName: {
		fontSize: '14px',
		color: '#333',
		flexGrow: 1,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		textAlign: 'left', // 파일 이름은 왼쪽 정렬
	},
	removeFileButton: {
		background: 'none',
		border: '1px solid #ff6666',
		borderRadius: '3px',
		width: '24px', // 버튼 크기 약간 키움
		height: '24px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		marginLeft: '10px',
		padding: 0,
		color: '#ff6666',
		fontSize: '18px', // 아이콘 크기 약간 키움
		lineHeight: '1',
		transition: 'background-color 0.2s, color 0.2s',
		'&:hover': {
			backgroundColor: '#ff6666',
			color: 'white',
		},
	},
	removeIcon: {
		transform: 'translateY(-1px)',
	},
	noFileSelectedText: {
		color: '#999',
		fontSize: '14px',
		lineHeight: '1.5',
	},
	uploadButton: {
		width: '100%',
		padding: '10px 0',
		backgroundColor: '#007bff',
		color: 'white',
		border: 'none',
		borderRadius: '4px',
		fontSize: '16px',
		cursor: 'pointer',
		opacity: 0.9,
		transition: 'background-color 0.2s',
		'&:hover': {
			backgroundColor: '#0056b3',
		},
		'&:disabled': {
			backgroundColor: '#ccc',
			cursor: 'not-allowed',
		},
	},
	message: {
		marginTop: '15px',
		fontSize: '14px',
		textAlign: 'center',
		color: 'blue',
	},
};
