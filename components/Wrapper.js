import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Container from './Container'
import SignIn from './SignIn'
import Loading from './Loading'
import { useAuth } from '../libs/Auth'

const Wrapper = ({ children, title, fullWidth = false, bunched = false }) => {
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
              {fullWidth ? (
                <>{children}</>
              ) : (
                <Container className={!bunched ? 'mt-5' : ''}>
                  {children}
                </Container>
              )}
            </>
          ) : (
            <SignIn />
          )}
        </>
      ) : (
        <div className="my-5">
          <Loading />
        </div>
      )}
      <Footer />
    </>
  )
}

export default Wrapper
