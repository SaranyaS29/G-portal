import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const departmentConfigs = {
  sanitation: {
    issueTypes: ['Garbage Overflow', 'Clogged Drainage', 'Public Toilet Issue'],
  },
  'water-supply': {
    issueTypes: ['Water Leakage', 'No Supply', 'Contaminated Water'],
  },
  electricity: {
    issueTypes: ['Street Light Issue', 'Power Cut', 'Transformer Fault'],
  },
  'roads-transport': {
    issueTypes: ['Potholes', 'Broken Signal', 'Damaged Road'],
  },
  'health-safety': {
    issueTypes: ['Mosquito Breeding', 'Food Safety Concern', 'Emergency Access'],
  },
};

const DepartmentComplaint = () => {
  const { departmentName } = useParams();
  const navigate = useNavigate();

  const formattedName = departmentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const config = departmentConfigs[departmentName] || { issueTypes: [] };

  const [formData, setFormData] = useState({
    mobile: '',
    name: '',
    email: '',
    communicationAddress: '',
    locality: '',
    ward: '',
    zone: '',
    doorNo: '',
    fullAddress: '',
    issueType: '',
    description: '',
    attachments: [],
  });

  const [customIssue, setCustomIssue] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'issueType' && value !== 'Other') {
      setCustomIssue('');
    }
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    const validFiles = files.filter(
      file => allowedTypes.includes(file.type) && file.size <= 2 * 1024 * 1024
    );

    if (validFiles.length > 4) {
      alert('You can only upload up to 4 files');
      return;
    }

    setFormData(prev => ({
      ...prev,
      attachments: validFiles,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const finalData = {
  //     ...formData,
  //     issueType: formData.issueType === 'Other' ? customIssue : formData.issueType,
  //   };

  //   const form = new FormData();
  //   // Append form fields to FormData object
  //   Object.keys(finalData).forEach(key => {
  //     if (key === 'attachments') {
  //       finalData.attachments.forEach(file => {
  //         form.append('attachments', file);
  //       });
  //     } else {
  //       form.append(key, finalData[key]);
  //     }
  //   });

  //   try {
  //     const response = await axios.post('/api/complaints', form, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log('Complaint submitted successfully:', response.data);

  //     // Optionally, navigate to another page or reset the form
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error('Error submitting complaint:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const finalData = {
      ...formData,
      issueType: formData.issueType === 'Other' ? customIssue : formData.issueType,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/complaints', finalData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Complaint submitted:', response.data);
      navigate('/complaint');
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate('/complaint')}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back to Departments
      </button>

      <h2 className="text-2xl font-bold mb-4">
        Raise Complaint - {formattedName}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded shadow-md">
        {/* Section 1: Personal Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Enter Mobile No *"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Name *"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="E-Mail"
            />
            <input
              type="text"
              name="communicationAddress"
              value={formData.communicationAddress}
              onChange={handleChange}
              className="border px-3 py-2 rounded col-span-full"
              placeholder="Communication Address *"
              required
            />
          </div>
        </div>

        {/* Section 2: Location Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Location Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Locality Name *"
              required
            />
            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Ward *"
              required
            />
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Zone *"
              required
            />
            <input
              type="text"
              name="doorNo"
              value={formData.doorNo}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Enter Door No *"
              required
            />
            <input
              type="text"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              className="border px-3 py-2 rounded col-span-full"
              placeholder="Enter Address *"
              required
            />
          </div>
        </div>

        {/* Section 3: Complaint Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Complaint Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select Complaint Category *</option>
              {config.issueTypes.map((issue, idx) => (
                <option key={idx} value={issue}>
                  {issue}
                </option>
              ))}
              <option value="Other">Other (Specify Below)</option>
            </select>

            {formData.issueType === 'Other' && (
              <input
                type="text"
                value={customIssue}
                onChange={e => setCustomIssue(e.target.value)}
                className="border px-3 py-2 rounded"
                placeholder="Specify your issue *"
                required
              />
            )}

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded col-span-full"
              placeholder="Describe your issue in detail *"
              required
            />
          </div>
        </div>

        {/* Section 4: Attachments */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Attachments</h3>
          <p className="text-sm text-gray-500 mb-2">
            Only pdf, png, jpeg, jpg files allowed. Max 4 files. Each under 2MB.
          </p>
          <input
            type="file"
            multiple
            accept=".pdf, .png, .jpeg, .jpg"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded w-full"
          />
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
            {formData.attachments.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default DepartmentComplaint;
