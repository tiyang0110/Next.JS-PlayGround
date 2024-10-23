"use server";

import twilio from "twilio";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import validator from "validator";
import { typeToFlattenedError, z } from "zod";
import crypto from 'crypto';
import { SetSession } from "../login/actions";

const phoneSchema = z.string().trim().refine((phoneNumber) => validator.isMobilePhone(phoneNumber, 'ko-KR'), '잘못된 핸드폰 번호입니다.');

async function tokenExists(token:number){
  const exists = await db.sMSToken.findUnique({
    where: {
      token: token.toString(),
    },
    select: { id: true }
  });

  return Boolean(exists);
}

const tokenSchema = z.coerce.number().min(100000).max(999999).refine(tokenExists, '인증번호가 일치하지 않습니다.');

interface ActionState {
  token: boolean;
  error?: typeToFlattenedError<string, string>;
  phoneNumber?: FormDataEntryValue | string | null;
}

async function getToken(){
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: { token },
    select: { id: true }
  });

  if(exists){
    return getToken();
  }else{
    return token;
  }
}

export async function smsLogin(prevState: ActionState | undefined, formData: FormData){
  const phoneNumber = formData.get('phoneNumber'),
        token = formData.get('token');

  if(!prevState!.token){
    const result = phoneSchema.safeParse(phoneNumber);

    if(!result.success){
      return {
        token: false,
        error: result.error.flatten()
      };
    }else{
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data
          }
        }
      });

      const token = await getToken();

      await db.sMSToken.create({
        data: { token, user: {
          connectOrCreate: {
            where: {
              phone: result.data
            },
            create: {
              username: crypto.randomBytes(10).toString('hex'),
              phone: result.data,
            }
          }
        }}
      });

      // const client = twilio(process.env.MYTWILIO_SID, process.env.MYTWILIO_AUTHTOKEN);

      // await client.messages.create({
      //   body: `인증번호는 [${token}] 입니다.`,
      //   from: process.env.MYTWILIO_PHONENUMBER!,
      //   to: process.env.MYTWILIO_MYPHONENUMBER!
      // });

      return { token: true, phoneNumber };
    }
  }else{
    const result = await tokenSchema.spa(token);

    if(!result.success){
      return {
        token: true,
        phoneNumber: prevState!.phoneNumber,
        error: result.error.flatten()
      };
    }else{
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
          user: {
            phone: prevState!.phoneNumber as string
          }
        },
        select: {
          id: true,
          userId: true
        }
      });

      if(token){
        await SetSession(token.userId);
        await db.sMSToken.delete({
          where: { id: token.id }
        });

        redirect('/profile');
      }
    }
  }
}