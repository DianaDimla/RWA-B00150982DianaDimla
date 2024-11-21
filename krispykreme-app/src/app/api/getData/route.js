import { getCustomSession } from '../../lib/sessionCode'; // Import the session code

export async function GET(req, res) {
  // Get the session
  let session = await getCustomSession();

  // Retrieve the stored session data
  let customersRole = session.role;
  let email = session.email;

  // Log the data to the console
  console.log('Customer Role:', customersRole);
  console.log('Email:', email);

  // Return the session data in the response
  return res.status(200).json({ role: customersRole, email: email });
}
