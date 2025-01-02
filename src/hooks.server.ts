import connectDB from '$lib/db';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

connectDB(); // Call the function to establish a connection when the server starts

export async function handle({ event, resolve }) {
	const { url, request } = event;

	// Protect routes under /api/private/
	if (url.pathname.startsWith('/api/users')) {
		const authHeader = request.headers.get('Authorization');

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return new Response(JSON.stringify({ error: 'Missing or invalid token' }), { status: 401 });
		}
		const token = authHeader.split(' ')[1];

		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			event.locals.user = decoded; // Attach user info to event.locals
		} catch (err) {
			return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
		}
	}

	return resolve(event);
}
