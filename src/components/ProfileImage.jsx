import { useRef } from 'react'
import EditIcon from '../assets/icons/edit.svg'
import { useProfile } from '../Hooks/useProfile'
import { useAxios } from '../Hooks/useAxios'
import { actions } from '../actions/actions'
export default function ProfileImage() {
    const {state, dispatch}=useProfile()
    const fileUploadRef=useRef(null)
    const {api}=useAxios()
    const catchImageFromFile=async()=>{
        const formData=new FormData()
        for(const image of fileUploadRef.current.files){
              formData.append('avatar', image)
        }
        try {
            const response=await api.post(`${import.meta.env.VITE_SERVER_URL}/profile/${state?.user?.id}/avatar`, formData)
        if(response.status===200){
            dispatch({type:actions.profile.IMAGE_UPDATED, avatar:response.data?.avatar})
        }
        } catch (error) {
            dispatch({type:actions.profile.DATA_FETCH_ERROR, error:error.message})
        }
    }
    const handleImageUpload=(e)=>{
        e.preventDefault()
        fileUploadRef.current.addEventListner('onChange', catchImageFromFile)
        fileUploadRef.current.click()
    }
  return (
    <div
        className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
              className="max-w-full"
              src={`${import.meta.VITE_SERVER_URL}/profile/imagees/${state?.user?.avatar}`}
              alt=""
            />

            <button
              className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>

            <form action="">
            <button 
            onClick={handleImageUpload}
            type='submit'
              className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
            >
            <img src={EditIcon} alt="Edit" />
            </button>
            <input ref={fileUploadRef} id='file' type='file' hidden/>
            </form>
          </div>
  )
}
