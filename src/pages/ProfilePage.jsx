import { useEffect} from "react"
import { useAuth } from "../Hooks/useAuth";
import { useAxios } from "../Hooks/useAxios";
import { useProfile } from "../Hooks/useProfile";
import { actions } from "../actions/actions";

const ProfilePage = () => {
 const {state,dispatch}=useProfile()
  const {auth:{user:{id}}}=useAuth();
  const {api}=useAxios()
  useEffect(()=>{
    const fetchProfile=async()=>{
        dispatch({type:actions.profile.DATA_FETCHING})
       try {
         const response=await api.get(`${import.meta.VITE_SERVER_URL}/profile/${id}`)
         if(response.status===200){
          dispatch({type:actions.profile.DATA_FETCHED, data:response.data})
         }
         else{
          throw Error({message:"Somethinng went wrong"})
         }
      } catch (error) {
        dispatch({type:actions.profile.DATA_FETCH_ERROR, error:error.message})
      }
    }
     fetchProfile()
  },[api, id, dispatch])
  if(state?.isLoading) return <p> Profile Loading...</p>
  if(state?.error) return <p>{state?.error.message}</p>
  return (
    <div>
      {state?.user?.id&&<>
      <p>{state?.user?.name}  has {state?.posts.length} posts vailabe</p>
      </>}
    </div>
  )
}

export default ProfilePage