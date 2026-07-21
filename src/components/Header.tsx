import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, Building } from 'lucide-react';
import { NAV_ITEMS } from '../types';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${isScrolled ? 'bg-navy-900 text-gold-500' : 'bg-white/10 backdrop-blur-md text-gold-500 border border-white/20'}`}>
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h1 className={`font-bold text-xl tracking-tight leading-tight ${isScrolled ? 'text-navy-900' : 'text-white'}`}>Aashirwad Realtors</h1>
              <p className={`text-xs uppercase tracking-widest font-semibold ${isScrolled ? 'text-gold-600' : 'text-gold-400'}`}>D. M. Nagesh</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className={`text-sm font-medium hover:text-gold-500 transition-colors ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+919742636365" className={`flex items-center gap-2 text-sm font-semibold hover:text-gold-500 transition-colors ${isScrolled ? 'text-navy-900' : 'text-white'}`}>
              <Phone className="w-4 h-4" />
              <span>+91 9742636365</span>
            </a>
            <a href="#consultation" className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 py-2.5 rounded-sm text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Book a Site Visit
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-md transition-colors ${isScrolled ? 'text-navy-900 hover:bg-beige-50' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-navy-900 font-medium py-3 px-4 hover:bg-beige-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-beige-100">
             <a href="tel:+919742636365" className="flex items-center justify-center gap-2 text-navy-900 font-semibold py-3 bg-beige-50 rounded-sm">
              <Phone className="w-4 h-4 text-gold-600" />
              <span>Call +91 9742636365</span>
            </a>
            <a href="#consultation" className="bg-navy-900 text-white text-center px-5 py-3 rounded-sm font-bold tracking-wide">
              Book a Site Visit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
