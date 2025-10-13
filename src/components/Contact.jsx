import React from 'react';
import { Send } from 'lucide-react';

const Contact = ({ formData, setFormData, formStatus, handleSubmit }) => {
  return (
    <section id="contact" className="min-h-screen flex items-center px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-16 sm:py-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl font-bold mb-8 xs:mb-10 sm:mb-12 text-center">
          Get In <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
        </h2>
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 xs:p-8 rounded-2xl border border-gray-300/20 dark:border-purple-500/20">
          <div className="mb-4 xs:mb-6">
            <label className="block mb-2 font-semibold text-sm xs:text-base">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 xs:px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus-ring text-sm xs:text-base"
            />
          </div>
          <div className="mb-4 xs:mb-6">
            <label className="block mb-2 font-semibold text-sm xs:text-base">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 xs:px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus-ring text-sm xs:text-base"
            />
          </div>
          <div className="mb-4 xs:mb-6">
            <label className="block mb-2 font-semibold text-sm xs:text-base">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="4"
              className="w-full px-3 xs:px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus-ring text-sm xs:text-base resize-vertical"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            disabled={formStatus === 'sending'}
            className="w-full px-6 xs:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 touch-target focus-ring text-sm xs:text-base"
          >
            {formStatus === 'sending' ? 'Sending...' : (
              <>
                <Send size={18} className="xs:w-5 xs:h-5" />
                Send Message
              </>
            )}
          </button>
          {formStatus === 'success' && (
            <p className="mt-4 text-green-400 text-center text-sm xs:text-base">Message sent successfully!</p>
          )}
          {formStatus === 'error' && (
            <p className="mt-4 text-red-400 text-center text-sm xs:text-base">Failed to send message. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
