import { getChildId } from "../utils"

export default function InputField({label, children, htmlFor, error}) {
  const id=htmlFor|| getChildId(children)
  return (
   <div>
    {label && <label className="auth-label" htmlFor={id}>{label}</label>}
    {children}
    {!!error && <p role="alert" className="text-red-600">{error.message}</p>}
   </div>
  )
}
