import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ type = 'error', message, icon, onClose }) => {
  const styles = {
    error: 'bg-red-50 border-red-400 text-red-800',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
    success: 'bg-green-50 border-green-400 text-green-800',
  };

  const icons = {
   error: 'times-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle',
    success: 'check-circle',
  };

  if (!message) return null;

  return (
    <div className={`border-l-4 rounded-lg p-4 mb-4 ${styles[type]} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <FontAwesomeIcon 
            icon={icon || defaultIcons[type]} 
            className="text-3xl mr-4 flex-shrink-0" 
          />
          <div>
            <p className="text-sm font-medium leading-relaxed">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <FontAwesomeIcon 
            icon={icon || defaultIcons[type]} 
            className="text-3xl mr-4 flex-shrink-0" 
          />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
