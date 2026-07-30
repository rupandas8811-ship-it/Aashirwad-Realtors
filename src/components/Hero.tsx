import React from 'react';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
          alt="Luxury home exterior" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/40 sm:to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-sm bg-white/10 backdrop-blur-md text-gold-400 border border-gold-500/30 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 sm:mb-8">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>RERA Registered Channel Partner</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4 sm:mb-6">
            Find A Place You'll Love To <span className="text-gold-500">Call Home</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-beige-100 mb-8 sm:mb-10 leading-relaxed max-w-2xl font-light">
            Whether you're buying your first home, upgrading to a premium residence, or investing in Bangalore's growing market.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link to="/contact" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm font-bold text-base transition-all shadow-lg min-h-[44px]">
              Schedule a Visit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919742636365" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm font-bold text-base transition-all shadow-sm min-h-[44px]">
              <Phone className="w-5 h-5 text-gold-500" />
              Call +91 9742636365
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
