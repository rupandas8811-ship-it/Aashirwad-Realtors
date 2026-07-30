import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, Building } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../types';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scrolled appearance on non-home pages
  const applyScrolledStyle = isScrolled || !isHome;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${applyScrolledStyle ? 'bg-white shadow-md py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg flex-shrink-0">
              <img 
                src="https://wqhbuwisqncwadomxwuf.supabase.co/storage/v1/object/public/tmg/Untitled%20design%20(4)-Picsart-BackgroundRemover.png" 
                alt="Aashirwad Realtors Logo" 
                className="w-full h-full object-contain p-0.5 sm:p-1"
              />
            </div>
            <div className="min-w-0">
              <h1 className={`font-bold text-base sm:text-xl tracking-tight leading-tight truncate ${applyScrolledStyle ? 'text-navy-900' : 'text-white'}`}>Aashirwad Realtors</h1>
              <p className={`text-[10px] sm:text-xs uppercase tracking-widest font-semibold truncate ${applyScrolledStyle ? 'text-gold-600' : 'text-gold-400'}`}>D. M. Nagesh</p>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                to={item.href} 
                className={`text-sm font-medium hover:text-gold-500 transition-colors ${applyScrolledStyle ? 'text-navy-900' : 'text-white'} ${location.pathname === item.href && !isHome ? 'text-gold-500' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+919742636365" className={`flex items-center gap-2 text-sm font-semibold hover:text-gold-500 transition-colors ${applyScrolledStyle ? 'text-navy-900' : 'text-white'}`}>
              <Phone className="w-4 h-4" />
              <span>+91 9742636365</span>
            </a>
            <Link to="/contact" className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 py-2.5 rounded-sm text-sm font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Book a Site Visit
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${applyScrolledStyle ? 'text-navy-900 hover:bg-beige-50' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link 
              key={item.label} 
              to={item.href} 
              className={`text-navy-900 font-medium py-3 px-4 hover:bg-beige-50 rounded-md transition-colors text-base min-h-[44px] flex items-center ${location.pathname === item.href ? 'bg-beige-50 text-gold-600' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-beige-100">
             <a href="tel:+919742636365" className="flex items-center justify-center gap-2 text-navy-900 font-semibold py-3 px-4 bg-beige-50 rounded-sm min-h-[44px]" onClick={() => setIsMobileMenuOpen(false)}>
              <Phone className="w-4 h-4 text-gold-600" />
              <span>Call +91 9742636365</span>
            </a>
            <Link to="/contact" className="bg-navy-900 text-white text-center px-5 py-3 rounded-sm font-bold tracking-wide min-h-[44px] flex items-center justify-center" onClick={() => setIsMobileMenuOpen(false)}>
              Book a Site Visit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
