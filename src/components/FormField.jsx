const FormField = ({ field, value, error, onChange }) => {
  const baseInputClasses = "w-full p-3 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200";
  
  const renderField = () => {
    switch (field.type) {
      case 'dropdown':
        return (
          <select
            name={field.name}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseInputClasses}
          >
            <option value="">Select {field.label}</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseInputClasses}
          />
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className={baseInputClasses}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;