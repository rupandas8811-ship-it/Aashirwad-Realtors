import React, { useState } from 'react';
import { Calendar, CheckCircle, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Consultation() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    lookingFor: 'First Home'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const payload = {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        looking_for: formData.lookingFor
      };
      
      const { error } = await supabase
        .from('consultations')
        .insert([payload]);

      if (error) {
        console.error('Consultation Supabase Error:', error);
        throw error;
      }
      setIsSuccess(true);
      setFormData({ fullName: '', phone: '', email: '', lookingFor: 'First Home' });
    } catch (e) {
      console.error(e);
      setSubmitError('Unable to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    "Requirement Analysis", "Budget Planning", "Builder Comparison", 
    "Project Shortlisting", "Site Visit Planning", "Investment Advice", 
    "Loan Guidance", "Booking Assistance", "Documentation Support"
  ];

  return (
    <section id="consultation" className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-beige-50 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-sm mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Book Appointment
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">Interested in a Property? <br/>Schedule a Site Visit Today.</h2>
          <p className="text-lg text-gray-600 font-light">
            Every buyer has different priorities. Receive personalized property recommendations based on your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-0 bg-white rounded-sm overflow-hidden shadow-2xl border border-gray-100">
          
          <div className="lg:col-span-3 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-beige-50 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gold-600" />
              </div>
              Book Your Free Consultation
            </h3>
            
            {isSuccess ? (
              <div className="bg-beige-50 border-l-4 border-gold-500 p-8 text-center h-full flex flex-col justify-center">
                <CheckCircle className="w-16 h-16 text-gold-500 mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-navy-900 mb-2">Request Received!</h4>
                <p className="text-gray-600">Mr. Nagesh's team will contact you shortly to schedule your personalized consultation.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 text-gold-600 font-bold hover:text-gold-700">Book another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-sm text-sm font-medium border border-red-100">
                    {submitError}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wide">Full Name</label>
                    <input 
                      required type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full px-4 py-3 bg-beige-50 rounded-sm border border-gray-200 focus:ring-1 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wide">Phone Number</label>
                    <input 
                      required type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-beige-50 rounded-sm border border-gray-200 focus:ring-1 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wide">Email Address</label>
                  <input 
                    required type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-beige-50 rounded-sm border border-gray-200 focus:ring-1 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wide">What are you looking for?</label>
                  <select 
                    value={formData.lookingFor}
                    onChange={e => setFormData({...formData, lookingFor: e.target.value})}
                    className="w-full px-4 py-3 bg-beige-50 rounded-sm border border-gray-200 focus:ring-1 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all cursor-pointer"
                  >
                    <option>First Home</option>
                    <option>Upgrading Home</option>
                    <option>Investment Property</option>
                    <option>Commercial Property</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-sm transition-colors mt-4 flex items-center justify-center gap-2 group disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Schedule Consultation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 bg-navy-900 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h4 className="text-2xl font-bold mb-8 text-gold-500">Consultation Includes</h4>
            <ul className="space-y-4 mb-12 relative z-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-beige-100 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3 h-3 text-gold-500" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="border-t border-white/10 pt-8 relative z-10">
              <h4 className="text-lg font-bold mb-6 text-gold-500">Direct Contact</h4>
              <div className="space-y-5">
                <a href="tel:+919742636365" className="flex items-center gap-4 hover:text-gold-400 transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wide">+91 9742636365</p>
                    <p className="text-xs text-beige-200">Call for immediate assistance</p>
                  </div>
                </a>
                <a href="mailto:Aashirwadrealtorss@gmail.com" className="flex items-center gap-4 hover:text-gold-400 transition-colors">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wide">Email Us</p>
                    <p className="text-xs text-beige-200 break-all">Aashirwadrealtorss@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
