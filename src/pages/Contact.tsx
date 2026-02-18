import React from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { Mail, MessageSquare, CheckCircle, Clock, Shield, AlertTriangle, Globe } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const Contact: React.FC = () => {

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="Contact Us - LSafe URL Security Scanner"
        description="Get in touch with the LSafe team. Contact us for support, feedback, or questions about our free URL security scanner."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img src={LSaveLogo} alt="LSafe Logo" className="h-20 w-20 bg-white rounded-2xl p-3" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions about LSafe or need help with URL security? We're here to help make the internet safer for everyone.
          </p>
        </div>
      </section>

      {/* Contact Information Banner */}
      <div className="bg-green-50 border-t border-b border-green-200 py-4 transition-colors duration-200">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-green-800">
          <Mail className="w-6 h-6" />
          <p className="font-semibold">
            Email us: <a href="mailto:support@lsafe.io" className="underline hover:text-green-900 dark:hover:text-green-100">support@lsafe.io</a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 rounded-lg p-3">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Email Support</h3>
                    <a href="mailto:support@lsafe.io" className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                      support@lsafe.io
                    </a>
                    <p className="text-sm text-gray-600 mt-2">
                      For all inquiries, support requests, and general questions
                    </p>
                  </div>
                </div>
              </div>



              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-600 rounded-lg p-3">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">Response Time</h3>
                    <p className="text-gray-700">
                      We typically respond within <strong>24-48 hours</strong>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      During business hours: Monday - Friday, 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 transition-colors duration-200">
              <h3 className="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                Quick Answers
              </h3>
              <p className="text-gray-600 mb-4">
                Looking for immediate answers? Check our FAQ page for commonly asked questions.
              </p>
              <a 
                href="/faq" 
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                View FAQ
              </a>
            </div>
          </div>

        {/* What You Can Contact Us About */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Can We Help You With?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Technical Support
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• URL scanning issues</li>
                <li>• Browser compatibility</li>
                <li>• API integration questions</li>
                <li>• Performance concerns</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                General Inquiries
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• How LSafe works</li>
                <li>• Feature requests</li>
                <li>• Partnership opportunities</li>
                <li>• Press and media</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-3 text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                Privacy & Security
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Data protection questions</li>
                <li>• GDPR/CCPA compliance</li>
                <li>• Security audits</li>
                <li>• Privacy policy clarification</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Report a Threat Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Report a Security Threat</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Found a malicious URL or want to report a false positive? Your contributions help us improve threat detection and keep the internet safer for everyone.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Report a Malicious URL</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If you've found a URL distributing malware, phishing for credentials, or engaging in other malicious activities, please report it to us so we can update our threat databases and protect other users.
                  </p>
                  <a href="mailto:support@lsafe.io?subject=Malicious%20URL%20Report" className="text-red-600 hover:text-red-700 font-medium text-sm">
                    Report via Email →
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Report a False Positive</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If a legitimate website has been incorrectly flagged as dangerous by our scanner, let us know. We investigate all false positive reports and update our detection algorithms accordingly.
                  </p>
                  <a href="mailto:support@lsafe.io?subject=False%20Positive%20Report" className="text-green-600 hover:text-green-700 font-medium text-sm">
                    Report via Email →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Trust LSafe */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Trust LSafe?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Zero Data Logging</h3>
              <p className="text-sm text-gray-600">We never store, track, or log the URLs you scan. Your browsing activity remains completely private.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Free & Accessible</h3>
              <p className="text-sm text-gray-600">Our URL security scanner is free for everyone. No registration, no subscription, no hidden costs.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Continuously Updated</h3>
              <p className="text-sm text-gray-600">Our threat intelligence databases are updated in real-time to protect against the latest security threats.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2026 LSafe. All rights reserved. Built with security in mind.</p>
          <p className="text-sm mt-2 text-gray-500">Built by Tarek Elomami</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
