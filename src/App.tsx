/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Partners } from './components/Partners';
import { BuyerReadiness } from './components/BuyerReadiness';
import { Consultation } from './components/Consultation';
import { Testimonials } from './components/Testimonials';
import { Subscription } from './components/Subscription';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ReadinessTest } from './components/ReadinessTest';

export default function App() {
  const [showTest, setShowTest] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 scroll-smooth">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <Partners />
        <BuyerReadiness onTakeTest={() => setShowTest(true)} />
        <Consultation />
        <Testimonials />
        <Subscription />
        <Contact />
      </main>
      <Footer />
      {showTest && <ReadinessTest onClose={() => setShowTest(false)} />}
    </div>
  );
}
