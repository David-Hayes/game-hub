export const Button = ({
  children,
  styleType = 'primary',
  className,
  ...otherProps
}) => {
  const buttonColor =
    styleType === 'secondary'
      ? 'bg-gray-200 hover:bg-gray-300 text-gray-900'
      : styleType === 'tertiary'
      ? 'bg-green-500 hover:bg-green-700 text-gray-900'
      : 'bg-blue-600 hover:bg-blue-700 text-white'
  return (
    <button
      {...otherProps}
      className={`${buttonColor} px-3 py-1 rounded-md ${className}`}
    >
      {children}
    </button>
  )
}
