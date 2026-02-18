import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import Index from './pages/Index';
import About from './pages/About';

import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Report from './pages/Report';

/**
 * Pauses AdSense ads on every route change.  Each page is responsible for
 * resuming ads via <AdSenseControl enabled={true} /> once its content has
 * rendered.  This eliminates the flash of ads on blank transition screens.
 */
const PauseAdsOnNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    try {
      if (!window.adsbygoogle) {
        (window as any).adsbygoogle = [];
      }
      (window.adsbygoogle as any).pauseAdRequests = 1;
    } catch (_) {}
  }, [location.pathname]);

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <PauseAdsOnNavigate>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </PauseAdsOnNavigate>
      </Router>
    </ThemeProvider>
  );
};

export default App;
