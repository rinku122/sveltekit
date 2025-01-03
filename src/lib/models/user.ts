import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the User document
export interface IUser extends Document {
	email: string;
	password: string;
	name: string;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
	role: 'admin' | 'user';
}

// Define the User schema
const userSchema: Schema<IUser> = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		phoneNumber: {
			type: String,
			required: true,
			trim: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
		},
		role: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true // Automatically manage createdAt and updatedAt
	}
);

// Create the User model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
