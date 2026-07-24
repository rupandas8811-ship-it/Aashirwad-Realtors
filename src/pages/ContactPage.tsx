import React, { useEffect } from 'react';
import { Consultation } from '../components/Consultation';
import { Contact } from '../components/Contact';

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-white min-h-screen">
      <Consultation />
      <Contact />
    </div>
  );
}
