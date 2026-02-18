import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { Shield, Database, Zap, Award, CheckCircle, AlertTriangle, Lock, Search, Mail, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LSaveLogo = '/LSave4.png';

const Index: React.FC = () => {
  const [inputUrl, setInputUrl] = useState('');
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!inputUrl.trim()) {
      alert('Please enter a URL to scan');
      return;
    }
    navigate(`/report?url=${encodeURIComponent(inputUrl.trim())}`);
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="Is This Link Safe? - LSafe URL Security Scanner | Free Link Checker"
        description="Free URL scanner by LSafe. Check if a link is safe, detect phishing, malware, and viruses instantly before you click. Protect yourself from dangerous websites."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-24 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
                <img src={LSaveLogo} alt="LSafe Logo" className="h-20 w-20" />
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
              Is This Link <span className="text-yellow-300">Safe?</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-2xl md:text-3xl mb-4 font-semibold text-blue-100">
              ⚡ Instant URL Security Scanner
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Check any URL instantly for <span className="font-semibold text-yellow-200">malware, phishing, spam</span>, and security threats. 
              Get your answer in seconds with enterprise-grade analysis.
            </p>
            
            {/* Quick Scan Input */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="🔍 Paste suspicious URL here... (e.g., https://example.com)"
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-500 text-lg"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && inputUrl.trim()) {
                        handleScan();
                      }
                    }}
                  />
                  <button
                    onClick={handleScan}
                    disabled={!inputUrl.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Shield className="w-5 h-5" />
                    Scan Now
                  </button>
                </div>
              </div>
              <p className="text-sm text-blue-100 mt-3 opacity-80">
                ✓ Free • ✓ Instant Results • ✓ No Registration Required
              </p>
            </div>
            
            {/* Feature Pills - More Compact */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/25 transition-all">
                <Lock className="w-4 h-4" />
                <span>HTTPS Secured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/25 transition-all">
                <Database className="w-4 h-4" />
                <span>15+ Security Databases</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/25 transition-all">
                <Shield className="w-4 h-4" />
                <span>Zero Data Retention</span>
              </div>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/25 transition-all">
                <Zap className="w-4 h-4" />
                <span>Real-Time Analysis</span>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Trusted by 100K+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>99.2% accuracy rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>GDPR & CCPA compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy First Banner */}
      <div className="bg-green-50 border-t border-b border-green-200 py-3 transition-colors duration-200">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-green-800">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Privacy First:</span>
          <span>We analyze URLs without storing them. GDPR & CCPA compliant.</span>
        </div>
      </div>

      {/* How LSafe Protects You */}
      <section className="py-16 bg-gray-50 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How LSafe Protects You</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. URL Analysis</h3>
              <p className="text-gray-600">We analyze the URL structure and domain reputation</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Database className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Database Check</h3>
              <p className="text-gray-600">Cross-reference with VirusTotal & Google Safe Browsing</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Risk Scoring</h3>
              <p className="text-gray-600">Calculate threat level using 15+ security signals</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">4. Report</h3>
              <p className="text-gray-600">Get detailed analysis with actionable recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="py-16 bg-white transition-colors duration-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100 transition-colors duration-200">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Is This Link Safe? Find Out Now!</h2>
            <p className="text-center text-gray-600 mb-8">Paste any suspicious link below to instantly check if it's safe or dangerous</p>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Is this link safe? Paste URL here to find out: https://example.com"
                className="w-full px-6 py-4 rounded-lg border-2 border-gray-300 bg-white focus:border-blue-500 focus:outline-none text-gray-800 placeholder-gray-400"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button className="absolute right-2 top-2 px-4 py-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300 text-gray-700 transition"
                onClick={() => {
                  navigator.clipboard.readText().then(text => setInputUrl(text));
                }}
              >
                📋
              </button>
            </div>
            
            <button
              onClick={handleScan}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition text-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-6 h-6" />
              Check If This Link Is Safe
            </button>

            <div className="flex justify-center gap-6 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <span>URLs not stored</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Calculate Risk Scores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 border border-blue-200">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-blue-900">
              <span>ℹ️</span> How We Calculate Risk Scores
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">What We Check:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-800">Domain age and registration details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-800">HTTPS certificate validity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-800">Redirect behavior and chain length</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-800">Blacklist status across multiple databases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-800">Lookalike domain detection</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Risk Scoring:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-green-500 mt-1"></span>
                    <div>
                      <div className="font-semibold text-gray-900">Safe (0-20 points):</div>
                      <div className="text-sm text-gray-700">Low risk, generally safe</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-yellow-500 mt-1"></span>
                    <div>
                      <div className="font-semibold text-gray-900">Suspicious (21-60 points):</div>
                      <div className="text-sm text-gray-700">Moderate risk, use caution</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-4 h-4 rounded-full bg-red-500 mt-1"></span>
                    <div>
                      <div className="font-semibold text-gray-900">Dangerous (61-100 points):</div>
                      <div className="text-sm text-gray-700">High risk, avoid visiting</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="mt-6 bg-green-50 border border-green-300 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">🛡️</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Guarantee:</h3>
                <p className="text-gray-800">
                  We do NOT store, log, or track the URLs you scan. All analysis is performed in real-time and results are only stored locally in your browser. We never visit the actual website content - only metadata is analyzed.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer:</h3>
                <p className="text-gray-800">
                  This is a risk assessment tool, not a guarantee of safety. Always exercise caution when visiting unfamiliar websites and never enter sensitive information on suspicious sites. LSafe provides analysis based on available data and known security patterns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How People Use LSafe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">How People Use LSafe</h2>
          <p className="text-center text-gray-600 mb-12">Real-world applications for URL security analysis across different user groups</p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Developers</h3>
              <p className="text-gray-600 text-sm mb-4">
                Check links before embedding in applications, APIs, or user-generated content systems.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• API integration safety</li>
                <li>• User content validation</li>
                <li>• Third-party link verification</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Email Users</h3>
              <p className="text-gray-600 text-sm mb-4">
                Verify suspicious links safely before clicking, especially from unknown senders.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Phishing protection</li>
                <li>• Spam link detection</li>
                <li>• Safe preview analysis</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Security Teams</h3>
              <p className="text-gray-600 text-sm mb-4">
                Perform quick preliminary risk assessments during incident response and investigations.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Incident response</li>
                <li>• Threat intelligence</li>
                <li>• Risk assessment</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">Everyday Users</h3>
              <p className="text-gray-600 text-sm mb-4">
                Avoid phishing and scam websites when browsing, shopping, or clicking shared links.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Online shopping safety</li>
                <li>• Social media links</li>
                <li>• General web browsing</li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">99.2%</div>
              <div className="text-gray-600">Threat Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">&lt;3s</div>
              <div className="text-gray-600">Average Scan Time</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Security Sources</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-600 mb-2">0</div>
              <div className="text-gray-600">URLs Logged</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={LSaveLogo} alt="LSafe Logo" className="h-10 w-10" />
                <span className="text-white font-bold text-xl">LSafe</span>
              </div>
              <p className="text-sm text-gray-400">
                Professional URL security scanner powered by enterprise-grade threat intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>• Real-time URL analysis</li>
                <li>• Risk assessment scoring</li>
                <li>• Zero-logging policy</li>
                <li>• Instant security reports</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Privacy & Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy" className="hover:text-white">• Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">• Terms of Service</a></li>
                <li><a href="/faq" className="hover:text-white">• FAQ</a></li>
                <li><a href="/about" className="hover:text-white">• About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Trust Indicators</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>SSL Secured</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No Data Logging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Enterprise-Grade Analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span>Real-Time Scanning</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 LSafe. All rights reserved. Built with security in mind.</p>
            <p className="mt-2 text-gray-500">Built by Tarek Elomami</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
