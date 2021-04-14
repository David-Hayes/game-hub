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
      classStyles,
    },
    ref
  ) => {
    const styles = [
      'shadow-sm font-medium rounded-md uppercase py-2 px-4 text-sm',
    ]

    switch (variant) {
      case 'secondary':
        styles.push('')
        break
      case 'tertiary':
        styles.push('')
        break
      default:
        styles.push('bg-indigo-600 hover:bg-indigo-700 text-white')
    }

    if (classStyles) {
      styles.push(classStyles)
    }

    return React.createElement(
      href ? 'a' : 'button',
      { className: styles.join(' '), href, onClick, type },
      children
    )
  }
)

export default Button
