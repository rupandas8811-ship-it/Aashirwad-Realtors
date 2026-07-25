import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { BuildersPage } from './pages/BuildersPage';
import { ReadinessTestPage } from './pages/ReadinessTestPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { ContactPage } from './pages/ContactPage';
import { Admin } from './components/Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="builders" element={<BuildersPage />} />
        <Route path="readiness-test" element={<ReadinessTestPage />} />
        <Route path="subscription" element={<SubscriptionPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
