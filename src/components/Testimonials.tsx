import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: "Mr. Nagesh patiently explained every option, arranged site visits, and negotiated the best offer. Couldn't have asked for a better advisor.",
    name: "Arjun & Priya",
    type: "Happy Homebuyers, Bangalore"
  },
  {
    text: "Very professional and transparent. He understood my investment goals and found a property with excellent rental yield potential.",
    name: "Rajesh Kumar",
    type: "NRI Investor"
  },
  {
    text: "The end-to-end support was incredible. From the first site visit to the final paperwork, Aashirwad Realtors made it seamless.",
    name: "Sneha Reddy",
    type: "First-Time Buyer"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Testimonials
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-navy-900 mb-4 sm:mb-6 leading-tight">Helping Families Find Their Dream Homes</h2>
          <p className="text-base sm:text-lg text-gray-600 font-light">
            Our greatest achievement is the trust of our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="bg-navy-900 rounded-sm p-6 sm:p-8 border border-navy-800 relative shadow-xl flex flex-col">
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-gold-500/10">
                <Quote className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-500 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-beige-50 text-sm sm:text-base font-medium leading-relaxed mb-6 sm:mb-8 italic flex-1">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="mt-auto pt-4 border-t border-navy-800">
                  <p className="font-bold text-gold-500 uppercase tracking-wider text-xs sm:text-sm">{testimonial.name}</p>
                  <p className="text-beige-200 text-xs mt-0.5">{testimonial.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
