'use client';
import axios from 'axios';

const MyComponent = () => {
	const makeRequest = async () => {
		try {
			const tokenFatality =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxNzcwOTIxNC1kZTRmLTQ2ODMtYmY4Mi0xNDdjODBlNWRiNzIiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTY4NzkxOTA1MSwiZXhwIjoxNjg3OTI2MjUxfQ.1BOYwotV-1D3nqshBTJhX9UPon1Dvfyfj0loTVY_-4I';
			const headers = {
				Authorization: `Bearer ${tokenFatality}`,
			};

			const response = await axios.get('http://localhost:3001/user/readUser/', {
				headers,
			});
			// Realiza cualquier lógica adicional con la respuesta aquí
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<button onClick={makeRequest}>Realizar solicitud</button>
		</div>
	);
};

export default MyComponent;
