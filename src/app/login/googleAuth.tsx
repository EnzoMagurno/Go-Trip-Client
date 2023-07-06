export function googleAuthx() {
	const authWindow = window.open(
		'http://localhost:8000/user/auth/google',
		'_blank'
	);

	const receiveMessage = (event: MessageEvent) => {
		if (event.origin === 'http://localhost:8000') {
			const user = event.data;

			// Cierra la ventana emergente después de recibir la información del usuario
			authWindow?.close();

			// Haz algo con la información del usuario, como guardarla en el estado o en el almacenamiento local
			console.log(user);
		}
	};

	window.addEventListener('message', receiveMessage);
}
