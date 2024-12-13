import bcrypt from 'bcrypt';

export async function GET(req) {
  console.log('In the login API page');

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email')?.trim();
  const pass = searchParams.get('pass')?.trim();
  const accType = searchParams.get('accType');

  // Input validation
  if (!email || !pass) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }
  if (email.length > 30 || pass.length > 20) {
    return new Response(JSON.stringify({ error: 'Input exceeds maximum allowed length.' }), { status: 400 });
  }

  // MongoDB Connection
  try {
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS;
    const client = new MongoClient(url);
    const dbName = 'app';

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('users');

    const user = await collection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'Invalid email or password.' }), { status: 401 });
    }

    await client.close();

    return new Response(JSON.stringify({ message: 'Login successful', user: { role: user.accType } }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
