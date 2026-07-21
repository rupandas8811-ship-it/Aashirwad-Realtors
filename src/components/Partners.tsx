import React from 'react';
import { BUILDER_PARTNERS, PROPERTY_CATEGORIES } from '../types';
import { Building2, Home } from 'lucide-react';

export function Partners() {
  return (
    <section id="builders" className="py-24 bg-white border-y border-beige-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-sm mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Our Network
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">Partnered with Bangalore's Leading Developers</h2>
          <p className="text-lg text-gray-600 font-light">
            We help you explore projects from some of India's most trusted real estate brands.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Developers */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-navy-900 text-gold-500 rounded-sm flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Featured Developers</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {BUILDER_PARTNERS.map((partner) => (
                <span key={partner} className="px-4 py-2 bg-beige-50 hover:bg-beige-100 text-navy-900 text-sm font-semibold rounded-sm border border-beige-200 transition-colors cursor-default shadow-sm">
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Property Categories */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gold-500 text-navy-900 rounded-sm flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Property Categories</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {PROPERTY_CATEGORIES.map((category) => (
                <div key={category} className="flex items-center gap-4 p-4 rounded-sm border border-gray-100 hover:border-gold-500 hover:shadow-md transition-all group bg-white">
                  <div className="w-2 h-2 rounded-full bg-navy-900 group-hover:bg-gold-500 transition-colors" />
                  <span className="font-semibold text-navy-900">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
