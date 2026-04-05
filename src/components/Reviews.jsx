import React, { useState, useEffect } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedTexts, setExpandedTexts] = useState({});

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
    <section id="reviews" className="py-10 xs:py-12 sm:py-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 dark:from-white dark:to-gray-300">
            Student & Client Reviews
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real feedback from people I've helped build their skills and businesses
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mb-16 sm:mb-20">
          {reviews.length === 0 ? (
            <div className="text-center py-20 sm:py-24">
              <Send className="w-16 h-16 text-gray-300 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Reviews Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {reviews.slice(0, visibleCount).map((review) => (
                <article key={review.id} className="group bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-200 dark:hover:border-blue-800">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-white font-bold text-base sm:text-lg">{review.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                    </div>
                    <div className="flex-1 sm:min-w-0 w-full sm:w-auto">
                      <h4 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 truncate">{review.name}</h4>
                      <span className={`block sm:inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-1 px-4 py-2 sm:px-3 sm:py-1 rounded-full text-xs font-semibold ${
                        review.role === 'student' 
                          ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {review.role.charAt(0).toUpperCase() + review.role.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full sm:w-auto gap-2 sm:gap-1 justify-center sm:justify-start mb-4 sm:mb-6">
                    {renderStars(review.rating)}
                  </div>
                  <div className="mb-4 sm:mb-6">
                    {(() => {
                      const isLong = review.message.length > 50;
                      const isExpanded = expandedTexts[review.id];
                      const displayText = isExpanded ? review.message : review.message.slice(0, 150);
                      return (
                        <p className={`text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg ${isLong && !isExpanded ? 'mb-2' : 'mb-4 sm:mb-6'}`}>
                          {displayText}
                          {isLong && (
                            <button
                              onClick={() => setExpandedTexts(prev => ({ ...prev, [review.id]: !prev[review.id] }))}
                              className="ml-1 text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                            >
                              {isExpanded ? 'show less' : '... show more'}
                            </button>
                          )}
                        </p>
                      );
                    })()}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r from-gray-200 dark:from-gray-700 rounded-full flex items-center justify-center opacity-75">
                      ✓
                    </div>
                    <span>{new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </article>
              ))}

              {reviews.length > visibleCount && (
                <div className="col-span-full flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount(Infinity)}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-bold py-3 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-base min-h-[44px] focus:ring-4 focus:ring-blue-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">
                      Show more ({reviews.length - visibleCount} reviews)
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Share Your Experience</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Loved the training or project results? Help others by sharing your honest feedback.
            </p>
          </div>

          {status.startsWith('error') && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-800 dark:text-red-200 font-medium text-sm sm:text-base">
              {status.replace('error: ', '')}
            </div>
          )}
          {status === 'success' && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-green-800 dark:text-green-200 font-medium text-sm sm:text-base">
              Thank you! Your review is pending admin verification.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl p-3 xs:p-4 sm:p-6 lg:p-8 rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="col-span-2 px-2.5 xs:px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm xs:text-base sm:text-lg placeholder-gray-500"
              required
              maxLength={100}
            />
            <input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="col-span-2 px-2.5 xs:px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm xs:text-base sm:text-lg placeholder-gray-500"
              required
            />
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Role *</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-2.5 xs:px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm xs:text-base sm:text-lg"
                required
              >
                <option value="student">Student</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Rating *</label>
              <div className="flex flex-wrap gap-1 p-1.5 sm:p-2 sm:p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {[5,4,3,2,1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-1 xs:p-1.5 sm:p-2 rounded-lg transition-all flex-shrink-0 w-9 xs:w-10 sm:w-11 h-9 xs:h-10 sm:h-11 min-h-[40px] ${
                      formData.rating === star
                        ? 'bg-yellow-400 text-white shadow-md shadow-yellow-300/50 hover:shadow-lg hover:shadow-yellow-400/75 transform -rotate-12'
                        : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20'
                    }`}
                  >
                    <Star className="w-4 xs:w-4.5 sm:w-5 h-4 xs:h-4.5 sm:h-5" />
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{formData.rating}/5 Stars</p>
            </div>
            <textarea
              placeholder="Your detailed review * (What did you learn? How was the project?)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="4"
              className="col-span-2 px-2.5 xs:px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all text-sm xs:text-base sm:text-lg placeholder-gray-500 resize-vertical lg:resize-none min-h-[100px]"
              required
              maxLength={1000}
            />
            <button
              type="submit"
              disabled={submitting}
              className="col-span-2 group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform text-sm sm:text-base min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:ring-4 focus:ring-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {submitting ? (
                <>
                  <div className="w-5 sm:w-6 h-5 sm:h-6 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block mr-2 sm:mr-3" />
                  Publishing your review...
                </>
              ) : (
                <>
                  <Send className="w-5 sm:w-6 h-5 sm:h-6 relative z-10 inline-block mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                  Submit Review
                  <span className="relative z-10 ml-1 sm:ml-2 opacity-75 text-xs sm:text-sm">Pending admin approval</span>
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
