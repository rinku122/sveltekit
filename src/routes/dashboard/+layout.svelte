<script>
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';

	export let data;

	console.log(data, 'layout');
</script>

<slot />
