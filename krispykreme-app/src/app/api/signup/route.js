export async function GET(req, res) {
  console.log("In the register API page");

  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get('firstName');
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const accType = searchParams.get('accType');

  console.log("firstName:", firstName);
  console.log("email:", email);
  console.log("pass:", pass);
  console.log("accType:", accType);

  // Validate input
  if (!email || !pass || !firstName || !accType) {
    console.log("Invalid input detected");
    return new Response(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400 }
    );
  }

  // MongoDB Connection
  try {
    const { MongoClient } = require('mongodb');
    const url = process.env.DB_ADDRESS; // MongoDB connection URL
    const client = new MongoClient(url);
    const dbName = 'app'; // Database name

    // Connect to MongoDB
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas");

    const db = client.db(dbName);
    const collection = db.collection('users'); // 'users' collection

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.log("User already exists with this email");
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // Insert new user data
    const user = {
      firstName,
      email,
      pass,
      accType,
      createdAt: new Date(),
    };
    const insertResult = await collection.insertOne(user);

    console.log("Insert result:", insertResult);

    // Close the database connection
    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ data: "inserted" }),
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
