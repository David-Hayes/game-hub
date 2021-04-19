import Wrapper from '../components/Wrapper'
import { useAuth } from '../libs/Auth'

const Profile = () => {
  const { user, signOut } = useAuth()
  return (
    <Wrapper>
      <button onClick={signOut}>Sign out</button>
    </Wrapper>
  )
}

export default Profile
