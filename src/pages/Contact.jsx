import React, { useState } from 'react';
import { SectionContainer } from '../components/SectionContainer';

const API_URL = import.meta.env.VITE_BASE_URL; // Ajusta según tu configuración

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'improvement', label: 'Improvement Suggestion' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'General Feedback' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          category: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to send message. Please try again.');
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer classProps="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className='text-gradient text-3xl sm:text-5xl font-bold mb-4'>
          Support Tickets
        </h1>
        <p className="text-neutral-20 text-lg">
          Help us improve by submitting your feedback, bug reports, or feature requests
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="bg-primary-50 bg-opacity-20 border border-primary-50 rounded-lg p-4 mb-6">
          <p className="text-primary-50 font-semibold">✓ Message sent successfully!</p>
          <p className="text-neutral-20 text-sm">We'll get back to you within 24-48 hours.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-400 font-semibold">✗ Error sending message</p>
          <p className="text-neutral-20 text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-neutral-80 rounded-xl p-6 shadow-lg border border-neutral-70">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-neutral-0 font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-neutral-70 border border-neutral-60 rounded-lg text-neutral-0 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all duration-300"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-neutral-0 font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-neutral-70 border border-neutral-60 rounded-lg text-neutral-0 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Category Field */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-neutral-0 font-semibold mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-neutral-70 border border-neutral-60 rounded-lg text-neutral-0 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Subject Field */}
        <div className="mb-6">
          <label htmlFor="subject" className="block text-neutral-0 font-semibold mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-neutral-70 border border-neutral-60 rounded-lg text-neutral-0 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all duration-300"
            placeholder="Brief description of your issue or request"
          />
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-neutral-0 font-semibold mb-2">
            Detailed Description *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full p-3 bg-neutral-70 border border-neutral-60 rounded-lg text-neutral-0 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:border-transparent transition-all duration-300 resize-vertical"
            placeholder="Please provide as much detail as possible about your issue, suggestion, or feedback..."
          />
        </div>


        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn px-8 py-3 rounded-lg font-semibold text-neutral-0 transition-all duration-300 transform hover:scale-105 ${
              isSubmitting 
                ? 'bg-neutral-50 cursor-not-allowed' 
                : 'bg-gradient hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Ticket'
            )}
          </button>
        </div>
      </form>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <div className="bg-neutral-80 rounded-lg p-6 border border-neutral-70">
          <h3 className="text-xl font-bold text-neutral-0 mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="text-center">
              <span className="text-primary-50 font-semibold">Response Time</span>
              <p className="text-neutral-20">We typically respond within 24-48 hours</p>
            </div>
            <div className="text-center">
              <span className="text-secondary-50 font-semibold">Email Support</span>
              <p className="text-neutral-20">codepply@protonmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
