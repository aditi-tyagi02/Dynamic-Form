import { useState, useEffect } from 'react';
import { formTypes, mockApiResponse } from '../api/mockData';
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const DynamicForm = () => {
  const [selectedForm, setSelectedForm] = useState('');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState([]);
  const [progress, setProgress] = useState(0);
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    if (selectedForm) {
      setFormFields(mockApiResponse[selectedForm].fields);
      setFormData({});
      setErrors({});
      calculateProgress({});
    }
  }, [selectedForm]);

  const calculateProgress = (data) => {
    if (!formFields.length) return 0;
    const requiredFields = formFields.filter(field => field.required);
    const completedFields = requiredFields.filter(field => data[field.name] && data[field.name].toString().trim() !== '');
    setProgress((completedFields.length / requiredFields.length) * 100);
  };

  const handleInputChange = (name, value) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(prev => ({ ...prev, [name]: '' }));
    calculateProgress(newFormData);
  };

  const validateForm = () => {
    const newErrors = {};
    formFields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newSubmission = {
        id: Date.now(),
        type: selectedForm,
        ...formData
      };
      setSubmissions([...submissions, newSubmission]);
      setFormData({});
      toast.success('Form submitted successfully!');
      setProgress(0);
    }
  };

  const handleEdit = (submission) => {
    setSelectedForm(submission.type);
    const { id, type, ...data } = submission;
    setFormData(data);
    calculateProgress(data);
    toast.info('Editing submission...');
  };

  const handleDelete = (id) => {
    setSubmissions(submissions.filter(sub => sub.id !== id));
    toast.success('Entry deleted successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <select
          className="w-full p-3 border border-indigo-200 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-all duration-200"
          value={selectedForm}
          onChange={(e) => setSelectedForm(e.target.value)}
        >
          <option value="">Select Form Type</option>
          {formTypes.map(type => (
            <option key={type.id} value={type.id}>{type.label}</option>
          ))}
        </select>
      </div>

      {selectedForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-indigo-100">
          <ProgressBar progress={progress} />
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map(field => (
              <FormField
                key={field.name}
                field={field}
                value={formData[field.name] || ''}
                error={errors[field.name]}
                onChange={handleInputChange}
              />
            ))}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircleIcon className="h-5 w-5" />
              Submit
            </button>
          </form>
        </div>
      )}

      {submissions.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-indigo-100">
          <h2 className="text-xl font-bold mb-4 text-indigo-800">Submitted Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-indigo-200">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    Form Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-indigo-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-indigo-100">
                {submissions.map(submission => (
                  <tr key={submission.id} className="hover:bg-indigo-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {Object.entries(submission).map(([key, value]) => 
                        key !== 'id' && (
                          <div key={key} className="mb-1">
                            <span className="font-medium text-indigo-600">{key}: </span>
                            <span>{value.toString()}</span>
                          </div>
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(submission)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center gap-1 hover:scale-110 transition-transform duration-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 hover:scale-110 transition-transform duration-200"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;