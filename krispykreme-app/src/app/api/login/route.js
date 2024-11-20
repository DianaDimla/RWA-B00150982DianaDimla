import { getCustomSession } from '../sessionCode.js';
import connectDB from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  const { email, password, accountType } = await req.json();
  await connectDB();

  try {
    const user = await User.findOne({ email, role: accountType });
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const session = await getCustomSession();
    session.role = accountType; // Save role
    session.email = email; // Save email
    await session.save(); // Save session

    console.log("Session data saved on login:", { email, role: accountType });

    return new Response(JSON.stringify({ message: "Login successful", role: accountType }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}


