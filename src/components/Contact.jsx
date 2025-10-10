import React from 'react';
import { Send } from 'lucide-react';

const Contact = ({ formData, setFormData, formStatus, handleSubmit }) => {
  return (
    <section id="contact" className="min-h-screen flex items-center px-4 py-20">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Get In <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
        </h2>
        <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-300/20 dark:border-purple-500/20">
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500"
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            disabled={formStatus === 'sending'}
            className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {formStatus === 'sending' ? 'Sending...' : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>
          {formStatus === 'success' && (
            <p className="mt-4 text-green-400 text-center">Message sent successfully!</p>
          )}
          {formStatus === 'error' && (
            <p className="mt-4 text-red-400 text-center">Failed to send message. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
