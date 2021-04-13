import 'tailwindcss/tailwind.css'
import Header from '../components/Header'

function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
