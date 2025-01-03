const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const load = async ({ fetch }) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos');
	await sleep(2000);
	let todoData = await response.json();
	return { todoData };
};
