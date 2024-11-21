import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb'; 
import User from '../../models/User';

export async function POST(req) {
  const { email, password } = await req.json(); // Parse JSON body

  try {
    const { db } = await connectToDatabase();

    // Check if the user exists in the database
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Compare the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Successful login
    return new Response(JSON.stringify({ message: 'Login successful', user: { email: user.email, accountType: user.accountType } }), { status: 200 });
  } catch (err) {
    console.error('Error during login:', err);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
