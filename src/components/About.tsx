import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRUST_REASONS } from '../types';

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-md bg-navy-900/5 flex items-center justify-center">
              <img 
                src="https://wqhbuwisqncwadomxwuf.supabase.co/storage/v1/object/public/tmg/WhatsApp%20Image%202026-07-23%20at%2012.03.54%20PM%20(1).jpeg" 
                alt="D. M. Nagesh" 
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-8 bg-navy-900 text-white p-5 sm:p-8 rounded-sm shadow-xl hidden sm:block">
              <p className="text-3xl sm:text-4xl font-bold text-gold-500 mb-1">5+</p>
              <p className="text-xs sm:text-sm font-medium tracking-wide uppercase">Years of<br />Excellence</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-8 h-0.5 bg-gold-600"></span>
              About Us
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-navy-900 mb-4 sm:mb-6 leading-tight">
              More Than Property Sales—Professional Guidance
            </h2>
            <div className="prose prose-lg text-gray-600 mb-6 sm:mb-8 font-light leading-relaxed text-sm sm:text-base">
              <p className="mb-3">
                Buying a home is one of life's biggest financial decisions. Choosing the right advisor can make all the difference.
              </p>
              <p className="text-navy-900 font-medium mb-3">
                I am D. M. Nagesh, a RERA Registered Channel Partner helping families, professionals, NRIs, and investors find the right property across Bangalore.
              </p>
              <p>
                Rather than simply selling apartments, my goal is to understand your needs and recommend properties that genuinely fit your lifestyle, financial goals, and future plans.
              </p>
            </div>
            
            <div className="mb-6 sm:mb-8 flex justify-center sm:justify-start">
              <img 
                src="https://wqhbuwisqncwadomxwuf.supabase.co/storage/v1/object/public/tmg/WhatsApp%20Image%202026-07-23%20at%2012.03.54%20PM.jpeg" 
                alt="D. M. Nagesh with client" 
                className="w-full max-w-sm h-auto sm:h-64 object-contain sm:object-cover rounded-sm shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us Grid */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3 sm:mb-4">Why Buyers Trust Us</h3>
            <p className="text-sm sm:text-base text-gray-600">Delivering exceptional real estate experiences through transparency, dedication, and expert knowledge.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_REASONS.map((reason, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-beige-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-navy-900 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-gold-600" />
                </div>
                <h4 className="font-bold text-navy-900 mb-3">{reason.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-light">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
