import React from 'react';
import { NAV_ITEMS } from '../types';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          
          <div className="md:col-span-1">
            <h3 className="text-white text-2xl font-bold mb-2">Aashirwad Realtors</h3>
            <p className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-6">D. M. Nagesh</p>
            <p className="text-sm leading-relaxed mb-6 font-light text-beige-100">
              Your Trusted Real Estate Advisor in Bangalore. Helping homebuyers and investors make informed property decisions through transparent advice, verified projects, and end-to-end assistance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm font-medium text-beige-200 hover:text-gold-500 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-gold-500 rounded-full" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Disclaimer</h4>
            <p className="text-xs leading-relaxed text-beige-200 font-light">
              All project information, pricing, availability, offers, and specifications are subject to change by the respective developers. Property recommendations are based on information available at the time of consultation. Visitors are advised to independently verify all project details before making any purchase decision.
            </p>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-beige-200 font-medium">
            © {new Date().getFullYear()} Aashirwad Realtors. All rights reserved.
          </p>
          <p className="text-xs text-gold-500 font-bold tracking-widest uppercase">
            RERA: PRM/KA/RERA/1251/310/AG/220203/002771
          </p>
        </div>
      </div>
    </footer>
  );
}
