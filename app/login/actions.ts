"use server";

import { redirect } from "next/navigation";

export const handleForm = async (preveState: any, formData: FormData) => {
  console.log(formData.get('email'), formData.get('password'));
  
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return {
    errors: ['wrong password', 'password too short']
  }
}