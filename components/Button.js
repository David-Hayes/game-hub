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
        styles.push('bg-blue-600 hover:bg-blue-700 text-white')
        break
      case 'tertiary':
        styles.push(
          'border border-yellow-600 hover:border-yellow-900 hover:bg-yellow-50'
        )
        break
      default:
        styles.push('bg-yellow-600 hover:bg-yellow-700 text-white')
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
