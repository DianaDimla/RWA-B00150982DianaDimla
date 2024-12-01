import mongoose from 'mongoose';

// Define the User schema for MongoDB
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (unique)
    password: { type: String, required: true }, // User's password
    accountType: { type: String, required: true }, // Type of account (e.g., customer, manager)
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Check if the model already exists, otherwise create it
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User; // Export the User model
