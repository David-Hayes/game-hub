import { useAuth } from '../libs/Auth'
import PageShell from '../components/PageShell'
import { H1 } from '../components/Headings'
import Button from '../components/Button'

const Profile = () => {
  const { user, signout } = useAuth()

  return (
    <PageShell title="Profile">
      {user ? (
        <>
          <img src={user.photoUrl} alt={user.name} />
          <H1>{user.name}</H1>
          <Button onClick={signout}>Log out</Button>
        </>
      ) : null}
    </PageShell>
  )
}

export default Profile
