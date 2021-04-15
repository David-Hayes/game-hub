import Header from './Header'
import Container from './Container'
import SignIn from './SignIn'
import { useAuth } from '../libs/Auth'

const Wrapper = ({ children, fullWidth = false }) => {
  const { user, authLoading } = useAuth()

  return (
    <>
      <Header />
      {user ? (
        <>{fullWidth ? <>{children}</> : <Container>{children}</Container>}</>
      ) : (
        <SignIn />
      )}
    </>
  )
}

export default Wrapper
