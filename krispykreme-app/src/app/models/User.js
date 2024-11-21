import mongoose from 'mongoose';

// User schema definition
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: { type: String, enum: ['customer', 'manager'], required: true },
});

// Create and export the model
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
