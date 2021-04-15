import Header from './Header'
import Container from './Container'

const Wrapper = ({ children, fullWidth = false }) => {
  return (
    <>
      <Header />
      {fullWidth ? <>{children}</> : <Container>{children}</Container>}
    </>
  )
}

export default Wrapper
