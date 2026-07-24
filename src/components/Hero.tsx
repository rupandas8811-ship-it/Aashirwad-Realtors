import React from 'react';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
          alt="Luxury home exterior" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/70 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-white/10 backdrop-blur-md text-gold-400 border border-gold-500/30 text-sm font-semibold tracking-wide uppercase mb-8">
            <ShieldCheck className="w-4 h-4" />
            <span>RERA Registered Channel Partner</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Find A Place You'll Love To <span className="text-gold-500">Call Home</span>
          </h1>
          
          <p className="text-lg md:text-xl text-beige-100 mb-10 leading-relaxed max-w-2xl font-light">
            Whether you're buying your first home, upgrading to a premium residence, or investing in Bangalore's growing market.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#consultation" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-4 rounded-sm font-bold transition-all shadow-lg">
              Schedule a Visit
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="tel:+919742636365" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 py-4 rounded-sm font-bold transition-all shadow-sm">
              <Phone className="w-5 h-5 text-gold-500" />
              Call +91 9742636365
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
