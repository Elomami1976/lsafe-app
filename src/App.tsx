import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Index from './pages/Index';
import About from './pages/About';

import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Report from './pages/Report';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SafetyTips from './pages/SafetyTips';
import BrowserFingerprint from './pages/BrowserFingerprint';
import CookieAnalyzer from './pages/CookieAnalyzer';
import EmailHeaderAnalyzer from './pages/EmailHeaderAnalyzer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/report" element={<Report />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/safety-tips" element={<SafetyTips />} />
          <Route path="/browser-fingerprint" element={<BrowserFingerprint />} />
          <Route path="/cookie-analyzer" element={<CookieAnalyzer />} />
          <Route path="/email-header-analyzer" element={<EmailHeaderAnalyzer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
