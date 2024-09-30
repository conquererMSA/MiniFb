import { useAuth } from "../Hooks/useAuth"
import { Navigate,Outlet } from "react-router-dom"
import Header from "./Header"
import { ProfileProvider } from "../ContextProviders/ProfileProvider"
export default function PrivateRoute() {
    const {auth}=useAuth()
  return (
    <>
        {
          auth?.user?(
            <ProfileProvider>
            <><Header/> 
          <main className="mx-auto mx-w-[1020px] py-8">
             <div className="container">
                <Outlet/>
             </div>
          </main>
          
          </>
          </ProfileProvider>
          )
          :(<Navigate to='/login'/>)
        }
    </>
  )
}
