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

  if (loading) return <div className="p-3 xs:p-4 sm:p-6">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl xs:text-3xl font-bold mb-4 xs:mb-6 text-gray-900 dark:text-white">Contact Submissions</h1>
      <div className="space-y-3 xs:space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-lg shadow-md">
            <div className="flex items-start space-x-3 xs:space-x-4">
              <User className="w-5 h-5 xs:w-6 xs:h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base xs:text-lg font-semibold text-gray-900 dark:text-white truncate">{contact.name}</h3>
                <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400 flex items-center">
                  <Mail className="w-3 h-3 xs:w-4 xs:h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </p>
                <p className="text-xs xs:text-sm text-gray-500 dark:text-gray-500 mt-1">
                  {new Date(contact.timestamp).toLocaleString()}
                </p>
                <div className="mt-3 xs:mt-4">
                  <p className="text-sm xs:text-base text-gray-700 dark:text-gray-300 flex items-start">
                    <MessageSquare className="w-3 h-3 xs:w-4 xs:h-4 mr-2 mt-1 flex-shrink-0" />
                    <span className="break-words">{contact.message}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-center text-sm xs:text-base text-gray-500 dark:text-gray-400 py-8">No contact submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsAdmin;
