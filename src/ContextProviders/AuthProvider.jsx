/* eslint-disable react/prop-types */
import { useState } from "react"
import { AuthContext } from '../Context/index';

const AuthProvider=({children})=>{
    const [auth, setAuth]=useState({})
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider