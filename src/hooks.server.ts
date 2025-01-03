import connectDB from '$lib/db';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

connectDB();

export async function handle({ event, resolve }) {
	const { url, cookies } = event;
	const token = cookies.get('token'); // Retrieve token from cookies

	const restrictedRoutes = ['/login', '/signup'];
	if (token && restrictedRoutes.includes(event.url.pathname)) {
		// Redirect logged-in users trying to access login or signup
		throw redirect(307, '/dashboard');
	}

	// Protect routes under /api/private/
	if (url.pathname.startsWith('/api/users')) {
		if (!token) {
			return new Response(JSON.stringify({ error: 'Missing or invalid token' }), { status: 401 });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			event.locals.user = decoded; // Attach user info to event.locals
		} catch (err) {
			return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
		}
	}

	return resolve(event);
}
