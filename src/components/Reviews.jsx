import React, { useState, useEffect } from 'react';
// import { API_URL } from '../../config/api';
import { API_URL } from '../config/api';
import { Star, Send } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    rating: 5,
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews`);
      const data = await response.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus('');
    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', role: 'student', rating: 5, message: '' });
        fetchReviews();
        setTimeout(() => setStatus(''), 5000);
      } else {
        const errorData = await response.json();
        setStatus('error: ' + (errorData.error || 'Failed to submit'));
      }
    } catch (error) {
      setStatus('error: Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-colors ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </section>
    );
  }

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 dark:from-white dark:to-gray-300">
            Student & Client Reviews
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from people I've helped build their skills and businesses
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mb-20">
          {reviews.length === 0 ? (
            <div className="text-center py-24">
              <Send className="w-16 h-16 text-gray-300 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <article key={review.id} className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-lg">{review.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 truncate">{review.name}</h4>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        review.role === 'student' 
                          ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {review.role.charAt(0).toUpperCase() + review.role.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6">{review.message}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 dark:from-gray-700 rounded-full flex items-center justify-center opacity-75">
                      ✓
                    </div>
                    <span>{new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Share Your Experience</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Loved the training or project results? Help others by sharing your honest feedback.
            </p>
          </div>

          {status.startsWith('error') && (
            <div className="mb-8 p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-800 dark:text-red-200 font-medium">
              {status.replace('error: ', '')}
            </div>
          )}
          {status === 'success' && (
            <div className="mb-8 p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-green-800 dark:text-green-200 font-medium">
              Thank you! Your review is pending admin verification.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg placeholder-gray-500"
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg placeholder-gray-500"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg"
                required
              >
                <option value="student">Student</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating *</label>
              <div className="flex gap-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {[5,4,3,2,1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                      formData.rating === star
                        ? 'bg-yellow-400 text-white shadow-md shadow-yellow-300/50 hover:shadow-lg hover:shadow-yellow-400/75 transform -rotate-12'
                        : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                    }`}
                  >
                    <Star className="w-7 h-7" />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">{formData.rating}/5 Stars</p>
            </div>
            <textarea
              placeholder="Your detailed review * (What did you learn? How was the project?)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="col-span-2 p-5 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-lg placeholder-gray-500 resize-vertical lg:resize-none"
              required
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={submitting}
              className="col-span-2 group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-bold py-6 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform focus-ring text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {submitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block mr-3" />
                  Publishing your review...
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 relative z-10 inline-block mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Submit Review
                  <span className="relative z-10 ml-2 opacity-75 text-sm">Pending admin approval</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

