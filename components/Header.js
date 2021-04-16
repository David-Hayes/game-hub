import Link from 'next/link'
import Container from './Container'
import { useAuth } from '../libs/Auth'

const Header = () => {
  const { user } = useAuth()
  console.log(user)
  return (
    <header className="bg-gray-900 text-white">
      <Container className="flex items-center justify-between py-3">
        <Link href="/">
          <a className="font-semibold text-2xl">
            game<span className="text-yellow-500">hub</span>
          </a>
        </Link>
        {user ? (
          <Link href="/profile">
            <a>
              <img
                src={user.photoUrl}
                alt={user.name}
                className="rounded-full w-10"
              />
            </a>
          </Link>
        ) : null}
      </Container>
    </header>
  )
}

export default Header
