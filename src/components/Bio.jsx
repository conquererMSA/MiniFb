import { useState } from 'react'
import EditIcon from '../assets/icons/edit.svg'
import CheckIcon from '../assets/icons/check.svg'
import { useProfile } from '../Hooks/useProfile'
import { useAxios } from '../Hooks/useAxios'
import { actions } from '../actions/actions'
export default function Bio() {
    const {api}=useAxios()
    const {state, dispatch}=useProfile()
    const [editMode, setEditMode]=useState(false);
    const [bio, setBio]=useState(state?.user?.bio || "")
    const handleBioEditing=async()=>{
           try {
            dispatch({type:actions.profile.DATA_FETCHING})
            const response=await api.patch(`${import.meta.env.VITE_SERVER_URL}/profile/${state?.user?.id}`)
            if(response.status===200){
                dispatch({type:actions.profile.USER_DATA_EDITED, data:response.data})
            }
           } catch (error) {
                dispatch({type:actions.profile.DATA_FETCH_ERROR, error:error?.message})
           }finally{
            setEditMode(false)
           }
          
    }
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
        <div className="flex-1">
              {!editMode?(<p className="leading-[188%] text-gray-400 lg:text-lg">
                {state?.user.bio}
              </p>):(<textarea 
              rows={5} 
              cols={50}
              value={bio}
              onChange={(e)=>setBio(e.target.value)}/>)}
        </div>
        {
            !editMode?(
            <button onClick={()=>setEditMode(true)}
             className="flex-center h-7 w-7 rounded-full">
              <img src={EditIcon} alt="Edit" />
            </button>):
            (
            <button onClick={handleBioEditing}
             className="flex-center h-7 w-7 rounded-full">
              <img src={CheckIcon} alt="Edit" />
            </button>
        )
        }
        </div>
  )
}
