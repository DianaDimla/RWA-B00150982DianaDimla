import { getCustomSession } from '../sessionCode.js';
import connectDB from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  const { name, email, pass, accountType } = await req.json();
  await connectDB();

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already in use" }), { status: 400 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Save the user in the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: accountType,
    });
    await newUser.save();

    // Create a session for the user
    const session = await getCustomSession();
    session.role = accountType;
    session.email = email;
    await session.save();

    console.log("User registered and session created:", { name, email, role: accountType });

    return new Response(JSON.stringify({ message: "Signup successful" }), { status: 200 });
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
