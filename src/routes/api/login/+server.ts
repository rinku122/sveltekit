import { JWT_SECRET } from '$env/static/private';
import User from '$lib/models/user';
import type { Cookies } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST({ request, cookies }: { request: Request; cookies: Cookies }) {
	const { email, password } = await request.json();

	// Validate email and password
	if (!email || !password) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}

	// Find the user
	const user = await User.findOne({ email });

	if (!user) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	// Check the password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return json({ error: 'Invalid credentials' }, { status: 401 });
	}

	// Generate a JWT
	const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

	cookies.set('token', token, {
		httpOnly: true,
		secure: true, // Use true in production to ensure secure cookies
		sameSite: 'strict',
		path: '/', // Token is available to all routes
		maxAge: 60 * 60 * 24 // Token expires in 1 day
	});

	return json({ success: true });
}
