"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from 'bcrypt';
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email:string) => {
  const isFindEmail = await db.user.findUnique({
    where: { email },
    select: { id: true }
  });

  return Boolean(isFindEmail);
}

const formSchema = z.object({
  email: z.string().email().toLowerCase().refine(checkEmailExists, '가입되지 않은 이메일 입니다.'),
  password: z.string({
    required_error: '비밀번호를 입력하세요.'
  })
  // 
});

export const login = async (preveState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const result = await formSchema.spa(data);

  if(!result.success){
    return result.error.flatten();
  }else{
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        id: true,
        password: true
      }
    });

    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");

    if(ok){
      const session = await getSession();
      session.id = user!.id;

      redirect('/profile');
    }else{
      return {
        fieldErrors: {
          password: ["잘못된 비밀번호 입니다."],
          email: [],
        }
      }
    }
  }
}