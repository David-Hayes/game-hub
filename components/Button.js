import React from 'react'

const Button = React.forwardRef(
  (
    {
      children,
      href,
      onClick,
      type,
      variant = 'primary',
      size = 'normal',
      className,
    },
    ref
  ) => {
    const styles = ['shadow-sm font-semibold rounded-md uppercase']

    switch (size) {
      default:
        styles.push('py-2 px-4 text-sm')
    }

    switch (variant) {
      case 'secondary':
        styles.push('')
        break
      case 'tertiary':
        styles.push('')
        break
      case 'warning':
        styles.push(
          'bg-red-600 hover:bg-red-700 text-white outline-none focus:outline-none'
        )
        break
      default:
        styles.push('bg-blue-600 hover:bg-blue-700 text-white')
    }

    if (className) {
      styles.push(className)
    }

    return React.createElement(
      href ? 'a' : 'button',
      { className: styles.join(' '), href, onClick, type },
      children
    )
  }
)

export default Button
