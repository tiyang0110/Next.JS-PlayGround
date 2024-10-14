interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
}

export default function FormInput({type, placeholder, required, errors = [], name}:FormInputProps){
  return (
    <div className="flex flex-col gap-2">
      <input type={type} name={name} placeholder={placeholder} required={required} className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-4 ring-neutral-200 hover:ring-orange-500 border-none placeholder:text-neutral-400 transition" />
      {errors.map((error, i) => (
        <span key={i} className="text-red-500 font-medium">{error}</span>
      ))}
    </div>
  )
}