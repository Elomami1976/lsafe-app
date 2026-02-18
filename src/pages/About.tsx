import React from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { Shield, Users, Globe, CheckCircle, Database, Zap, Lock, TrendingUp, Award } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="About LSafe - Our Mission to Make the Web Safer"
        description="Learn about LSafe, the free URL security scanner. Our mission is to protect users from phishing, malware, and online threats with real-time link checking."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={LSaveLogo} alt="LSafe Logo" className="h-20 w-20 bg-white rounded-2xl p-3" />
          </div>
          <h1 className="text-5xl font-bold mb-6">About LSafe</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're dedicated to making the internet safer by providing enterprise-grade URL security analysis that's accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white transition-colors duration-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Mission</h2>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-4xl mx-auto">
            In an era where cyber threats are constantly evolving, LSafe stands as your first line of defense against malicious URLs. We believe everyone deserves access to professional-grade security tools without compromising their privacy.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Security First</h3>
              <p className="text-gray-600">
                We prioritize your security and privacy above all else, using industry-leading threat intelligence to protect you from online dangers.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">User-Centric</h3>
              <p className="text-gray-600">
                Our tools are designed with real users in mind - simple, fast, and effective without requiring technical expertise.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-lg transition">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">Global Impact</h3>
              <p className="text-gray-600">
                We're building a safer internet for everyone, one URL scan at a time, protecting users worldwide from cyber threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-gray-50 transition-colors duration-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What We Do</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Advanced Threat Detection</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Real-Time Analysis</div>
                    <div className="text-gray-600 text-sm">
                      Instant URL scanning using multiple security databases and threat intelligence sources.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Multi-Layer Security</div>
                    <div className="text-gray-600 text-sm">
                      Comprehensive checks including malware detection, phishing analysis, and domain reputation.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-800">Privacy Protection</div>
                    <div className="text-gray-600 text-sm">
                      Zero logging policy - we never store, track, or share the URLs you scan.
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Security Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700">Threat Detection Rate</span>
                  <span className="text-green-600 font-bold text-lg">99.2%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700">False Positive Rate</span>
                  <span className="text-blue-600 font-bold text-lg">&lt;0.1%</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-700">Average Scan Time</span>
                  <span className="text-purple-600 font-bold text-lg">&lt;3 seconds</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Security Databases</span>
                  <span className="text-orange-600 font-bold text-lg">15+ Sources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Scanning Technology</h2>
          
          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 text-center">
              LSafe uses a comprehensive multi-layered approach to analyze URLs and detect potential security threats. Our technology combines advanced algorithms, threat intelligence databases, and real-time analysis to provide accurate security assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-600" />
                How Our Scanner Works
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">1. DNS & Domain Analysis</h4>
                  <p className="text-gray-700 text-sm">
                    We check domain registration, age, SSL certificates, and DNS records to verify legitimacy.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">2. Pattern Recognition</h4>
                  <p className="text-gray-700 text-sm">
                    Advanced algorithms detect suspicious patterns like phishing keywords, IP addresses instead of domains, and URL obfuscation techniques.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">3. Threat Intelligence</h4>
                  <p className="text-gray-700 text-sm">
                    Cross-reference with multiple security databases including Google Safe Browsing, VirusTotal, and other threat feeds.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">4. Risk Scoring</h4>
                  <p className="text-gray-700 text-sm">
                    Calculate a comprehensive risk score based on multiple security factors to provide clear safety ratings.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                What We Check For
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Phishing & Fraud</div>
                    <p className="text-gray-700 text-sm">Fake login pages, impersonation sites, and social engineering attacks</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Malware Distribution</div>
                    <p className="text-gray-700 text-sm">Sites hosting viruses, trojans, ransomware, and other malicious software</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Suspicious URLs</div>
                    <p className="text-gray-700 text-sm">Shortened links, suspicious patterns, and potentially harmful redirects</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Domain Reputation</div>
                    <p className="text-gray-700 text-sm">Check domain age, registration details, and historical security incidents</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-semibold text-gray-800">Security Best Practices</div>
                    <p className="text-gray-700 text-sm">HTTPS encryption, valid SSL certificates, and secure configurations</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Database className="w-16 h-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Threat Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Real-time feeds from multiple security vendors and research organizations.
              </p>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Zap className="w-16 h-16 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Fast Processing</h3>
              <p className="text-gray-600 text-sm">
                Optimized algorithms for lightning-fast URL analysis and risk assessment.
              </p>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <Lock className="w-16 h-16 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Privacy by Design</h3>
              <p className="text-gray-600 text-sm">
                Built from the ground up with privacy protection as a core principle.
              </p>
            </div>

            <div className="text-center bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">
                <TrendingUp className="w-16 h-16 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Continuous Learning</h3>
              <p className="text-gray-600 text-sm">
                Our systems continuously adapt to new threats and attack patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Commitment</h2>
          
          <div className="bg-white rounded-lg p-12 shadow-lg text-center border border-gray-200">
            <div className="flex justify-center mb-6">
              <Award className="w-20 h-20 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Trusted Security, Transparent Operations</h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              We're committed to providing honest, reliable security assessments without false claims or misleading metrics. Our goal is to earn your trust through consistent, accurate results and complete transparency about our capabilities and limitations.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <h4 className="font-bold text-xl mb-2 text-gray-800">No False Claims</h4>
                <p className="text-gray-600 text-sm">
                  We provide honest assessments based on available data, not marketing hype.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xl mb-2 text-gray-800">Open About Limitations</h4>
                <p className="text-gray-600 text-sm">
                  We clearly explain what our scans can and cannot detect.
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xl mb-2 text-gray-800">Continuous Improvement</h4>
                <p className="text-gray-600 text-sm">
                  We constantly work to improve our detection capabilities and user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Get in Touch</h2>
          <p className="text-lg text-gray-700 mb-8">
            Have questions about LSafe or need help with URL security? We're here to help make the internet safer for everyone.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Contact Us</h3>
            <p className="text-gray-700 mb-4">For all inquiries, support, and questions:</p>
            <a 
              href="mailto:support@lsafe.io" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              support@lsafe.io
            </a>
            <p className="text-gray-600 text-sm mt-4">We typically respond within 24-48 hours</p>
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

export default About;
