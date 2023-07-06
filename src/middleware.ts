import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const jwtSecret = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
	const cookieToken = request.cookies.get('gotripCookie');
	// console.log(cookieToken?.value)
	// console.log(cookieToken);

	if (request.nextUrl.pathname === '/favicon.ico') {
		return NextResponse.next();
	}

	if (cookieToken === undefined) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	try {
		const { payload } = await jwtVerify(
			cookieToken.value,
			new TextEncoder().encode(jwtSecret)
		); //! Verifica si el token belongs our Back

		const { role } = payload;
		// console.log(payload);
		// console.log(role);

		if (request.nextUrl.pathname === '/register' && role) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		if (request.nextUrl.pathname === '/login' && role) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		if (request.nextUrl.pathname === '/admin' && role !== 'host') {
			return NextResponse.redirect(new URL('/access-denied', request.url));
		}
		return NextResponse.next();
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: [
		'/myBookings/:path*',
		'/myFavorites/:path*',
		'/userInfo/:path*',
		// '/createRoom/:path*',
		// '/detail/:path*',
		'/myHotels/:path*',
		'/reservation/:path*',
		'/admin/:path*',
	],
};
