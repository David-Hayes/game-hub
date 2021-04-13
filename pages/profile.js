import { useAuth } from '../libs/Auth'
import PageShell from '../components/PageShell'
import { H1 } from '../components/Headings'

const Profile = () => {
  const { user } = useAuth()

  return (
    <>
      {user ? (
        <PageShell>
          <H1>Profile</H1>
        </PageShell>
      ) : null}
    </>
  )
}

export default Profile
