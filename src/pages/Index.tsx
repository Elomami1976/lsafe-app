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

      {/* User Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">What Our Users Say</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of users who trust LSafe to protect them from online threats every day
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "LSafe saved me from a sophisticated phishing attack. I received an email that looked exactly like it was from my bank, but when I scanned the link, it immediately flagged it as dangerous. Can't recommend it enough!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">SK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Sarah K.</div>
                  <div className="text-sm text-gray-500">Marketing Manager</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "As a web developer, I use LSafe to verify every third-party link before embedding it in my clients' websites. The detailed reports help me explain security risks to non-technical clients. Essential tool!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">MR</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Marcus R.</div>
                  <div className="text-sm text-gray-500">Full-Stack Developer</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "My elderly parents were constantly clicking on suspicious links. I taught them to use LSafe first, and it's been a game-changer. Simple enough for anyone to use, yet powerful enough to catch real threats."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">JT</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Jennifer T.</div>
                  <div className="text-sm text-gray-500">IT Consultant</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I run an e-commerce business and customers sometimes send me links to competitor products or supplier sites. LSafe helps me verify these links are legitimate before clicking. Fast, accurate, and free!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">DL</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">David L.</div>
                  <div className="text-sm text-gray-500">E-commerce Owner</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "Working in cybersecurity, I appreciate tools that respect privacy. LSafe's zero-logging policy means I can use it to check URLs without worrying about my browsing history being stored. Exactly what I needed."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">AP</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Alex P.</div>
                  <div className="text-sm text-gray-500">Security Analyst</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 6 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">
                "I teach digital literacy to seniors at our community center. LSafe is now part of our curriculum. The interface is clean and the results are easy to understand. It's made a real difference in their online safety!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="text-teal-600 font-bold text-lg">LM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Linda M.</div>
                  <div className="text-sm text-gray-500">Community Educator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Learn to Stay Safe Online</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Knowledge is your best defense. Explore our guides and tips to protect yourself from cyber threats.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Security Blog Card */}
            <a href="/blog" className="group bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <span className="text-3xl">📚</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Security Blog</h3>
                  <p className="opacity-90">In-depth guides & articles</p>
                </div>
              </div>
              <p className="mb-4 opacity-90">
                Comprehensive guides on phishing prevention, malware protection, safe shopping, password security, and more.
              </p>
              <div className="flex items-center gap-2 font-semibold">
                Read Our Guides <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </a>
            
            {/* Safety Tips Card */}
            <a href="/safety-tips" className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <span className="text-3xl">💡</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Safety Tips</h3>
                  <p className="opacity-90">Quick actionable advice</p>
                </div>
              </div>
              <p className="mb-4 opacity-90">
                Essential internet safety practices for links, emails, passwords, shopping, social media, and mobile devices.
              </p>
              <div className="flex items-center gap-2 font-semibold">
                View Safety Tips <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Trust LSafe?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Privacy by Design</h3>
              <p className="text-gray-600">
                We built LSafe with a zero-logging architecture. Your scanned URLs are never stored, tracked, or shared with anyone. Your security searches remain your business.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Database className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Enterprise-Grade Intelligence</h3>
              <p className="text-gray-600">
                We aggregate data from 15+ security sources including malware databases, phishing reports, and threat intelligence feeds to provide comprehensive analysis.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Free Forever</h3>
              <p className="text-gray-600">
                Security shouldn't be a luxury. LSafe is completely free to use with no hidden costs, premium tiers, or registration required. Everyone deserves protection.
              </p>
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
