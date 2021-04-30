import Link from 'next/link'
import Container from './Container'
import { useAuth } from '../libs/Auth'

const Header = () => {
  const { user } = useAuth()
  return (
    <header className="bg-gray-900 text-white">
      <Container className="flex items-center justify-between py-3">
        <Link href="/">
          <a className="font-semibold text-xl">
            game<span className="text-yellow-500">hub</span>
          </a>
        </Link>
        {user ? (
          <div className="flex items-center">
            <Link href="/search">
              <a title="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </a>
            </Link>
            <Link href="/profile">
              <a title="Profile">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="rounded-full w-7 ml-4"
                  referrerPolicy="no-referrer"
                />
              </a>
            </Link>
          </div>
        ) : null}
      </Container>
    </header>
  )
}

export default Header
