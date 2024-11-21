import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../models/User'; // Your User model
import bcrypt from 'bcryptjs'; // To compare hashed passwords
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const sessionOptions = {
  password: 'VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf', // Secret key to encrypt sessions
  cookieName: 'appSession',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
  },
};

export async function POST(req) {
  try {
    // Parse the incoming JSON request
    const { email, pass } = await req.json();

    // Log the request body for debugging
    console.log('Received request body:', { email, pass });

    // Validate input
    if (!email || !pass) {
      return new Response(
        JSON.stringify({ message: 'Email and password are required.' }),
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password.' }),
        { status: 400 }
      );
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password.' }),
        { status: 400 }
      );
    }

    // Initialize the session after successful login
    const session = await getIronSession(cookies(), sessionOptions);
    session.user = { id: user._id, email: user.email, role: user.accountType }; // Store user info in session
    await session.save();

    // Return success response with user information
    return new Response(
      JSON.stringify({ message: 'Login successful', user: session.user }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500 }
    );
  }
}
