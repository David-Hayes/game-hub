import Link from 'next/link'
import Container from './Container'

const Header = () => {
  return (
    <header className="bg-gray-900 text-white">
      <Container>
        <Link href="/">
          <a className="font-semibold text-xl">
            game<span className="text-yellow-500">hub</span>
          </a>
        </Link>
      </Container>
    </header>
  )
}

export default Header
