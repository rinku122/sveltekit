<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth';

	let email = '';
	let password = '';

	async function signup() {
		const res = await fetch('/api/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			const { token } = await res.json();
			auth.set({ isLoggedIn: true, token });
			localStorage.setItem('token', token);
			await goto('/dashboard');
		} else {
			console.error('Signup failed');
		}
	}
</script>

<form on:submit|preventDefault={signup}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Signup</button>
</form>
