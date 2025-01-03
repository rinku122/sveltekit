<script>
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	export let data;
</script>

<h1>Welcome {data.user.name}</h1>
<slot />
