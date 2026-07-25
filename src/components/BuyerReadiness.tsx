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
    <section id="readiness" className="py-24 bg-navy-900 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-sm bg-gold-500 mb-8 text-navy-900 shadow-lg shadow-gold-500/20">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Are You Ready to Buy a Property?</h2>
            <p className="text-beige-100 text-lg mb-10 leading-relaxed max-w-xl font-light">
              Buying property requires careful planning. Before scheduling a consultation, complete our Buyer Readiness Assessment to help us understand your exact needs.
            </p>
            
            <Link 
              to="/readiness-test"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-8 py-4 rounded-sm font-bold text-lg inline-flex items-center gap-2 transition-all shadow-lg transform hover:-translate-y-0.5 w-max"
            >
              Take the Readiness Test
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-gold-400 font-medium">Takes only 2 minutes. Receive personalized insights immediately.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-sm p-8 shadow-2xl relative">
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-6 text-white flex items-center gap-3">
              <span className="w-8 h-0.5 bg-gold-500"></span>
              This assessment helps us understand:
            </h3>
            <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4">
              {assessmentItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gold-500 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
