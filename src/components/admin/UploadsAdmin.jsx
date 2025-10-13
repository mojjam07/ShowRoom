import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, File } from 'lucide-react';

const UploadsAdmin = () => {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/uploads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`File uploaded successfully: ${data.filename}`);
        setFile(null);
      } else {
        setMessage('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">File Uploads</h1>
      <div className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
        <form onSubmit={handleUpload}>
          <div className="mb-3 xs:mb-4">
            <label className="block text-sm xs:text-base text-gray-700 dark:text-gray-300 mb-2 font-medium">Select File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-3 xs:p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus-ring text-sm xs:text-base"
              required
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 touch-target focus-ring flex items-center text-sm xs:text-base"
          >
            <Upload className="w-4 h-4 xs:w-5 xs:h-5 mr-2 flex-shrink-0" />
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && (
          <p className={`mt-3 xs:mt-4 text-sm xs:text-base ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <div className="mt-4 xs:mt-6">
          <h2 className="text-lg xs:text-xl font-semibold mb-3 xs:mb-4 text-gray-900 dark:text-white">Upload Guidelines</h2>
          <ul className="list-disc list-inside text-sm xs:text-base text-gray-700 dark:text-gray-300 space-y-1 xs:space-y-2 pl-4">
            <li>Supported formats: Images (JPG, PNG, GIF), Documents (PDF, DOC, DOCX)</li>
            <li>Maximum file size: 5MB</li>
            <li>Use descriptive filenames</li>
            <li>Files are stored securely and can be referenced in projects or other content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadsAdmin;
