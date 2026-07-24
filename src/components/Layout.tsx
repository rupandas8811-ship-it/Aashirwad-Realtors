import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ReadinessTest } from './ReadinessTest';

export function Layout() {
  const [showTest, setShowTest] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 scroll-smooth flex flex-col">
      <Header />
      <main className={`flex-grow ${!isHome ? 'pt-24' : ''}`}>
        <Outlet context={{ setShowTest }} />
      </main>
      <Footer />
      {showTest && <ReadinessTest onClose={() => setShowTest(false)} />}
    </div>
  );
}
