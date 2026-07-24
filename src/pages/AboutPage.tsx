import React, { useEffect } from 'react';
import { About } from '../components/About';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return <About />;
}
