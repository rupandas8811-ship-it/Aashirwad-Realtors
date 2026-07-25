import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 scroll-smooth flex flex-col">
      <Header />
      <main className={`flex-grow ${!isHome ? 'pt-24' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
