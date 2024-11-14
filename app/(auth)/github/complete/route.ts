import { SetSession } from "@/app/(auth)/login/actions";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { AddGithubUser, getAccessTokenData, getGithubUserData } from "../../../../lib/github";

export async function GET(request: NextRequest){
  const code = request.nextUrl.searchParams.get('code');

  if(!code) return new Response(null, { status: 400 });
  
  const { error, access_token } = await getAccessTokenData(code);

  if(error) return new Response(null, { status: 400 });

  const { id, avatar_url, login } = await getGithubUserData(access_token);

  const user = await db.user.findUnique({
    where: { github_id: id + "" },
    select: { id: true }
  });

  if(user){
    await SetSession(user.id);

    return redirect('/profile');
  }

  const newUser = await AddGithubUser({id, avatar_url, login});

  await SetSession(newUser.id);

  return redirect('/profile');
}