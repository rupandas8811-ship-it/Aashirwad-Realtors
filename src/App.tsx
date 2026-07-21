/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { FeaturedProperties } from './components/FeaturedProperties';
import { Partners } from './components/Partners';
import { BuyerReadiness } from './components/BuyerReadiness';
import { Consultation } from './components/Consultation';
import { Resources } from './components/Resources';
import { Testimonials } from './components/Testimonials';
import { Subscription } from './components/Subscription';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-navy-900 scroll-smooth">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <FeaturedProperties />
        <Partners />
        <BuyerReadiness />
        <Consultation />
        <Resources />
        <Testimonials />
        <Subscription />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
