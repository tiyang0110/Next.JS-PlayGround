"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { smsLogin } from "./actions";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined
}

export default function SMSLogin(){
  const [state, action] = useFormState(smsLogin, initialState);

  console.log(state);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl *:font-medium">SMS Login.</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        { state?.token ? (
          <Input key={1} name="token" type="number" placeholder="Verification code" required minLength={100000} maxLength={999999} errors={state.error?.formErrors} /> 
        ) : (
          <Input key={2} name="phoneNumber" type="number" placeholder="Phone number" required errors={state.error?.formErrors} />
        )}
        <Button text={state?.token ? '인증하기' : '인증 문자 보내기'} />
      </form>
    </div>
  )
}