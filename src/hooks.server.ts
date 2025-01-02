import connectDB from '$lib/db';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

connectDB();

export async function handle({ event, resolve }) {
	const { url, cookies } = event;

	// Protect routes under /api/private/
	if (url.pathname.startsWith('/api/users')) {
		const token = cookies.get('token'); // Retrieve token from cookies

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
