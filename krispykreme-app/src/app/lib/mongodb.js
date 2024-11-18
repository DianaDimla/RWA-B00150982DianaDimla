import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://root:myPassword123@cluster0.wqz8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Replace with your database name
  return { client, db };
}
