<script>
	export let fields = [];
	export let buttonText = '';
	export let onSubmit;

	let formData = {};

	// Initialize formData with keys from fields
	$: fields.forEach((field) => {
		if (!formData[field.name]) formData[field.name] = '';
	});

	async function handleSubmit(event) {
		event.preventDefault();
		if (onSubmit) {
			await onSubmit(formData);
		}
	}
</script>

<form on:submit={handleSubmit}>
	{#each fields as field}
		<input
			type={field.type}
			bind:value={formData[field.name]}
			placeholder={field.placeholder}
			required={field.required}
		/>
	{/each}
	<button type="submit">{buttonText}</button>
</form>
