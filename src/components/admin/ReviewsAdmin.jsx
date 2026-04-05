import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { API_URL } from '../../config/api';
import { Edit, Trash2, X, CheckCircle, AlertCircle, RefreshCw, AlertTriangle, Star, User } from 'lucide-react';
import Loading from '../Loading';

const ReviewsAdmin = () => {
  const { apiCall } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    role: 'student', 
    rating: 5, 
    status: 'pending',
    message: '' 
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  const fetchReviews = useCallback(async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      }
      const response = await apiCall(`${API_URL}/reviews/admin`);
      if (response.ok) {
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
        setError(null);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      } else if (response.status === 500) {
        const errorData = await response.json();
        setError(`Server error: ${errorData.error || 'Unknown error'}. This may be due to RLS policies.`);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(`Connection error: ${err.message}. Check if Supabase RLS policies are blocking access.`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [apiCall]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);
    
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/reviews/${editing.id}` : `${API_URL}/reviews`;
    
    try {
      const submitData = {
        ...formData,
        rating: parseInt(formData.rating)
      };

      const response = await apiCall(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setSuccess(editing ? 'Review updated successfully!' : 'Review created successfully!');
        fetchReviews();
        setEditing(null);
        setFormData({ name: '', email: '', role: 'student', rating: 5, status: 'pending', message: '' });
        setTimeout(() => setSuccess(null), 3000);
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save review');
      }
    } catch (err) {
      console.error('Error saving review:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (review) => {
    setEditing(review);
    setFormData({ 
      ...review, 
      rating: review.rating || 5,
      role: review.role || 'student',
      status: review.status || 'pending'
    });
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      const response = await apiCall(`${API_URL}/reviews/${deleteModal.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      } else if (response.status === 401) {
        setError('Session expired. Please log in again.');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError(err.message);
    } finally {
      setDeleteModal({ show: false, id: null, name: '' });
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': {
        color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
        icon: AlertTriangle
      },
      'verified': {
        color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
        icon: CheckCircle
      },
      'rejected': {
        color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
        icon: X
      }
    };
    const BadgeIcon = badges[status]?.icon || AlertCircle;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${badges[status]?.color || 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300'}`}>
        <BadgeIcon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">Manage Reviews</h1>
        <button
          onClick={() => fetchReviews(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          title="Refresh reviews"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-gray-100 border border-gray-400 text-gray-700 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Error loading reviews</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={() => fetchReviews(true)}
              className="text-sm underline mt-2 hover:text-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6"> {editing ? 'Edit Review' : 'Add Review'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base capitalize"
            required
          >
            <option value="student">Student</option>
            <option value="client">Client</option>
          </select>
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base capitalize"
            required
          >
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-3 text-base resize-vertical"
            rows="3"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all focus:ring-4 focus:ring-blue-500/25 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              editing ? 'Update Review' : 'Add Review'
            )}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setFormData({ name: '', email: '', role: 'student', rating: 5, status: 'pending', message: '' });
              }}
              disabled={isSubmitting}
              className="flex-1 bg-gray-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-gray-500/25 hover:scale-[1.02] transition-all focus:ring-4 focus:ring-gray-500/25 text-base disabled:opacity-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Rating</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="p-4 text-base font-medium text-gray-900 dark:text-white">{review.name}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {review.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">{review.rating}/5</span>
                  </td>
                  <td className="p-4">{getStatusBadge(review.status)}</td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{new Date(review.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        title="Edit review"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(review.id, review.name)}
                        className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-red-50 transition-all focus:ring-2 focus:ring-red-500 focus:outline-none"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">Delete Review</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
              Are you sure you want to delete the review by "<strong>{deleteModal.name}</strong>"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl focus:ring-4 focus:ring-red-500/25"
              >
                Delete Review
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsAdmin;

