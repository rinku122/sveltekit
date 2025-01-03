<script>
	export let data;

	async function logout() {
		// Call the logout API
		const res = await fetch('/api/users', { method: 'POST' });

		if (res.ok) {
			// Redirect to login page after logout
			window.location.href = '/'; // Ensure a full page reload
		} else {
			console.error('Logout failed');
		}
	}
</script>

<p>Your Email : {data.user.email}</p>
<p>Your Phone Number : 8168593874</p>

<button on:click={logout}>Logout</button>
