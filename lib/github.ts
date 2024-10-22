import db from "./db";

interface AccessTokenData {
  error: string;
  access_token: string;
}

interface GithubUserData {
  id: number;
  avatar_url: string;
  login: string;
}

export const getAccessTokenData = async (code:string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  
  const { error, access_token }:AccessTokenData = await(await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      accept: 'application/json'
    }
  })).json();

  return { error, access_token };
}

export const getGithubUserData = async (access_token:string) => {
  const { id, avatar_url, login }:GithubUserData = await(await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    cache: 'no-cache'
  })).json();

  return { id, avatar_url, login };
}

export const getGithubUserEmails = async (access_token:string) => {
  const emails = await(await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`
    },
    cache: 'no-cache'
  })).json();

  return emails;
}

export const AddGithubUser = async ({id, avatar_url:avatar, login:username}:GithubUserData) => {
  const isAlreadyUserNames = await db.user.findMany({
    where: { username },
    select: { id: true }
  });

  const newUser = await db.user.create({
    data: {
      github_id: id + "",
      avatar: avatar,
      username: isAlreadyUserNames ? `${username}-${isAlreadyUserNames.length + 1}` : username
    },
    select: { id: true }
  });

  return newUser;
}