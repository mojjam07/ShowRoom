import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, User, MessageSquare } from 'lucide-react';

const ContactsAdmin = () => {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Submissions</h1>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-4">
              <User className="w-6 h-6 text-blue-500 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {contact.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {new Date(contact.created_at).toLocaleString()}
                </p>
                <div className="mt-4">
                  <p className="text-gray-700 dark:text-gray-300 flex items-start">
                    <MessageSquare className="w-4 h-4 mr-2 mt-1" />
                    {contact.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No contact submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsAdmin;
