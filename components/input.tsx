import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({errors = [], name, ...rest}:InputProps & InputHTMLAttributes<HTMLInputElement>){
  return (
    <div className="flex flex-col gap-2">
      <input name={name} {...rest} className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 ring-neutral-200 hover:ring-orange-500 border-none placeholder:text-neutral-400 transition" />
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium">{error}</span>
      ))}
    </div>
  )
}