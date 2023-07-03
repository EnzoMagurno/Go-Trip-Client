'use client';
import { useLocal } from '@/hooks/useLocal';
import { useEffect } from 'react';

function PruebaG() {
	const [pruebaSession, setPruebaSession] = useLocal('prueba', '');

	useEffect(() => {
		const handleStorageChange = (event: any) => {
			if (event.key === 'prueba') {
				const newValue = event.newValue;
				console.log('Nuevo valor:', newValue);
				setPruebaSession(newValue);
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [pruebaSession]);
	return (
		<div>
			<h1>Prueba GJVL</h1>
			{pruebaSession !== '' ? (
				<p>{pruebaSession}</p>
			) : (
				<p>No existe pruebaSession</p>
			)}
		</div>
	);
}

export default PruebaG;
