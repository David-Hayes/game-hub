import Head from 'next/head'
import { useAuth } from '../libs/Auth'
import LogIn from './LogIn'
import Header from './Header'

const PageShell = ({ children, title }) => {
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
              <div className="max-w-screen-lg mx-auto px-4">{children}</div>
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
