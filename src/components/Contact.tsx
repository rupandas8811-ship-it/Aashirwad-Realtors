import React from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-sm mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Contact Us
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">Get in Touch</h2>
          <p className="text-lg text-gray-600 font-light">
            Have questions? We are here to help you navigate Bangalore's real estate market.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-sm shadow-xl border-t-4 border-gold-500">
              <h3 className="text-2xl font-bold text-navy-900 mb-8">Office Information</h3>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 mb-1 uppercase tracking-wide">Phone</p>
                    <p className="text-gray-600 font-medium">+91 9742636365</p>
                    <p className="text-gray-600 font-medium">+91 7982212234</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 mb-1 uppercase tracking-wide">Email</p>
                    <p className="text-gray-600 font-medium">Aashirwadrealtorss@gmail.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 mb-1 uppercase tracking-wide">Working Hours</p>
                    <p className="text-gray-600 font-medium">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    <p className="text-gray-600 font-medium">Sunday: By Appointment</p>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 mb-1 uppercase tracking-wide">Office Location</p>
                    <p className="text-gray-600 font-medium">Bangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-sm font-bold text-navy-900 mb-1 tracking-wide uppercase">D. M. Nagesh • Aashirwad Realtors</p>
                <p className="text-xs text-gold-600 font-bold tracking-wider">RERA: PRM/KA/RERA/1251/310/AG/220203/002771</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm overflow-hidden h-96 lg:h-auto relative border border-gray-100 shadow-xl group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-60 grayscale" />
            <div className="absolute inset-0 bg-navy-900/60 flex flex-col items-center justify-center text-white">
              <MapPin className="w-16 h-16 mb-4 text-gold-500" />
              <p className="text-2xl font-bold tracking-tight">Visit Our Office</p>
              <p className="text-sm text-beige-200 mt-2">Find us on Google Maps</p>
              <button className="mt-6 px-6 py-2 border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 font-bold uppercase tracking-widest text-xs transition-colors rounded-sm">
                Get Directions
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
