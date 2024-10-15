"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants';
import {z} from 'zod';

const checkUsername = (username:string) => !username.includes('potato');
const checkPasswords = ({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword;

const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 String이어야 합니다.',
    required_error: 'Username은 반드시 입력되어야 합니다.'
  }).toLowerCase().trim().refine(checkUsername, '테스트'),
  email: z.string().email().toLowerCase(),
  password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirmPassword: z.string().min(PASSWORD_MIN_LENGTH)
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

  const result = formSchema.safeParse(data);

  console.log(result);
  if(!result.success){
    return result.error.flatten();
  }else{
    console.log(result.data);
  }
}