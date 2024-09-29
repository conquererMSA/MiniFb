import { useAuth } from "../Hooks/useAuth"

const HomePage = () => {
  const {auth}=useAuth()
  console.log(auth);
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage