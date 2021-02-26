import { Wrapper } from '../components/Layout'
import { Heading1 } from '../components/Headings'
import { Button } from '../components/Button'

export const Login = () => {
  return (
    <Wrapper topSpace>
      <Heading1 className="mb-3">Log in</Heading1>
      <div>
        <Button styleType="tertiary">Log in with Google</Button>
      </div>
    </Wrapper>
  )
}
