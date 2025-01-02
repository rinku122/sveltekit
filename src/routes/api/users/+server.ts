import { json } from '@sveltejs/kit';
import User from '$lib/models/user';

export const GET = async ({ locals }) => {
	const userId = locals.user.id;
	const user = await User.findById(userId);
	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json({ user });
};
