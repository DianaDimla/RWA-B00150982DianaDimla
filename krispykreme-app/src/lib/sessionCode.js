import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function getCustomSession() {
  // This password should be stored in an environment variable for security
  const password = process.env.SESSION_SECRET || 'VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf';
  
  // Create the session using the cookies from the request
  const session = await getIronSession(cookies(), { password, cookieName: "app" });

  return session;
}
