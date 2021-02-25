export const WrapperStandard = ({ children, topSpace, className }) => {
  const topMargin = topSpace ? 'mt-7' : ''
  return (
    <div className={`max-w-screen-lg mx-auto px-4 ${topMargin} ${className}`}>
      {children}
    </div>
  )
}
