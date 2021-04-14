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
        <div className="text-sm">
          {user ? (
            <Link href="/profile">
              <a>
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
