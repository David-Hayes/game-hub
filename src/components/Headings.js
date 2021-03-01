export const Heading1 = ({ children, className, ...otherProps }) => {
  return (
    <h1 className={`text-2xl ${className}`} {...otherProps}>
      {children}
    </h1>
  )
}

export const Heading2 = ({ children, className, ...otherProps }) => {
  return (
    <h2 className={`text-xl ${className}`} {...otherProps}>
      {children}
    </h2>
  )
}

export const Heading3 = ({ children, className, ...otherProps }) => {
  return (
    <h3 className={`text-lg ${className}`} {...otherProps}>
      {children}
    </h3>
  )
}

export const Heading4 = ({ children, className, ...otherProps }) => {
  return (
    <h4 className={`${className}`} {...otherProps}>
      {children}
    </h4>
  )
}
