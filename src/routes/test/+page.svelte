<script>
	export let data;
	let loader = false;
	let todoData = data.todoData;
</script>

<h1>test</h1>
{#each todoData as todo}
	<div>
		<span>id : {todo.id}</span>
		--
		<span>title : {todo.title}</span><br /><br />
	</div>
{/each}
