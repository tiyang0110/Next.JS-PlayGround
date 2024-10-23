"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import {z} from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';

const checkUsername = (username:string) => !username.includes('potato');
const checkPasswords = ({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword;

const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 String이어야 합니다.',
    required_error: 'Username은 반드시 입력되어야 합니다.'
  }).toLowerCase().trim().refine(checkUsername, 'potato는 사용불가능한 이름입니다.'),
  email: z.string().email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(PASSWORD_MIN_LENGTH)
}).superRefine(async ({username}, ctx) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if(user){
    ctx.addIssue({
      code: 'custom',
      message: '이미 사용중인 Username 입니다.',
      path: ['username'],
      fatal: true
    });

    return z.NEVER;
  }
}).superRefine(async ({email}, ctx) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true }
  });

  if(user){
    ctx.addIssue({
      code: 'custom',
      message: '이미 사용중인 email 입니다.',
      path: ['email'],
      fatal: true
    });

    return z.NEVER;
  }
}).refine(checkPasswords, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword']
});

export async function createAccount(prevState:any, formData:FormData){
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = await formSchema.spa(data);

  console.log(result);
  if(!result.success){
    return result.error.flatten();
  }else{

    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: { id: true }
    });

    const session = await getSession();
    
    session.id = user.id;
    await session.save();

    redirect('/profile');
  }
}