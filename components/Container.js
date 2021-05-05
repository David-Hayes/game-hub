const Container = ({ children, className }) => {
  return (
    <div className={`max-w-screen-lg mx-auto px-5 ${className}`}>
      {children}
    </div>
  )
}

export default Container
