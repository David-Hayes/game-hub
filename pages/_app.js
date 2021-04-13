import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../libs/Auth'
import Header from '../components/Header'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <div className="max-w-screen-lg mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}

export default App
