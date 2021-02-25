import { signInWithGoogle } from '../config/firebase.config'
import { WrapperStandard } from '../components/Layout'
import { Heading1 } from '../components/Headings'
import { Button } from '../components/Button'

export const LogIn = () => {
  return (
    <WrapperStandard topSpace={true}>
      <Heading1 className="mb-3">Log in</Heading1>
      <Button styleType="tertiary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </WrapperStandard>
  )
}
