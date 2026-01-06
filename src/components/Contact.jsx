import React from 'react';
import { Send, Mail, MapPin, Phone, MessageCircle, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Contact = ({ formData, setFormData, formStatus, handleSubmit }) => {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'mojjam07@gmail.com', href: 'mailto:mojjam07@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+234 706 330 6325', href: 'tel:+2347063306325' },
    { icon: MapPin, label: 'Location', value: 'Nigeria', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mojjam07', label: 'GitHub' },
    { icon: Linkedin, href: 'www.linkedin.com/in/mojeed-jamiu-b279171a2#', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/el_munjid07', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/yourusername', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-3">
            Let's connect
          </span>
          <h2 className="text-2.5xl sm:text-4xl font-bold mb-3">
            Get In <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-4">
            <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Follow me on social media</p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 group"
                    >
                      <social.icon className="w-4 h-4 text-gray-700 dark:text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Available for work</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">I'm currently open to new opportunities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="p-4 sm:p-6 rounded-xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or just say hi..."
                  rows="4"
                  className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 text-sm"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {formStatus === 'success' && (
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-center flex items-center justify-center gap-2 text-sm">
                  <span>✅</span>
                  Message sent successfully!
                </div>
              )}
              {formStatus === 'error' && (
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-center flex items-center justify-center gap-2 text-sm">
                  <span>❌</span>
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

