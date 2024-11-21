import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/mongodb'; 
import User from '../../models/User';

export async function POST(req) {

  await connectToDatabase();

  try {

    const body = await req.json();
    console.log('Incoming request:', body);


    const { name, email, pass, accountType } = body;

    // Validate input
    if (!name || !email || !pass || !accountType) {
      console.error('Validation failed: Missing fields');
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Validation failed: Email already registered');
      return new Response(
        JSON.stringify({ message: 'Email already registered' }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      accountType,
    });

    await newUser.save();

    console.log('New user registered successfully:', newUser);

    return new Response(
      JSON.stringify({ message: 'User registered successfully!' }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error during registration:', err);
    return new Response(
      JSON.stringify({ message: `Server error: ${err.message}` }),
      { status: 500 }
    );
  }
}
