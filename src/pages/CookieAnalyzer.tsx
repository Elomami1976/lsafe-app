import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import {
  Cookie, Search, AlertTriangle, CheckCircle, Eye, BarChart2,
  Shield, Database, Globe, X,
} from 'lucide-react';

// ── Known tracker signatures ──────────────────────────────────────────────────
const TRACKERS = [
  { pattern: /google-analytics\.com|googletagmanager\.com|gtag\/js/i, name: 'Google Analytics / GTM', category: 'Analytics', risk: 'medium' as const, company: 'Google', desc: 'Tracks visits, page views, and user behavior.' },
  { pattern: /connect\.facebook\.net|fbevents\.js|facebook\.com\/tr/i, name: 'Facebook Pixel', category: 'Advertising', risk: 'high' as const, company: 'Meta', desc: 'Tracks conversions and retargets ads across Facebook.' },
  { pattern: /doubleclick\.net|googlesyndication\.com/i, name: 'Google Ads / DoubleClick', category: 'Advertising', risk: 'high' as const, company: 'Google', desc: 'Serves and tracks display advertising.' },
  { pattern: /static\.hotjar\.com/i, name: 'Hotjar', category: 'Analytics', risk: 'medium' as const, company: 'Hotjar', desc: 'Records screen sessions and heatmaps.' },
  { pattern: /widget\.intercom\.io|js\.intercom\.com/i, name: 'Intercom', category: 'Customer Support', risk: 'low' as const, company: 'Intercom', desc: 'Live chat and customer messaging.' },
  { pattern: /js\.hs-scripts\.com|hubspot\.com/i, name: 'HubSpot', category: 'Marketing', risk: 'medium' as const, company: 'HubSpot', desc: 'Marketing automation and CRM tracking.' },
  { pattern: /cdn\.mxpnl\.com|mixpanel\.com/i, name: 'Mixpanel', category: 'Analytics', risk: 'medium' as const, company: 'Mixpanel', desc: 'Product analytics and user event tracking.' },
  { pattern: /cdn\.segment\.com|segment\.io/i, name: 'Segment', category: 'Analytics', risk: 'medium' as const, company: 'Twilio Segment', desc: 'Customer data platform routing data to many destinations.' },
  { pattern: /cdn\.amplitude\.com|amplitude\.com\/libs/i, name: 'Amplitude', category: 'Analytics', risk: 'medium' as const, company: 'Amplitude', desc: 'Product analytics and behavioral tracking.' },
  { pattern: /edge\.fullstory\.com/i, name: 'FullStory', category: 'Session Recording', risk: 'high' as const, company: 'FullStory', desc: 'Records full session replays including keystrokes.' },
  { pattern: /cdn\.heapanalytics\.com/i, name: 'Heap', category: 'Analytics', risk: 'medium' as const, company: 'Heap', desc: 'Automatically captures all user interactions.' },
  { pattern: /analytics\.tiktok\.com|tiktokcdn\.com/i, name: 'TikTok Pixel', category: 'Advertising', risk: 'high' as const, company: 'ByteDance', desc: 'Tracks conversions for TikTok ads.' },
  { pattern: /ads-twitter\.com|analytics\.twitter\.com/i, name: 'Twitter / X Ads', category: 'Advertising', risk: 'high' as const, company: 'X (Twitter)', desc: 'Tracks conversions and engagement for Twitter ads.' },
  { pattern: /snap\.licdn\.com|linkedin\.com\/insight/i, name: 'LinkedIn Insight Tag', category: 'Advertising', risk: 'medium' as const, company: 'Microsoft', desc: 'Conversion tracking and retargeting for LinkedIn ads.' },
  { pattern: /ct\.pinterest\.com/i, name: 'Pinterest Tag', category: 'Advertising', risk: 'medium' as const, company: 'Pinterest', desc: 'Tracks conversions for Pinterest ads.' },
  { pattern: /sc-static\.net|snapchat\.com\/landing/i, name: 'Snap Pixel', category: 'Advertising', risk: 'high' as const, company: 'Snap Inc.', desc: 'Conversion tracking for Snapchat ads.' },
  { pattern: /clarity\.ms/i, name: 'Microsoft Clarity', category: 'Analytics', risk: 'medium' as const, company: 'Microsoft', desc: 'Heatmaps and session recording by Microsoft.' },
  { pattern: /browser\.sentry-cdn\.com|sentry\.io/i, name: 'Sentry', category: 'Error Tracking', risk: 'low' as const, company: 'Sentry', desc: 'Error monitoring — may capture user context on errors.' },
  { pattern: /cdn\.cookielaw\.org|onetrust/i, name: 'OneTrust / CookieLaw', category: 'Consent Management', risk: 'low' as const, company: 'OneTrust', desc: 'Cookie consent banner.' },
  { pattern: /api\.moatads\.com/i, name: 'MOAT Analytics', category: 'Advertising', risk: 'high' as const, company: 'Oracle', desc: 'Ad verification and attention analytics.' },
  { pattern: /bat\.bing\.com/i, name: 'Microsoft Advertising (UET)', category: 'Advertising', risk: 'medium' as const, company: 'Microsoft', desc: 'Universal Event Tracking for Bing Ads.' },
  { pattern: /crazyegg\.com/i, name: 'Crazy Egg', category: 'Session Recording', risk: 'medium' as const, company: 'Crazy Egg', desc: 'Heatmaps and session recordings.' },
  { pattern: /cdn\.taboola\.com/i, name: 'Taboola', category: 'Advertising', risk: 'high' as const, company: 'Taboola', desc: 'Content recommendation and native advertising network.' },
  { pattern: /cdn\.outbrain\.com/i, name: 'Outbrain', category: 'Advertising', risk: 'high' as const, company: 'Outbrain', desc: 'Content discovery and native advertising.' },
];

type Risk = 'high' | 'medium' | 'low';

const RISK_BADGE: Record<Risk, string> = {
  high: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700',
  medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700',
  low: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700',
};

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  'Advertising': <Globe className="w-4 h-4 text-red-400" />,
  'Analytics': <BarChart2 className="w-4 h-4 text-blue-400" />,
  'Session Recording': <Eye className="w-4 h-4 text-purple-400" />,
  'Marketing': <BarChart2 className="w-4 h-4 text-orange-400" />,
  'Customer Support': <Shield className="w-4 h-4 text-green-400" />,
  'Error Tracking': <AlertTriangle className="w-4 h-4 text-yellow-400" />,
  'Consent Management': <CheckCircle className="w-4 h-4 text-teal-400" />,
};

interface StorageData {
  cookies: string[];
  localStorageItems: { key: string; size: number }[];
  sessionStorageItems: { key: string; size: number }[];
}

const CookieAnalyzer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browser' | 'source'>('browser');
  const [htmlSource, setHtmlSource] = useState('');
  const [detected, setDetected] = useState<(typeof TRACKERS[0])[] | null>(null);
  const [storageData, setStorageData] = useState<StorageData>({ cookies: [], localStorageItems: [], sessionStorageItems: [] });

  useEffect(() => {
    const cookies = document.cookie ? document.cookie.split(';').map(c => c.trim()).filter(Boolean) : [];
    const ls: StorageData['localStorageItems'] = [];
    const ss: StorageData['sessionStorageItems'] = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)!;
        ls.push({ key, size: (localStorage.getItem(key) ?? '').length });
      }
    } catch { /* blocked */ }
    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)!;
        ss.push({ key, size: (sessionStorage.getItem(key) ?? '').length });
      }
    } catch { /* blocked */ }
    setStorageData({ cookies, localStorageItems: ls, sessionStorageItems: ss });
  }, []);

  const analyzeSource = () => {
    const found = TRACKERS.filter(t => t.pattern.test(htmlSource));
    setDetected(found);
  };

  const riskCounts = detected ? {
    high: detected.filter(t => t.risk === 'high').length,
    medium: detected.filter(t => t.risk === 'medium').length,
    low: detected.filter(t => t.risk === 'low').length,
  } : null;

  const categoryGroups = detected
    ? detected.reduce<Record<string, typeof TRACKERS>>((acc, t) => {
        if (!acc[t.category]) acc[t.category] = [];
        acc[t.category].push(t);
        return acc;
      }, {})
    : {};

  const overallRisk = riskCounts
    ? riskCounts.high >= 3 ? 'Highly Invasive' : riskCounts.high >= 1 ? 'Invasive' : riskCounts.medium >= 3 ? 'Moderate Tracking' : riskCounts.medium >= 1 ? 'Some Tracking' : 'Minimal Tracking'
    : '';

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
    >
      <PageSEO
        title="Cookie & Tracker Analyzer — Detect Website Trackers | LSafe"
        description="Free cookie and tracker analyzer. Detect Google Analytics, Facebook Pixel, advertising trackers, session recorders and privacy risks on any website. GDPR tracker checker."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <Cookie className="w-14 h-14 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Cookie & Tracker <span className="text-yellow-200">Analyzer</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Expose hidden trackers on any website. Paste the page source to reveal who's watching your visitors
            and why.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
          {(['browser', 'source'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'browser' ? '🖥️ Your Browser Storage' : '🔍 Analyze Page Source'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'browser' && (
            <motion.div key="browser" variants={staggerContainer} initial="initial" animate="animate" exit={{ opacity: 0 }}>

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Cookies', value: storageData.cookies.length, color: 'orange' },
                  { label: 'LocalStorage', value: storageData.localStorageItems.length, color: 'blue' },
                  { label: 'SessionStorage', value: storageData.sessionStorageItems.length, color: 'purple' },
                ].map(item => (
                  <motion.div key={item.label} variants={fadeInUp} className="glass-card p-6 text-center">
                    <div className={`text-4xl font-black text-${item.color}-500 mb-1`}>{item.value}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Cookies */}
              <motion.div variants={fadeInUp} className="glass-card p-6 mb-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-orange-500" />
                  Cookies on this domain ({storageData.cookies.length})
                </h2>
                {storageData.cookies.length > 0 ? (
                  <div className="space-y-2">
                    {storageData.cookies.map((c, i) => (
                      <div key={i} className="font-mono text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 break-all">
                        {c}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No cookies found for this domain. LSafe intentionally uses zero tracking cookies.
                  </p>
                )}
              </motion.div>

              {/* LocalStorage & SessionStorage */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {(['localStorageItems', 'sessionStorageItems'] as const).map(storeKey => {
                  const items = storageData[storeKey];
                  const label = storeKey === 'localStorageItems' ? 'LocalStorage' : 'SessionStorage';
                  return (
                    <motion.div key={storeKey} variants={fadeInUp} className="glass-card p-6">
                      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                        {label} ({items.length} items)
                      </h2>
                      {items.length > 0 ? (
                        <div className="space-y-1.5 max-h-48 overflow-y-auto">
                          {items.map(item => (
                            <div key={item.key} className="flex justify-between text-sm py-1.5 border-b border-gray-100 dark:border-gray-700 last:border-0">
                              <span className="font-mono text-gray-700 dark:text-gray-300 truncate mr-2">{item.key}</span>
                              <span className="text-gray-400 shrink-0">{item.size} chars</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No data found.</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div variants={fadeInUp} className="glass-card p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Browser restriction:</strong> JavaScript can only read cookies for the current domain.
                    To detect trackers on <em>any</em> website, switch to the <strong>Analyze Page Source</strong> tab,
                    paste the site's HTML source (Ctrl+U in Chrome/Firefox), and click Analyze.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'source' && (
            <motion.div key="source" variants={staggerContainer} initial="initial" animate="animate" exit={{ opacity: 0 }}>

              {/* Input */}
              <motion.div variants={fadeInUp} className="glass-card p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Paste any website's HTML source</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Open the website you want to inspect → Press <kbd className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">Ctrl+U</kbd> (or Cmd+U on Mac) → Select All → Paste below
                </p>
                <textarea
                  value={htmlSource}
                  onChange={e => setHtmlSource(e.target.value)}
                  placeholder="Paste the full HTML source code of any website here..."
                  className="w-full h-44 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-orange-400 dark:focus:border-orange-500 focus:outline-none text-sm font-mono text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-y"
                />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={analyzeSource}
                    disabled={!htmlSource.trim()}
                    className="flex-1 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" /> Analyze for Trackers
                  </motion.button>
                  {htmlSource && (
                    <button
                      onClick={() => { setHtmlSource(''); setDetected(null); }}
                      className="px-5 py-3.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Results */}
              <AnimatePresence>
                {detected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    variants={staggerContainer}
                  >
                    {/* Risk summary */}
                    <div className={`glass-card p-5 mb-6 border ${
                      (riskCounts?.high ?? 0) >= 2 ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/10' :
                      (riskCounts?.high ?? 0) >= 1 ? 'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10' :
                      'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                    }`}>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-gray-900 dark:text-white">{overallRisk}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{detected.length} trackers detected across {Object.keys(categoryGroups).length} categories</p>
                        </div>
                        <div className="flex gap-3">
                          {riskCounts && (
                            <>
                              <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">{riskCounts.high} High</span>
                              <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">{riskCounts.medium} Med</span>
                              <span className="text-sm font-bold px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">{riskCounts.low} Low</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {detected.length === 0 ? (
                      <div className="glass-card p-12 text-center">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Known Trackers Found</h3>
                        <p className="text-gray-500 dark:text-gray-400">This page appears to be free from the {TRACKERS.length} known tracking scripts in our database.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {Object.entries(categoryGroups).sort(([, a], [, b]) => b.length - a.length).map(([category, trackers]) => (
                          <motion.div key={category} variants={fadeInUp} className="glass-card p-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                              {CATEGORY_ICON[category] ?? <Database className="w-4 h-4 text-gray-400" />}
                              {category}
                              <span className="ml-auto text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">{trackers.length}</span>
                            </h3>
                            <div className="space-y-3">
                              {trackers.map(t => (
                                <div key={t.name} className="flex items-start justify-between gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                  <div className="min-w-0">
                                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">by {t.company} — {t.desc}</div>
                                  </div>
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${RISK_BADGE[t.risk]}`}>
                                    {t.risk.toUpperCase()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <motion.div variants={fadeInUp} className="mt-6 glass-card p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-500/20">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-green-700 dark:text-green-400">
                          <strong>Privacy Note:</strong> The HTML source you paste is analyzed entirely in your browser.
                          It is never uploaded to our servers.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tracker database info */}
              {detected === null && (
                <motion.div variants={fadeInUp} className="glass-card p-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4 text-orange-500" />
                    Our Tracker Database ({TRACKERS.length} known trackers)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {TRACKERS.map(t => (
                      <span key={t.name} className={`text-xs px-2.5 py-1 rounded-full font-medium ${RISK_BADGE[t.risk]}`}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CookieAnalyzer;
