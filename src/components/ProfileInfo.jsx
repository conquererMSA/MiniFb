import Bio from './Bio'
import MyPosts from './MyPosts'
import NameEmail from './NameEmail'
import ProfileImage from './ProfileImage'

export default function ProfileInfo() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
    <ProfileImage/>
    <NameEmail/>
    <Bio/>
    <MyPosts/>
    </div>
  )
}
