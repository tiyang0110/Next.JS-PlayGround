"use server";
import {z} from 'zod';

const checkUsername = (username:string) => !username.includes('potato');
const checkPasswords = ({password, confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword;

const formSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username은 String이어야 합니다.',
    required_error: 'Username은 반드시 입력되어야 합니다.'
  }).min(3, 'Username은 최소 3자리 이상 입력해야 합니다.').max(10, 'Username은 최대 10자까지 입력 가능합니다.').refine(checkUsername, '테스트'),
  email: z.string().email(),
  password: z.string().min(10),
  confirmPassword: z.string().min(10)
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
  }
}