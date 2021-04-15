import Header from './Header'
import Container from './Container'
import SignIn from './SignIn'
import { useAuth } from '../libs/Auth'

const Wrapper = ({ children, fullWidth = false }) => {
  const { user, authLoading } = useAuth()

  return (
    <>
      <Header />
      {!authLoading ? (
        <>
          {user ? (
            <>
              {fullWidth ? <>{children}</> : <Container>{children}</Container>}
            </>
          ) : (
            <SignIn />
          )}
        </>
      ) : null}
    </>
  )
}

export default Wrapper
