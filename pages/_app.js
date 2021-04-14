import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../libs/Auth'
import Header from '../components/Header'

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
