import { useEffect, useState } from "react"
import { useAuth } from "../Hooks/useAuth";
import { useAxios } from "../Hooks/useAxios";

const ProfilePage = () => {
  const [user,setUser]=useState(null);
  const [posts,setPosts]=useState([])
  const [loading, setLoading]=useState(false)
  const [error, setError]=useState("")
  const {auth:{user:{id}}}=useAuth();
  const {api}=useAxios()
  useEffect(()=>{
    const fetchProfile=async()=>{
      setLoading(true)
       try {
         const response=await api.get(`${import.meta.VITE_SERVER_URL}/profile/${id}`)
         if(response.status===200){
          setUser(response?.data?.user);
          setPosts(response?.data?.posts);
          setLoading(false)
         }
         else{
          throw Error({message:"Somethinng went wrong"})
         }
      } catch (error) {
         setError(error.message)
      }
    }
     fetchProfile()
  },[api, id])
  if(loading) return <p> Profile Loading...</p>
  if(error) return <p>{error.message}</p>
  return (
    <div>
      {user?.id&&<>
      <p>{user?.name}  has {posts.length} posts vailabe</p>
      </>}
    </div>
  )
}

export default ProfilePage