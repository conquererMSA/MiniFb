import { useForm } from "react-hook-form"
import InputField from "../Common/InputField";

export default function Form() {
  const { register,handleSubmit, formState:{errors}}=useForm()
  const formSubmit=(formData)=>{
    console.log(formData);
    

  }
  return (
    <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    onSubmit={handleSubmit(formSubmit)}
    >
     <InputField label="Email" error={errors.email}>
     <input
     {...register('email',{required:"Email is required", })}
     className={`auth-input ${errors.email?'border-red-500':'border-green-700'}`}
     name="email"
     id="email"
     type="email"
      />
     </InputField>

     <InputField label="Password" error={errors.password}>
     <input
     {...register('password',{required:"Password is required",
        minLength:{
            message:'Password must be 8 charecters long',
            value:8
        }
      })}
     className={`auth-input ${errors.password?'border-red-500':'border-green-700'}`}
     name="password"
     id="password"
     type="password"
      />
     </InputField>

     <InputField>
     <button type="submit" className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 my-3">Login</button>
     </InputField>
    </form>
  )}