import React, { useEffect } from 'react';
import { Subscription } from '../components/Subscription';

export function SubscriptionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-navy-900 min-h-screen">
      <Subscription />
    </div>
  );
}
