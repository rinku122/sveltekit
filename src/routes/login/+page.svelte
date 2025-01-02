<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';

	let email = '';
	let password = '';

	async function login() {
		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			auth.set({ isLoggedIn: true });
			await goto('/dashboard');
		} else {
			console.error('login failed');
		}
	}
</script>

<form on:submit|preventDefault={login}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Signup</button>
</form>
