import { signInWithGoogle } from '../config/firebase.config'

export const LogIn = () => {
  return (
    <>
      <h2>Log in</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}
