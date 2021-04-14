import Head from 'next/head'
import { useAuth } from '../libs/Auth'
import LogIn from './LogIn'
import Header from './Header'

const PageShell = ({ children, title, bunched = false }) => {
  const { user, authLoading } = useAuth()

  return (
    <>
      <Head>
        <title>{title ? `${title} | Gamehub` : `Gamehub`}</title>
      </Head>
      {!authLoading ? (
        <>
          {user ? (
            <>
              <Header />
              <div
                className={`max-w-screen-lg mx-auto px-4 ${
                  !bunched ? 'mt-5' : ''
                }`}
              >
                {children}
              </div>
            </>
          ) : (
            <LogIn />
          )}
        </>
      ) : null}
    </>
  )
}

export default PageShell
