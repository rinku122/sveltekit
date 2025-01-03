<script>
    import { goto } from '$app/navigation';
	import Form from '$lib/Form.svelte';
    import { auth } from '$lib/stores/auth';

    async function handleLogin(data) {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            auth.set({ isLoggedIn: true });
            await goto('/dashboard');
        } else {
            console.error('Login failed');
        }
    }

    const fields = [
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true }
    ];
</script>

<Form fields={fields} buttonText="Login" onSubmit={handleLogin} />
