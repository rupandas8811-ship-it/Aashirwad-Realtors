import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Stats } from '../components/Stats';
import { Partners } from '../components/Partners';
import { BuyerReadiness } from '../components/BuyerReadiness';
import { Consultation } from '../components/Consultation';
import { Testimonials } from '../components/Testimonials';
import { Subscription } from '../components/Subscription';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Partners />
      <BuyerReadiness />
      <Consultation />
      <Testimonials />
      <Subscription />
      <Contact />
    </>
  );
}
