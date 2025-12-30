import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  loading = false, 
  disabled = false,
  onClick,
  className = '',
  icon
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <FontAwesomeIcon icon="circle" className="animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
