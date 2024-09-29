import { useEffect } from "react"
import api from "../API"
import { useAuth } from "./useAuth"
import axios from "axios"

export const useAxios=()=>{
    const {auth, setAuth}=useAuth()
    useEffect(()=>{
    //Add a request interceptor
    const requestInterceptor= api.interceptors.request.use(
        (config)=>{
            const authToken=auth?.token?.token
            if(authToken){
               config.headers.Authorization=`Bearer ${authToken}`
            }
            return config
        },
        (error)=>Promise.reject(error)
    )



    //Add a response interceptor
    const responseInterceptor=api.interceptors.response.use(
        (response)=>response,
        async (error)=>{
            const orginalRequest=error.config;
            if(error.response.status===401 && !orginalRequest._retry){
                orginalRequest._retry=true;
                try {
                    const refreshToken=auth?.token?.refreshToken;
                    const response=await axios.post(`${import.meta.VITE_SERVER_URL}/auth/refresh-token`,{refreshToken})
                    const {token}=response.data
                    console.log(token);
                    setAuth({...auth,token:{...auth.token, token}})
                    orginalRequest.headers.Authorization=`Bearer ${token}`
                    return axios(orginalRequest)
                } catch(error){
                  throw new Error(error)
                }
            }
            return Promise.reject(error)
        }
    )
     return ()=>{
        api.interceptors.request.eject(requestInterceptor)
        api.interceptors.response.eject(responseInterceptor)
     }
    },[auth?.token?.token,auth?.token?.refreshToken,auth, setAuth])
    return {api}
}