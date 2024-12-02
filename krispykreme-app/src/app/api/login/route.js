export async function GET(req) {
  console.log("In the login API page");

  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const accType = searchParams.get('accType'); // Optional: You might not need accType for login, but keeping it for consistency

  console.log("email:", email);
  console.log("pass:", pass);
  console.log("accType:", accType); // This might not be necessary for login, you can omit this if not needed

  // Validate input
  if (!email || !pass) {
    console.log("Invalid input detected");
    return new Response(
      JSON.stringify({ error: "Email and password are required" }),
      { status: 400 }
    );
  }

  // MongoDB Connection
  try {
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS; // Ensure this is correctly set in your environment variables
    const client = new MongoClient(url);
    const dbName = 'app';

    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection('users');

    // Find user in the database
    const user = await collection.findOne({ email });
    if (!user) {
      console.log("No user found with this email");
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Close the database connection
    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ message: "Login successful", user: { id: user._id, email: user.email, role: user.accType } }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during database interaction:", error);
    return new Response(
      JSON.stringify({ error: "Database error" }),
      { status: 500 }
    );
  }
}
