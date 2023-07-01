'use client';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const MyComponent = () => {
	const router = useRouter();
	const pathname = usePathname();

	const makeRequest = async () => {
		try {
			const tokenFatality =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiYWJhNWZhYy00YjQ4LTRmNDUtYmUyZS0xMTY3NjM4ZDgxZTMiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTY4ODA2MzQ2MSwiZXhwIjoxNjg4MDcwNjYxfQ.AZIy2-D56tUynlFJaIfOQ64fukGdqP-E7eejInDImhg';
			const headers = {
				Authorization: `Bearer ${tokenFatality}`,
			};

			const response = await axios.get('http://localhost:3001/user/readUser/', {
				headers,
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<button
				onClick={() => {
					makeRequest();
					// router.refresh();
					// router.replace('/pruebaAdi');
					window.location.reload();
				}}
			>
				Realizar solicitud
			</button>
			<input className='bg-red-200' type='text' />
		</div>
	);
};

export default MyComponent;
