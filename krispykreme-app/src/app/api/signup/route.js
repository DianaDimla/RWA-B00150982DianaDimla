import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

export async function GET(req) {
  console.log("In the signup API page");

  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get('firstName')?.trim();
  const email = searchParams.get('email')?.trim();
  const pass = searchParams.get('pass')?.trim();
  const accType = searchParams.get('accType');

  // Input validation
  if (!firstName || !email || !pass || !accType) {
    return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
  }

  if (firstName.length > 20 || email.length > 50 || pass.length > 20) {
    return new Response(JSON.stringify({ error: 'Input exceeds maximum allowed length.' }), { status: 400 });
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400 });
  }

  // Hash password
  const hashedPass = await bcrypt.hash(pass, 10);

  // MongoDB Connection
  try {
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    const dbName = 'app';
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection('users');

    // Check if user already exists
    const userExists = await collection.findOne({ email });
    if (userExists) {
      return new Response(JSON.stringify({ error: 'Email is already in use.' }), { status: 400 });
    }

    // Insert the user into the database
    const result = await collection.insertOne({
      firstName,
      email,
      pass: hashedPass,
      accType
    });

    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ data: "inserted", message: "User successfully registered." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during database interaction:", error);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
}
