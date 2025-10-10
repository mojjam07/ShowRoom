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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">File Uploads</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Select File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && (
          <p className={`mt-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upload Guidelines</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
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
