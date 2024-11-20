import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
  const session = await getCustomSession();

  const role = session.role; // Access the stored role
  const email = session.email; // Access the stored email

  console.log("Session data retrieved:", { role, email });

  return new Response(
    JSON.stringify({ role, email }),
    { status: 200 }
  );
}
