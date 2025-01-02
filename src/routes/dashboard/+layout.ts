import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	// Fetch user data from the server
	const res = await fetch('/api/users');

	if (!res.ok) {
		// Redirect to signup if unauthorized
		throw redirect(307, '/signup');
	}

	const user = await res.json();
	return user;
};
