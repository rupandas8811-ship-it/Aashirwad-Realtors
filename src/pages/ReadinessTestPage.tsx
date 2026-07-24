import React, { useEffect, useState } from 'react';
import { BuyerReadiness } from '../components/BuyerReadiness';
import { ReadinessTest } from '../components/ReadinessTest';

export function ReadinessTestPage() {
  const [showTest, setShowTest] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-navy-900 min-h-screen">
      <BuyerReadiness onTakeTest={() => setShowTest(true)} />
      {showTest && <ReadinessTest onClose={() => setShowTest(false)} />}
    </div>
  );
}
