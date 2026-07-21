import React from 'react';
import { Download, FileText, Play, TrendingUp } from 'lucide-react';

export function Resources() {
  const reports = [
    "Market Trends", "Price Appreciation Reports", "Rental Yield Analysis",
    "Upcoming Infrastructure Projects", "Builder Performance Reports", "Best Investment Corridors"
  ];

  const blogs = [
    "Buying Your First Home", "Top Investment Locations in Bangalore", 
    "Apartment vs Villa", "Mistakes First-Time Buyers Make", "RERA Explained"
  ];

  const videos = [
    "Project Walkthroughs", "Site Visit Experiences", "Builder Reviews",
    "Location Reviews", "Investment Opportunities"
  ];

  return (
    <section id="resources" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-sm mb-4">
            <span className="w-8 h-0.5 bg-gold-600"></span>
            Market Insights
            <span className="w-8 h-0.5 bg-gold-600"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">Learn Before You Buy</h2>
          <p className="text-lg text-gray-600 font-light">
             Stay informed with expert insights, comprehensive guides, and market intelligence before making your next investment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Reports */}
          <div className="bg-white rounded-sm p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-beige-50 rounded-full flex items-center justify-center text-navy-900 mb-8 group-hover:bg-navy-900 group-hover:text-gold-500 transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4">Investment Reports</h3>
            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">Download data-backed reports on Bangalore's real estate market performance.</p>
            <ul className="space-y-4 mb-8">
              {reports.slice(0, 4).map((item, idx) => (
                <li key={idx} className="text-sm font-medium text-navy-900 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3.5 bg-white hover:bg-navy-900 hover:text-white text-navy-900 border border-gray-200 rounded-sm font-bold text-sm inline-flex justify-center items-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              Download Reports
            </button>
          </div>

          {/* Blogs */}
          <div className="bg-white rounded-sm p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-beige-50 rounded-full flex items-center justify-center text-navy-900 mb-8 group-hover:bg-navy-900 group-hover:text-gold-500 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4">Latest Articles</h3>
            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">Read our expert guides and tips for home buying, loans, and legal procedures.</p>
            <ul className="space-y-4 mb-8">
              {blogs.map((item, idx) => (
                <li key={idx} className="text-sm font-medium text-navy-900 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3.5 bg-white hover:bg-navy-900 hover:text-white text-navy-900 border border-gray-200 rounded-sm font-bold text-sm inline-flex justify-center items-center gap-2 transition-all">
              Read Articles
            </button>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-sm p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-beige-50 rounded-full flex items-center justify-center text-navy-900 mb-8 group-hover:bg-navy-900 group-hover:text-gold-500 transition-colors">
              <Play className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-4">Video Guides</h3>
            <p className="text-sm text-gray-600 mb-8 font-light leading-relaxed">Watch detailed project walkthroughs, builder reviews, and site visit experiences.</p>
            <ul className="space-y-4 mb-8">
              {videos.map((item, idx) => (
                <li key={idx} className="text-sm font-medium text-navy-900 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3.5 bg-white hover:bg-navy-900 hover:text-white text-navy-900 border border-gray-200 rounded-sm font-bold text-sm inline-flex justify-center items-center gap-2 transition-all">
              Watch Videos
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
