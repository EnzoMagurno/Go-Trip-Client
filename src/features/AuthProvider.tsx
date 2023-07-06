'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function AuthProvider(props: Props) {
	return <SessionProvider>{props.children}</SessionProvider>;
}

export default AuthProvider;
