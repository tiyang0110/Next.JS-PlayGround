"use client";

import SocialLogin from "@/components/social-login";

import { createAccount } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";

export default function CreateAccount(){
  const [state, action] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl *:font-medium">안녕하세요.</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input name="username" type="text" placeholder="Username" required errors={state?.fieldErrors.username} minLength={3} maxLength={20}/>
        <Input name="email" type="email" placeholder="Email" required errors={state?.fieldErrors.email} />
        <Input name="password" type="password" placeholder="Password" required errors={state?.fieldErrors.password} minLength={PASSWORD_MIN_LENGTH} />
        <Input name="confirmPassword" type="password" placeholder="Confirm Password" required  errors={state?.fieldErrors.confirmPassword} minLength={PASSWORD_MIN_LENGTH} />
        <Button text="Create account" />
      </form>
      <SocialLogin />
    </div>
  )
}