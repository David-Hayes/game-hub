import Link from 'next/link'
import { useAuth } from '../libs/Auth'

const Header = () => {
  const { user } = useAuth()
  return (
    <header className="bg-gray-900 text-white">
      <nav className="max-w-screen-lg mx-auto px-4 py-3 flex justify-between">
        <div className="font-semibold text-xl">
          <Link href="/">
            <a>
              game<span className="text-yellow-500">hub</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/search">
            <a>
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
          {user ? (
            <Link href="/profile">
              <a className="ml-3">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="rounded-full w-8"
                />
              </a>
            </Link>
          ) : null}
        </div>
      </nav>
    </header>
  )
}

export default Header
