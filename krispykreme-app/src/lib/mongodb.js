// src/lib/mongodb.js

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://root:myPassword123@cluster0.wqz8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw new Error('Failed to connect to MongoDB');
  }
}
