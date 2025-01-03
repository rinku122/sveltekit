import { json, type Cookies } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import User, { type IUser } from '$lib/models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const POST = async ({ request, cookies }: { request: Request; cookies: Cookies }) => {
	const { email, password, name, phoneNumber } = (await request.json()) as {
		email: string;
		password: string;
		name: string;
		phoneNumber: string;
	};
	if (!email || !password || !name || !phoneNumber) {
		return json({ error: 'Email and password are required' }, { status: 400 });
	}

	// Check if the user already exists
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return json({ error: 'User already exists' }, { status: 400 });
	}

	// Hash the password
	const hashedPassword = await bcrypt.hash(password, 10);

	// Create a new user
	const newUser: IUser = new User({
		email,
		password: hashedPassword,
		name,
		phoneNumber,
		role: 'user'
	});
	await newUser.save();

	const token = jwt.sign({ id: newUser._id, email: newUser.email, role: 'user' }, JWT_SECRET, {
		expiresIn: '1h'
	});

	cookies.set('token', token, {
		httpOnly: true,
		secure: true, // Use true in production to ensure secure cookies
		sameSite: 'strict',
		path: '/', // Token is available to all routes
		maxAge: 60 * 60 * 24 // Token expires in 1 day
	});

	return json({ success: true });
};
