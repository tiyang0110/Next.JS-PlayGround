import { getIronSession } from "@/node_modules/iron-session/dist/index.cjs";
import { cookies } from "@/node_modules/next/headers";

interface SessionContent {
  id?: number;
}

export default function getSession(){
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'login-token',
    password: process.env.COOKIE_PASSWORD!,
  });
} 