import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp, scaleIn } from '../components/PageTransition';
import { Shield, Database, Zap, Award, CheckCircle, AlertTriangle, Lock, Search, Mail, Globe, Sparkles, Fingerprint, Cookie, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LSaveLogo = '/LSave4.png';

const NEW_TOOLS_DISMISSED_KEY = 'lsafe_new_tools_dismissed_v1';

const Index: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();
  const [bannerVisible, setBannerVisible] = useState(
    () => !localStorage.getItem(NEW_TOOLS_DISMISSED_KEY)
  );

  const dismissBanner = () => {
    localStorage.setItem(NEW_TOOLS_DISMISSED_KEY, '1');
    setBannerVisible(false);
  };

  const handleScan = async () => {
    if (!inputUrl.trim()) {
      alert('Please enter a URL to scan');
      return;
    }
    navigate(`/report?url=${encodeURIComponent(inputUrl.trim())}`);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PageSEO
        title="Is This Link Safe? - LSafe URL Security Scanner | Free Link Checker"
        description="Free URL scanner by LSafe. Check if a link is safe, detect phishing, malware, and viruses instantly before you click. Protect yourself from dangerous websites."
      />
      <Navigation />

      {/* ── New Tools Announcement Banner ── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 overflow-hidden"
            style={{ marginTop: '64px' }}
          >
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 text-white">
              <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> NEW
                  </span>
                  <span className="text-sm font-medium">3 new privacy tools just launched:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { to: '/browser-fingerprint', icon: Fingerprint, label: 'Browser Fingerprint' },
                      { to: '/cookie-analyzer', icon: Cookie, label: 'Cookie Analyzer' },
                      { to: '/email-header-analyzer', icon: Mail, label: 'Email Header Analyzer' },
                    ].map(tool => (
                      <Link
                        key={tool.to}
                        to={tool.to}
                        className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
                      >
                        <tool.icon className="w-3 h-3" /> {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <button
                  onClick={dismissBanner}
                  className="shrink-0 p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Modern Mesh Gradient */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated mesh gradient background */}
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        <motion.div 
          className="container mx-auto px-4 relative z-10 py-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo with glow */}
            <motion.div variants={scaleIn} className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-glow"></div>
                <div className="relative glass rounded-3xl p-5 shadow-glow-blue">
                  <img src={LSaveLogo} alt="LSafe Logo" className="h-20 w-20" />
                </div>
              </div>
            </motion.div>
            
            {/* Main Heading with gradient text */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight"
            >
              <span className="text-white">Is This Link </span>
              <span className="gradient-text">Safe?</span>
            </motion.h1>
            
            {/* Subheading with badge */}
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-lg font-medium border border-white/20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                Instant URL Security Scanner
              </span>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Check any URL instantly for <span className="font-semibold text-cyan-300">malware, phishing, spam</span>, and security threats. 
              Get your answer in seconds with enterprise-grade analysis.
            </motion.p>
            
            {/* Modern Scan Input */}
            <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mb-12">
              <div className="glass rounded-2xl p-2 shadow-2xl border border-white/20">
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Paste suspicious URL here..."
                    className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-white placeholder-white/50 text-lg transition-all"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputUrl.trim()) {
                        handleScan();
                      }
                    }}
                  />
                  <motion.button
                    onClick={handleScan}
                    disabled={!inputUrl.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Shield className="w-5 h-5" />
                    Scan Now
                  </motion.button>
                </div>
              </div>
              <p className="text-sm text-white/60 mt-4 flex items-center justify-center gap-4">
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400" /> Free</span>
                <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-yellow-400" /> Instant</span>
                <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-cyan-400" /> No Registration</span>
              </p>
            </motion.div>
            
            {/* Feature Pills - Glassmorphism */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: Lock, text: 'HTTPS Secured' },
                { icon: Database, text: '15+ Security Databases' },
                { icon: Shield, text: 'Zero Data Retention' },
                { icon: Zap, text: 'Real-Time Analysis' },
              ].map((feature, index) => (
                <motion.div 
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-medium text-white/90 hover:bg-white/20 transition-all cursor-default"
                >
                  <feature.icon className="w-4 h-4" />
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Trusted by 100K+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>99.2% accuracy rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>GDPR & CCPA compliant</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Privacy First Banner - Modern */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:via-green-500/20 dark:to-teal-500/20 border-y border-green-200/50 dark:border-green-500/20 py-4 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-green-700 dark:text-green-400">
          <div className="flex items-center justify-center w-8 h-8 bg-green-500/20 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="font-semibold">Privacy First:</span>
          <span className="text-green-600 dark:text-green-300">We analyze URLs without storing them. GDPR & CCPA compliant.</span>
        </div>
      </motion.div>

      {/* ── Privacy & Security Tools Section ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              New Tools — Just Launched
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Privacy & Security <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400">Toolkit</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Free, browser-based tools that protect your privacy. No accounts, no data collection — everything runs locally on your device.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                to: '/browser-fingerprint',
                icon: Fingerprint,
                title: 'Browser Fingerprint Test',
                desc: 'Discover what unique data websites silently collect about you — canvas fingerprint, WebGL, timezone, screen info and more. See your trackability score.',
                gradient: 'from-violet-500 to-purple-600',
                glow: 'shadow-violet-500/20',
                tags: ['Privacy', 'Tracking', 'Digital Identity'],
                badge: 'NEW',
              },
              {
                to: '/cookie-analyzer',
                icon: Cookie,
                title: 'Cookie & Tracker Analyzer',
                desc: 'Paste any website\'s source and instantly detect Google Analytics, Facebook Pixel, session recorders, ad networks, and 24 other known trackers.',
                gradient: 'from-orange-500 to-amber-500',
                glow: 'shadow-orange-500/20',
                tags: ['GDPR', 'Trackers', 'Cookies'],
                badge: 'NEW',
              },
              {
                to: '/email-header-analyzer',
                icon: Mail,
                title: 'Email Header Analyzer',
                desc: 'Detect phishing and email spoofing by verifying SPF, DKIM, and DMARC authentication. Trace the full routing path and identify the origin IP.',
                gradient: 'from-cyan-500 to-blue-600',
                glow: 'shadow-cyan-500/20',
                tags: ['Anti-Phishing', 'SPF/DKIM', 'Email Security'],
                badge: 'NEW',
              },
            ].map((tool, index) => (
              <motion.div
                key={tool.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Link
                  to={tool.to}
                  className={`group block h-full bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-7 transition-all duration-300 shadow-2xl hover:${tool.glow}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`bg-gradient-to-br ${tool.gradient} rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-xs font-bold bg-gradient-to-r from-violet-400 to-cyan-400 text-transparent bg-clip-text border border-violet-400/30 px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
                    {tool.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">{tool.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {tool.tags.map(tag => (
                      <span key={tag} className="text-xs text-white/40 border border-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
                    Try the tool free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How LSafe Protects You - Bento Grid */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              How LSafe <span className="gradient-text">Protects</span> You
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four-step analysis process to ensure every link you check is thoroughly vetted
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Search, title: '1. URL Analysis', desc: 'We analyze the URL structure and domain reputation', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
              { icon: Database, title: '2. Database Check', desc: 'Cross-reference with VirusTotal & Google Safe Browsing', color: 'green', gradient: 'from-green-500 to-emerald-500' },
              { icon: Zap, title: '3. Risk Scoring', desc: 'Calculate threat level using 15+ security signals', color: 'orange', gradient: 'from-orange-500 to-amber-500' },
              { icon: Award, title: '4. Report', desc: 'Get detailed analysis with actionable recommendations', color: 'purple', gradient: 'from-purple-500 to-pink-500' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8 text-center group"
              >
                <div className={`bg-gradient-to-br ${step.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scanner Section - Modern Card */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 border border-gray-200/50 dark:border-gray-700/50"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Is This Link Safe? <span className="gradient-text">Find Out Now!</span>
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Paste any suspicious link below to instantly check if it's safe or dangerous
            </p>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Is this link safe? Paste URL here to find out: https://example.com"
                className="w-full px-6 py-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all text-lg"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button className="absolute right-3 top-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-all"
                onClick={() => {
                  navigator.clipboard.readText().then(text => setInputUrl(text));
                }}
              >
                📋
              </button>
            </div>
            
            <motion.button
              onClick={handleScan}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 rounded-xl transition-all text-lg flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
            >
              <Shield className="w-6 h-6" />
              Check If This Link Is Safe
            </motion.button>

            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                <span>URLs not stored</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Instant results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Calculate Risk Scores - Modern Info Cards */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-500/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4 text-gray-900 dark:text-white">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">ℹ️</span>
              </div>
              How We Calculate <span className="gradient-text">Risk Scores</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-500" />
                  What We Check:
                </h3>
                <ul className="space-y-4">
                  {[
                    'Domain age and registration details',
                    'HTTPS certificate validity',
                    'Redirect behavior and chain length',
                    'Blacklist status across multiple databases',
                    'Lookalike domain detection',
                  ].map((item, index) => (
                    <motion.li 
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Risk Scoring:
                </h3>
                <ul className="space-y-5">
                  {[
                    { color: 'bg-green-500', label: 'Safe (0-20 points)', desc: 'Low risk, generally safe' },
                    { color: 'bg-yellow-500', label: 'Suspicious (21-60 points)', desc: 'Moderate risk, use caution' },
                    { color: 'bg-red-500', label: 'Dangerous (61-100 points)', desc: 'High risk, avoid visiting' },
                  ].map((item, index) => (
                    <motion.li 
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <span className={`w-4 h-4 rounded-full ${item.color} mt-1 flex-shrink-0`}></span>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Privacy Guarantee */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass-card p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Privacy Guarantee:</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We do NOT store, log, or track the URLs you scan. All analysis is performed in real-time and results are only stored locally in your browser. We never visit the actual website content - only metadata is analyzed.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 glass-card p-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-yellow-200/50 dark:border-yellow-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Important Disclaimer:</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This is a risk assessment tool, not a guarantee of safety. Always exercise caution when visiting unfamiliar websites and never enter sensitive information on suspicious sites. LSafe provides analysis based on available data and known security patterns.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How People Use LSafe - Modern Cards */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              How People Use <span className="gradient-text">LSafe</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-world applications for URL security analysis across different user groups
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { emoji: '👨‍💻', title: 'Developers', color: 'yellow', desc: 'Check links before embedding in applications, APIs, or user-generated content systems.', features: ['API integration safety', 'User content validation', 'Third-party link verification'] },
              { icon: Mail, title: 'Email Users', color: 'green', desc: 'Verify suspicious links safely before clicking, especially from unknown senders.', features: ['Phishing protection', 'Spam link detection', 'Safe preview analysis'] },
              { icon: Shield, title: 'Security Teams', color: 'red', desc: 'Perform quick preliminary risk assessments during incident response and investigations.', features: ['Incident response', 'Threat intelligence', 'Risk assessment'] },
              { icon: Globe, title: 'Everyday Users', color: 'blue', desc: 'Avoid phishing and scam websites when browsing, shopping, or clicking shared links.', features: ['Online shopping safety', 'Social media links', 'General web browsing'] },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-8 group hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  {card.emoji ? (
                    <span className="text-3xl">{card.emoji}</span>
                  ) : (
                    <card.icon className={`w-8 h-8 text-${card.color}-600 dark:text-${card.color}-400`} />
                  )}
                </div>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{card.desc}</p>
                <ul className="text-xs text-gray-500 dark:text-gray-500 space-y-2">
                  {card.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-${card.color}-500`}></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Stats - Modern Counter Style */}
          <div className="grid md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto">
            {[
              { value: '99.2%', label: 'Threat Detection Rate', color: 'blue' },
              { value: '<3s', label: 'Average Scan Time', color: 'green' },
              { value: '15+', label: 'Security Sources', color: 'purple' },
              { value: '0', label: 'URLs Logged', color: 'orange' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="text-center"
              >
                <div className={`text-5xl md:text-6xl font-black mb-3 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials - Modern Carousel Style */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Users <span className="gradient-text">Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of users who trust LSafe to protect them from online threats every day
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { initials: 'SK', name: 'Sarah K.', role: 'Marketing Manager', color: 'blue', text: "LSafe saved me from a sophisticated phishing attack. I received an email that looked exactly like it was from my bank, but when I scanned the link, it immediately flagged it as dangerous. Can't recommend it enough!" },
              { initials: 'MR', name: 'Marcus R.', role: 'Full-Stack Developer', color: 'green', text: "As a web developer, I use LSafe to verify every third-party link before embedding it in my clients' websites. The detailed reports help me explain security risks to non-technical clients. Essential tool!" },
              { initials: 'JT', name: 'Jennifer T.', role: 'IT Consultant', color: 'purple', text: "My elderly parents were constantly clicking on suspicious links. I taught them to use LSafe first, and it's been a game-changer. Simple enough for anyone to use, yet powerful enough to catch real threats." },
              { initials: 'DL', name: 'David L.', role: 'E-commerce Owner', color: 'orange', text: "I run an e-commerce business and customers sometimes send me links to competitor products or supplier sites. LSafe helps me verify these links are legitimate before clicking. Fast, accurate, and free!" },
              { initials: 'AP', name: 'Alex P.', role: 'Security Analyst', color: 'red', text: "Working in cybersecurity, I appreciate tools that respect privacy. LSafe's zero-logging policy means I can use it to check URLs without worrying about my browsing history being stored. Exactly what I needed." },
              { initials: 'LM', name: 'Linda M.', role: 'Community Educator', color: 'teal', text: "I teach digital literacy to seniors at our community center. LSafe is now part of our curriculum. The interface is clean and the results are easy to understand. It's made a real difference in their online safety!" },
            ].map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`bg-${testimonial.color}-100 dark:bg-${testimonial.color}-900/30 rounded-full w-14 h-14 flex items-center justify-center`}>
                    <span className={`text-${testimonial.color}-600 dark:text-${testimonial.color}-400 font-bold text-lg`}>{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Resources Section - Modern Bento Cards */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Learn to Stay <span className="gradient-text">Safe</span> Online
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Knowledge is your best defense. Explore our guides and tips to protect yourself from cyber threats.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Security Blog Card */}
            <motion.a 
              href="/blog" 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl p-10 text-white transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <span className="text-4xl">📚</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Security Blog</h3>
                    <p className="opacity-80">In-depth guides & articles</p>
                  </div>
                </div>
                <p className="mb-6 opacity-90 text-lg leading-relaxed">
                  Comprehensive guides on phishing prevention, malware protection, safe shopping, password security, and more.
                </p>
                <div className="flex items-center gap-2 font-bold text-lg">
                  Read Our Guides 
                  <span className="group-hover:translate-x-3 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.a>
            
            {/* Safety Tips Card */}
            <motion.a 
              href="/safety-tips" 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl p-10 text-white transition-all duration-500"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <span className="text-4xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">Safety Tips</h3>
                    <p className="opacity-80">Quick actionable advice</p>
                  </div>
                </div>
                <p className="mb-6 opacity-90 text-lg leading-relaxed">
                  Essential internet safety practices for links, emails, passwords, shopping, social media, and mobile devices.
                </p>
                <div className="flex items-center gap-2 font-bold text-lg">
                  View Safety Tips 
                  <span className="group-hover:translate-x-3 transition-transform duration-300">→</span>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Trust & Security Section - Modern Glass Cards */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Trust <span className="gradient-text">LSafe</span>?
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, color: 'green', gradient: 'from-green-500 to-emerald-600', title: 'Privacy by Design', desc: 'We built LSafe with a zero-logging architecture. Your scanned URLs are never stored, tracked, or shared with anyone. Your security searches remain your business.' },
              { icon: Database, color: 'blue', gradient: 'from-blue-500 to-cyan-600', title: 'Enterprise-Grade Intelligence', desc: 'We aggregate data from 15+ security sources including malware databases, phishing reports, and threat intelligence feeds to provide comprehensive analysis.' },
              { icon: Award, color: 'purple', gradient: 'from-purple-500 to-pink-600', title: 'Free Forever', desc: "Security shouldn't be a luxury. LSafe is completely free to use with no hidden costs, premium tiers, or registration required. Everyone deserves protection." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-10 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Modern Dark */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg"></div>
                  <img src={LSaveLogo} alt="LSafe Logo" className="relative h-12 w-12" />
                </div>
                <span className="text-white font-bold text-2xl">LSafe</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional URL security scanner powered by enterprise-grade threat intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Features</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors">• Real-time URL analysis</li>
                <li className="hover:text-white transition-colors">• Risk assessment scoring</li>
                <li className="hover:text-white transition-colors">• Zero-logging policy</li>
                <li className="hover:text-white transition-colors">• Instant security reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Privacy & Legal</h4>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">• Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">• Terms of Service</a></li>
                <li><a href="/faq" className="text-gray-400 hover:text-white transition-colors">• FAQ</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">• About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Trust Indicators</h4>
              <ul className="space-y-4">
                {[
                  { icon: Lock, text: 'SSL Secured' },
                  { icon: CheckCircle, text: 'No Data Logging' },
                  { icon: Shield, text: 'Enterprise-Grade Analysis' },
                  { icon: Zap, text: 'Real-Time Scanning' },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-green-400" />
                    <span className="text-gray-400">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">© 2026 LSafe. All rights reserved. Built with security in mind.</p>
            <p className="mt-2 text-gray-600">Built by Tarek Elomami</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
