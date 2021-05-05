const Card = ({ children, className }) => (
  <div className={`bg-gray-100 p-6 rounded-md shadow-md ${className}`}>
    {children}
  </div>
)

export default Card
