import React from 'react';
import { Users, CheckCircle, ArrowRight } from 'lucide-react';

export function Subscription() {
  const benefits = [
    "Monthly Bangalore Market Updates",
    "Latest Project Launches",
    "Investment Alerts",
    "Rental Yield Reports",
    "Builder Comparisons",
    "Legal Awareness Sessions",
    "Property Buying Checklists",
    "Exclusive Webinars",
    "Early Access to Opportunities",
    "Direct Q&A with D. M. Nagesh",
    "Priority Consultation",
    "Buyer Readiness Reviews"
  ];

  return (
    <section id="subscription" className="py-16 sm:py-24 bg-navy-900 text-white relative overflow-hidden">
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white/10 text-gold-500 border border-gold-500/30 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 sm:mb-8">
              <Users className="w-4 h-4" />
              <span>Premium Membership</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Join The Bangalore Property Circle
            </h2>
            
            <p className="text-beige-100 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed font-light">
              Buying a property isn't something you should do based only on advertisements. Join our exclusive buyer community and receive ongoing guidance before making one of the biggest financial decisions of your life.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-sm p-5 sm:p-8 mb-8 backdrop-blur-sm">
              <h3 className="text-xs sm:text-sm font-bold text-gold-500 uppercase tracking-widest mb-4 sm:mb-6">Ideal For:</h3>
              <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <li className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></span> First-time homebuyers
                </li>
                <li className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></span> Property investors
                </li>
                <li className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></span> NRIs
                </li>
                <li className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></span> Families planning future purchases
                </li>
                <li className="text-xs sm:text-sm font-medium text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full flex-shrink-0"></span> Professionals relocating
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-sm p-6 sm:p-8 lg:p-12 text-navy-900 shadow-2xl relative border-t-4 border-gold-500">
            <div className="absolute -top-4 right-4 sm:-right-4 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wider px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm transform sm:rotate-3 shadow-lg">
              Most Popular
            </div>
            
            <div className="mb-8 sm:mb-10 text-center pb-6 sm:pb-8 border-b border-gray-100">
              <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 sm:mb-4">Membership Fee</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-navy-900">₹999</span>
                <span className="text-base sm:text-lg text-gray-500 font-medium">/ month</span>
              </div>
            </div>

            <ul className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-navy-900">{benefit}</span>
                </li>
              ))}
            </ul>

            <a 
              href="https://wa.me/919742636365?text=Hi%20Mr.%20Nagesh,%20I%20would%20like%20to%20join%20The%20Bangalore%20Property%20Circle%20and%20pay%20the%20Rs.999%20membership%20fee." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 sm:py-4 bg-navy-900 hover:bg-navy-800 text-white rounded-sm font-bold text-base sm:text-lg transition-colors flex items-center justify-center gap-2 group min-h-[44px]"
            >
              Join via WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
