import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
  const session = await getCustomSession();

  // Save data to the session
  session.role = 'customer'; 
  session.email = 'mymail@mail.com'; 
  await session.save(); // Save session data

  console.log("Session data saved:", { role: session.role, email: session.email });

  return new Response(JSON.stringify({ message: "Session saved" }), { status: 200 });
}
