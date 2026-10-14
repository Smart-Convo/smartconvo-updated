import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AboutPage from './pages/About.tsx';
import ContactPage from './pages/Contact.tsx';
import IndustriesPage from './pages/Industries.tsx';
import PrivacyPolicyPage from './pages/PrivacyPolicy.tsx';
import TermsPage from './pages/Terms.tsx';

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<App><AboutPage /></App>} />
      <Route path="/contact" element={<App><ContactPage /></App>} />
      <Route path="/industries" element={<App><IndustriesPage /></App>} />
      <Route path="/privacy-policy" element={<App><PrivacyPolicyPage /></App>} />
      <Route path="/terms-and-conditions" element={<App><TermsPage /></App>} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}
