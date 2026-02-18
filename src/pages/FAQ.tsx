import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { Shield, Mail, AlertCircle } from 'lucide-react';

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

const FAQ: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredFaqs = activeFilter === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeFilter);

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="FAQ - Frequently Asked Questions | LSafe URL Scanner"
        description="Find answers to common questions about LSafe URL scanner. Learn how our link checker works, what threats we detect, and how to stay safe online."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl">Find answers to common questions about LSafe, URL security, and online safety.</p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              🔍 All Questions
            </button>
            <button
              onClick={() => setActiveFilter('general')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeFilter === 'general'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              📌 General
            </button>
            <button
              onClick={() => setActiveFilter('security')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeFilter === 'security'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              🛡️ Security
            </button>
            <button
              onClick={() => setActiveFilter('privacy')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeFilter === 'privacy'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              🔒 Privacy
            </button>
            <button
              onClick={() => setActiveFilter('technical')}
              className={`px-6 py-2 rounded-full font-medium transition ${
                activeFilter === 'technical'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              ⚙️ Technical
            </button>
          </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-start gap-3 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Still Need Help?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition">
              <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Security Questions</h3>
              <p className="text-gray-600 mb-4">Have questions about threat detection or security features?</p>
              <a href="mailto:support@lsafe.io" className="text-blue-600 hover:text-blue-700 font-semibold">
                Contact Security Team
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition">
              <Mail className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">General Support</h3>
              <p className="text-gray-600 mb-4">Need help with using LSafe or have general questions?</p>
              <a href="mailto:support@lsafe.io" className="text-blue-600 hover:text-blue-700 font-semibold">
                Get Support
              </a>
            </div>

            <div className="bg-white rounded-lg p-8 text-center border border-gray-200 hover:shadow-lg transition">
              <AlertCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-gray-800">Report Issues</h3>
              <p className="text-gray-600 mb-4">Found a bug or want to report a false positive?</p>
              <a href="mailto:support@lsafe.io" className="text-blue-600 hover:text-blue-700 font-semibold">
                Report Issue
              </a>
            </div>
          </div>

          {/* Contact Box */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Can't Find What You're Looking For?</h3>
            <p className="text-gray-700 mb-6">
              Our team is here to help. Send us your question and we'll get back to you as soon as possible.
            </p>
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto border border-gray-200">
              <p className="font-semibold text-gray-800 mb-2">Contact Email: <a href="mailto:support@lsafe.io" className="text-blue-600">support@lsafe.io</a></p>
              <p className="text-sm text-gray-600 mb-2">For all inquiries: General support, security questions, privacy concerns</p>
              <p className="text-sm text-gray-500">We typically respond within 24-48 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2026 LSafe. All rights reserved. Built with security in mind.</p>
          <p className="text-sm mt-2 text-gray-500">Built by Tarek Elomami</p>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
