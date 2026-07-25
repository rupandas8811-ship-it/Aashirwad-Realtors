import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReadinessTest } from '../components/ReadinessTest';

export function ReadinessTestPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <ReadinessTest onClose={() => navigate('/')} />
    </div>
  );
}
