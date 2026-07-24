import React, { useEffect } from 'react';
import { Stats } from '../components/Stats';
import { Partners } from '../components/Partners';

export function BuildersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-navy-900">
      <Stats />
      <div className="bg-white">
        <Partners />
      </div>
    </div>
  );
}
