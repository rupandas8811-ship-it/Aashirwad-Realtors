import React from 'react';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROPERTIES = [
  {
    id: 1,
    title: "Luxury Apartment in Indiranagar",
    location: "Indiranagar, Bangalore",
    price: "₹3.5 Cr",
    type: "Apartment",
    beds: 3,
    baths: 3,
    area: "2,200 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    badge: "For Sale"
  },
  {
    id: 2,
    title: "Premium Villa with Private Pool",
    location: "Whitefield, Bangalore",
    price: "₹5.2 Cr",
    type: "Villa",
    beds: 4,
    baths: 5,
    area: "4,500 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1613490908578-75c65db3c3f1?auto=format&fit=crop&q=80",
    badge: "Featured"
  },
  {
    id: 3,
    title: "Modern Studio Apartment",
    location: "Koramangala, Bangalore",
    price: "₹85 L",
    type: "Apartment",
    beds: 1,
    baths: 1,
    area: "800 Sq.Ft.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80",
    badge: "New"
  }
];

export function FeaturedProperties() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-gold-600 font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4">
              <span className="w-8 h-0.5 bg-gold-600"></span>
              Exclusive Listings
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-900">
              Featured Properties
            </h2>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 text-navy-900 font-bold hover:text-gold-600 transition-colors group min-h-[44px]">
            <span>View All Properties</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm">
                  {property.badge}
                </div>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/90 backdrop-blur-sm text-navy-900 font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-sm sm:text-base">
                  {property.price}
                </div>
              </div>
              
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <p className="text-gold-600 text-xs font-bold uppercase tracking-wider mb-2">{property.type}</p>
                <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 line-clamp-1">{property.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{property.location}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 sm:py-4 border-t border-b border-gray-100 mb-6">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Bed className="w-4 sm:w-5 h-4 sm:h-5 text-navy-400" />
                    <span className="text-[11px] sm:text-xs font-semibold text-navy-900">{property.beds} Beds</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-gray-100 text-center">
                    <Bath className="w-4 sm:w-5 h-4 sm:h-5 text-navy-400" />
                    <span className="text-[11px] sm:text-xs font-semibold text-navy-900">{property.baths} Baths</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Square className="w-4 sm:w-5 h-4 sm:h-5 text-navy-400" />
                    <span className="text-[11px] sm:text-xs font-semibold text-navy-900">{property.area}</span>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-beige-50 hover:bg-navy-900 hover:text-white text-navy-900 rounded-sm font-bold transition-colors mt-auto min-h-[44px]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
