"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";


const phoneSchema = z.string().trim().refine((phoneNumber) => validator.isMobilePhone(phoneNumber, 'ko-KR'), '잘못된 핸드폰 번호입니다.');
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData){
  const phoneNumber = formData.get('phoneNumber'),
        token = formData.get('token');

  if(!prevState.token){
    const result = phoneSchema.safeParse(phoneNumber);

    if(!result.success){
      return {
        token: false,
        error: result.error.flatten()
      };
    }else{
      return { token: true };
    }
  }else{
    const result = tokenSchema.safeParse(token);

    if(!result.success){
      return {
        token: true,
        error: result.error.flatten()
      };
    }else{
      redirect('/');
    }
  }
}