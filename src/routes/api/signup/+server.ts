import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import User, { type IUser } from '$lib/models/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

export const POST = async ({ request }: { request: Request }) => {
	const { email, password } = (await request.json()) as { email: string; password: string };
	if (!email || !password) {
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
	const newUser: IUser = new User({ email, password: hashedPassword });
	await newUser.save();

	const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
		expiresIn: '1h'
	});

	return json({ token });
};
