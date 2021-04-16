import Head from 'next/head'
import Header from './Header'
import Container from './Container'
import SignIn from './SignIn'
import Loading from './Loading'
import { useAuth } from '../libs/Auth'

const Wrapper = ({ children, title, fullWidth = false }) => {
  const { user, authLoading } = useAuth()

  return (
    <>
      <Head>
        <title>{title ? `${title} | Gamehub` : `Gamehub`}</title>
      </Head>
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
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Wrapper
