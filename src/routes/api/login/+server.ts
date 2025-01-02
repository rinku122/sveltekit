import User from '$lib/models/user';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST({ request }) {
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

	return json({ token });
}
