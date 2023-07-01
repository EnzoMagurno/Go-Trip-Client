import React, { useState } from 'react';

export const Upload = () => {
	const [fileInputState, setFileInputState] = useState('');
	const [previewSource, setPreviewSource] = useState('');
	const [selectedFile, setSelectedFile] = useState();

	const handleFileInputChange = (e) => {
		const file = e.target.files[0];
		previewFile(file);
		setSelectedFile(file);
		setFileInputState(e.target.value);
	};

	const handleSubmitFile = (e) => {
		e.preventDefault();
		// console.log(selectedFile);
		// console.log("**************************");
		if (!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend = () => {
			uploadImage(reader.result);
		};
		reader.onerror = () => {
			console.error('Error');
		};
	};

	const uploadImage = async (base64EncodedImage) => {
		try {
			const uploadGallery = await fetch('/gallery/upload', {
				method: 'POST',
				body: JSON.stringify({
					data: base64EncodedImage,
					idHotel: idHotel,
					idRoom: idRoom,
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			if (uploadGallery.ok) {
				// La solicitud fue exitosa
				const response = await uploadGallery.json();
				console.log(response); // La respuesta del backend en formato de objeto JavaScript
			} else {
				// La solicitud falló
				console.error('Error al subir la imagen');
			}
			setFileInputState('');
			setPreviewSource('');
		} catch (err) {
			console.error(err);
		}
	};

	const previewFile = (file) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};

	return (
		<div>
			<h1>Upload</h1>
			<form onSubmit={handleSubmitFile} className='form'>
				<input
					id='fileInput'
					type='file'
					name='image'
					onChange={handleFileInputChange}
					value={fileInputState}
					className='form-input'
				/>
				<button className='btn' onClick={handleSubmitFile}>
					Submit
				</button>
			</form>
			{previewSource && (
				<img src={previewSource} alt='chosen' style={{ height: '300px' }} />
			)}
		</div>
	);
};

export default Upload;
