import { useEffect, useState } from 'react';

const Input = ({ 
  label, 
  error, 
  type = 'text',
  onChange,
  ...props 
}) => {
  const [showError, setShowError] = useState(false);

  // Show error with animation when error prop changes
  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  const handleChange = (e) => {
    // Clear error when user starts typing
    if (error && onChange) {
      onChange(e);
    } else if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="mb-5">
      {label && (
        <label className="block text-gray-700 font-medium mb-2 text-base">
          {label}
        </label>
      )}
      <input
        type={type}
        onChange={handleChange}
        className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
          showError 
            ? 'border-red-500 bg-red-50 focus:ring-red-400 focus:border-red-500' 
            : 'border-gray-300 bg-white focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...props}
      />
      {/* Error message - stays visible until user types */}
      {showError && error && (
        <div className="mt-3 flex items-start bg-red-50 border-l-4 border-red-500 p-3 rounded">
          <span className="text-red-600 text-xl mr-2 flex-shrink-0">⚠️</span>
          <p className="text-base text-red-700 font-medium leading-relaxed">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default Input;
