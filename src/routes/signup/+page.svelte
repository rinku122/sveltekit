<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';
	import Form from '$lib/Form.svelte';

	async function handleSignup(data) {
		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (res.ok) {
			auth.set({ isLoggedIn: true });
			await goto('/dashboard');
		} else {
			console.error('Signup failed');
		}
	}

	const fields = [
		{ name: 'name', type: 'text', placeholder: 'Full Name', required: true },
		{ name: 'phoneNumber', type: 'tel', placeholder: 'Phone Number', required: true },
		{ name: 'email', type: 'email', placeholder: 'Email', required: true },
		{ name: 'password', type: 'password', placeholder: 'Password', required: true }
	];
</script>

<Form {fields} buttonText="Signup" onSubmit={handleSignup} />
