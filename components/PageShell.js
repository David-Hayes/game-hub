import { useAuth } from '../libs/Auth'
import Header from './Header'

const PageShell = ({ children }) => {
  const { user } = useAuth()
  return (
    <>
      {user ? (
        <>
          <Header />
          <div className="max-w-screen-lg mx-auto px-4">{children}</div>
        </>
      ) : null}
    </>
  )
}

export default PageShell
