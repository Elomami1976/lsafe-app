import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import { Shield, Mail, AlertCircle, ChevronDown } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const faqs = [
  {
    category: 'general',
    question: 'What is LSafe and how does it work?',
    answer: 'LSafe is a URL security scanner that analyzes links for potential threats using multiple security databases and threat intelligence sources. Simply paste a URL, and we\'ll provide an instant risk assessment with detailed security signals.'
  },
  {
    category: 'privacy',
    question: 'Do you store or log the URLs I scan?',
    answer: 'No. We have a strict zero-logging policy. We do not store, log, or track any URLs you scan. All analysis happens in real-time, and scan results are only stored locally in your browser.'
  },
  {
    category: 'security',
    question: 'How accurate are your security scans?',
    answer: 'Our scans achieve a 99.2% threat detection rate with less than 0.1% false positives. However, no security tool is 100% accurate, and threat landscapes change rapidly. We recommend using LSafe as part of a comprehensive security approach.'
  },
  {
    category: 'technical',
    question: 'What security databases do you use?',
    answer: 'We integrate with 15+ security sources including VirusTotal, Google Safe Browsing, and various threat intelligence feeds. This multi-source approach ensures comprehensive threat detection.'
  },
  {
    category: 'general',
    question: 'Is LSafe free to use?',
    answer: 'Yes! LSafe is completely free to use for everyone. We believe security tools should be accessible to all users without barriers.'
  },
  {
    category: 'technical',
    question: 'How long does a scan take?',
    answer: 'Most scans complete in under 3 seconds. Complex URLs with multiple redirects may take slightly longer, but we optimize for speed without compromising accuracy.'
  },
  {
    category: 'security',
    question: 'What types of threats can you detect?',
    answer: 'We detect malware, phishing attempts, scam sites, suspicious domains, blacklisted URLs, lookalike domains, insecure protocols, and suspicious URL patterns. Our detection capabilities are continuously updated.'
  },
  {
    category: 'privacy',
    question: 'Do you use cookies or tracking?',
    answer: 'We only use essential cookies required for the service to function. We do not use tracking cookies, analytics cookies, or participate in cross-site tracking or behavioral advertising.'
  },
  {
    category: 'technical',
    question: 'Can I scan shortened URLs (bit.ly, tinyurl, etc.)?',
    answer: 'Yes! We automatically expand shortened URLs and analyze the final destination. This helps detect threats hidden behind URL shorteners.'
  },
  {
    category: 'general',
    question: 'What should I do if a safe site is marked as dangerous?',
    answer: 'While rare, false positives can occur. If you believe a site is incorrectly flagged, please report it to support@lsafe.io with details. We investigate all reports promptly.'
  },
  {
    category: 'technical',
    question: 'How often is your threat intelligence updated?',
    answer: 'Our threat intelligence feeds update in real-time. We receive continuous updates from our security partners, ensuring you always get the latest threat information.'
  },
  {
    category: 'privacy',
    question: 'Do you scan the actual website content?',
    answer: 'No. We analyze URL metadata, domain reputation, and security database information only. We never visit or load the actual website content, protecting your privacy and security.'
  },
  {
    category: 'general',
    question: 'Are you GDPR and CCPA compliant?',
    answer: 'Yes. Our zero-logging architecture and privacy-first design make us compliant with GDPR, CCPA, and other major privacy regulations by default.'
  },
  {
    category: 'technical',
    question: 'Can I use LSafe for commercial purposes?',
    answer: 'Yes. LSafe can be used for both personal and commercial purposes. For enterprise integrations or API access, please contact us at support@lsafe.io.'
  },
  {
    category: 'technical',
    question: 'What browsers are supported?',
    answer: 'LSafe works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. We recommend keeping your browser updated for the best experience.'
  }
];

const categoryColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  general: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/30', darkText: 'dark:text-blue-400' },
  security: { bg: 'bg-green-100', text: 'text-green-700', darkBg: 'dark:bg-green-900/30', darkText: 'dark:text-green-400' },
  privacy: { bg: 'bg-purple-100', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/30', darkText: 'dark:text-purple-400' },
  technical: { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/30', darkText: 'dark:text-orange-400' },
};

const FAQ: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaqs = activeFilter === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFilter);

  const filterButtons = [
    { key: 'all', label: 'All Questions', emoji: '🔍' },
    { key: 'general', label: 'General', emoji: '📌' },
    { key: 'security', label: 'Security', emoji: '🛡️' },
    { key: 'privacy', label: 'Privacy', emoji: '🔒' },
    { key: 'technical', label: 'Technical', emoji: '⚙️' },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PageSEO
        title="FAQ - Frequently Asked Questions | LSafe URL Scanner"
        description="Find answers to common questions about LSafe URL scanner. Learn how our link checker works, what threats we detect, and how to stay safe online."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-black mb-6 text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-white/80 max-w-2xl mx-auto">
            Find answers to common questions about LSafe, URL security, and online safety.
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-30 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {filterButtons.map((btn) => (
              <motion.button
                key={btn.key}
                onClick={() => setActiveFilter(btn.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                  activeFilter === btn.key
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                    : 'glass text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/50'
                }`}
              >
                {btn.emoji} {btn.label}
              </motion.button>
            ))}
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFaqs.map((faq, index) => {
                const colors = categoryColors[faq.category];
                const isExpanded = expandedIndex === index;
                
                return (
                  <motion.div
                    key={`${faq.category}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full p-6 text-left flex items-start gap-4"
                    >
                      <div className="flex-1">
                        <span className={`inline-block px-3 py-1 ${colors.bg} ${colors.darkBg} ${colors.text} ${colors.darkText} text-xs font-semibold rounded-full mb-3`}>
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{faq.question}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Still Need <span className="gradient-text">Help</span>?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, color: 'blue', gradient: 'from-blue-500 to-cyan-500', title: 'Security Questions', desc: 'Have questions about threat detection or security features?', link: 'Contact Security Team' },
              { icon: Mail, color: 'green', gradient: 'from-green-500 to-emerald-500', title: 'General Support', desc: 'Need help with using LSafe or have general questions?', link: 'Get Support' },
              { icon: AlertCircle, color: 'orange', gradient: 'from-orange-500 to-amber-500', title: 'Report Issues', desc: 'Found a bug or want to report a false positive?', link: 'Report Issue' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-10 text-center group"
              >
                <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{item.desc}</p>
                <a href="mailto:support@lsafe.io" className="font-bold gradient-text hover:opacity-80 transition-opacity">
                  {item.link}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 glass-card p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-500/20 text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Can't Find What You're Looking For?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Send us your question and we'll get back to you as soon as possible.
            </p>
            <div className="glass p-6 max-w-2xl mx-auto rounded-2xl">
              <p className="font-bold text-gray-900 dark:text-white mb-3">
                Contact Email: <a href="mailto:support@lsafe.io" className="gradient-text">support@lsafe.io</a>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">For all inquiries: General support, security questions, privacy concerns</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">We typically respond within 24-48 hours</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">© 2026 LSafe. All rights reserved. Built with security in mind.</p>
          <p className="mt-2 text-gray-600">Built by Tarek Elomami</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default FAQ;
