import connectToDatabase from '../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password, accountType } = req.body;

  if (!email || !password || !accountType) {
    return res.status(400).json({ message: 'Email, password, and account type are required' });
  }

  try {
    const { db } = await connectToDatabase();

    // Query the users collection
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.accountType !== accountType) {
      return res.status(403).json({
        message: `You don't have access to the ${accountType} account type.`,
      });
    }

    // Respond with success
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
