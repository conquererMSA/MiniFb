import { useAuth } from "../Hooks/useAuth"
import { Navigate,Outlet } from "react-router-dom"
import Header from "./Header"
export default function PrivateRoute() {
    const {auth}=useAuth()
  return (
    <>
        {
          auth?.user?(
          <main className="mx-auto mx-w-[1020px] py-8">
             <div className="container">
                <Header/> 
                <Outlet/>
             </div>
          </main>)
          :(<Navigate to='/login'/>)
        }
    </>
  )
}
