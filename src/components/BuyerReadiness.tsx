import React from 'react';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BuyerReadiness() {
  const assessmentItems = [
    "Your purpose of buying",
    "Budget",
    "Preferred locations",
    "Investment goals",
    "Buying timeline",
    "Financial readiness",
    "Home or investment preference",
    "Site visit expectations",
    "Decision-making stage",
    "Property preferences"
  ];

  return (
    <section id="readiness" className="py-16 sm:py-24 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-gold-500 mb-6 sm:mb-8 text-navy-900 shadow-lg shadow-gold-500/20">
              <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">Are You Ready to Buy a Property?</h2>
            <p className="text-beige-100 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl font-light">
              Buying property requires careful planning. Before scheduling a consultation, complete our Buyer Readiness Assessment to help us understand your exact needs.
            </p>
            
            <Link 
              to="/readiness-test"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm font-bold text-base sm:text-lg inline-flex items-center justify-center gap-2 transition-all shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto min-h-[44px]"
            >
              Take the Readiness Test
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-gold-400 font-medium">Takes only 2 minutes. Receive personalized insights immediately.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl relative">
            <h3 className="text-lg sm:text-xl font-bold mb-6 border-b border-white/10 pb-6 text-white flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gold-500"></span>
              <span>This assessment helps us understand:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-4">
              {assessmentItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold-500 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
