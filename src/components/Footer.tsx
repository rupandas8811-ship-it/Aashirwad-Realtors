import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../types';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12 sm:py-16 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-10 sm:mb-16">
          
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0">
                <img 
                  src="https://wqhbuwisqncwadomxwuf.supabase.co/storage/v1/object/public/tmg/Untitled%20design%20(4)-Picsart-BackgroundRemover.png" 
                  alt="Aashirwad Realtors Logo" 
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">Aashirwad Realtors</h3>
                <p className="text-gold-500 text-xs font-bold uppercase tracking-widest">D. M. Nagesh</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed mb-6 font-light text-beige-100">
              Your Trusted Real Estate Advisor in Bangalore. Helping homebuyers and investors make informed property decisions through transparent advice, verified projects, and end-to-end assistance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Quick Links</h4>
            <ul className="space-y-3 sm:space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-xs sm:text-sm font-medium text-beige-200 hover:text-gold-500 transition-colors inline-flex items-center gap-2 py-1">
                    <span className="w-1 h-1 bg-gold-500 rounded-full" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 sm:mb-6 uppercase tracking-wider text-xs sm:text-sm">Disclaimer</h4>
            <p className="text-[11px] sm:text-xs leading-relaxed text-beige-200 font-light">
              All project information, pricing, availability, offers, and specifications are subject to change by the respective developers. Property recommendations are based on information available at the time of consultation. Visitors are advised to independently verify all project details before making any purchase decision.
            </p>
          </div>
          
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-navy-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="text-xs text-beige-200 font-medium flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>© {new Date().getFullYear()} Aashirwad Realtors. All rights reserved.</span>
            <span className="hidden sm:inline text-navy-800">|</span>
            <Link to="/admin" className="hover:text-gold-500 transition-colors py-1">Staff Login</Link>
          </div>
          <p className="text-[11px] sm:text-xs text-gold-500 font-bold tracking-wider sm:tracking-widest uppercase break-all">
            RERA: PRM/KA/RERA/1251/310/AG/220203/002771
          </p>
        </div>
      </div>
    </footer>
  );
}
