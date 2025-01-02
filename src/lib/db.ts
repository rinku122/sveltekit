import { MONGO_URI } from '$env/static/private';
import mongoose from 'mongoose';

export default async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};
