import Link from 'next/link'

const Header = () => {
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
        <div>
          <Link href="/profile">User</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
