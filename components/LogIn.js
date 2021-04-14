import { useAuth } from '../libs/Auth'

const LogIn = () => {
  const { signinWithGoogle } = useAuth()
  return (
    <div className="max-w-md mx-auto px-4 py-5">
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <div className="text-3xl font-semibold text-center mb-5">
          game<span className="text-yellow-500">hub</span>
        </div>
        <p className="mb-5">
          Gamehub currently requires a log in. Currently this only supports
          Google.
        </p>
        <p>
          <button type="button" onClick={() => signinWithGoogle()}>
            Sign in with Google
          </button>
        </p>
      </div>
    </div>
  )
}

export default LogIn
