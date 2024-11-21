import { getCustomSession } from '../../lib/sessionCode';

export async function GET(req, res) {
  // Get the session
  let session = await getCustomSession();

  // Set session data
  session.role = 'customer'; // Example of setting the user's role
  session.email = 'mymail@mail.com'; // Set the email for the session

  // Save the session data
  await session.save();

  console.log('Data saved to session');

  return res.status(200).json({ message: 'Data saved to session' });
}
