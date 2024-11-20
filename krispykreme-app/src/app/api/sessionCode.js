import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession() {

  console.log("Loading session...");
  const session = await getIronSession(cookies(), {
    password: "pw",
    cookieName: "app",
  });

  return session;
}
