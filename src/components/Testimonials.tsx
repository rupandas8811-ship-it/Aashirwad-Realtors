import React from 'react';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-sm mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Testimonials
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">Helping Families Find Their Dream Homes</h2>
          <p className="text-lg text-gray-600 font-light">
            Our greatest achievement is the trust of our clients.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-navy-900 rounded-sm p-8 md:p-16 border border-navy-800 relative shadow-2xl">
            <div className="absolute top-8 left-8 text-gold-500/20">
              <Quote className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center gap-2 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-3xl text-beige-50 font-medium leading-relaxed mb-10 italic">
                "We were confused about choosing between multiple builders. Mr. Nagesh patiently explained every option, arranged site visits, negotiated the best offer, and supported us throughout the booking process. We couldn't have asked for a better advisor."
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-beige-100 rounded-full mb-4 overflow-hidden border-2 border-gold-500">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" alt="Customer" className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-gold-500 text-lg uppercase tracking-wider">Arjun & Priya</p>
                <p className="text-beige-200 text-sm">Happy Homebuyers, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
