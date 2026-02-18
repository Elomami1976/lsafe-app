import React from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { Shield, Database, Lock, Users, Globe, CheckCircle, X } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="Privacy Policy - LSafe URL Security Scanner"
        description="LSafe privacy policy. Learn how we handle your data with zero logging. We never store your scanned URLs or personal information."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we protect your data and respect your digital rights.
          </p>
        </div>
      </section>

      {/* Privacy Promise Banner */}
      <div className="bg-green-50 border-t border-b border-green-200 py-4 transition-colors duration-200">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-green-800">
          <Shield className="w-6 h-6" />
          <p className="font-semibold">
            Our Privacy Promise: <span className="font-normal">LSafe operates on a zero-logging principle. We do not store, track, log, or share any URLs you scan. Your privacy is protected by design.</span>
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-gray-50 py-4 border-b border-gray-200 transition-colors duration-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-600">Last updated: February 11, 2026</p>
          <p className="text-sm text-gray-600">Effective date: February 11, 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            Information We Collect
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 mb-6 transition-colors duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">What We DON'T Collect</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">URLs you scan are never stored or logged</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No personal identification information</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No browsing history or behavioral data collected by LSafe</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8 transition-colors duration-200">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Technical Information We May Collect</h3>
            
            <h4 className="font-semibold text-gray-800 mb-2">Anonymous Usage Statistics</h4>
            <p className="text-gray-700 mb-3">We may collect aggregated, anonymous statistics to improve our service:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
              <li>Number of scans performed (without URL content)</li>
              <li>General geographic region (country level only)</li>
              <li>Browser type and version for compatibility</li>
              <li>Service performance metrics</li>
            </ul>

            <h4 className="font-semibold text-gray-800 mb-2">Local Storage</h4>
            <p className="text-gray-700 mb-6">
              Your scan history is stored locally in your browser only. We cannot access this data, and it never leaves your device unless you explicitly choose to export it.
            </p>

            <h4 className="font-semibold text-gray-800 mb-2">Google Analytics & Google AdSense</h4>
            <p className="text-gray-700">
              We use Google Analytics to measure site traffic and understand how visitors interact with our pages in aggregate. We also use Google AdSense to display advertisements. Both services may use cookies and collect device-level information (such as browser type, screen size, and general location) under Google's own privacy policies. We do not use this data to personally identify you. See the "Cookies and Tracking" section below for opt-out options.
            </p>
          </div>
        </section>

        {/* How We Use Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Globe className="w-8 h-8 text-green-600" />
            How We Use Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Service Operation</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Analyze URLs for security threats in real-time</li>
                <li>Provide accurate risk assessments</li>
                <li>Maintain service availability and performance</li>
                <li>Prevent abuse and ensure fair usage</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Service Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                <li>Improve threat detection accuracy</li>
                <li>Optimize scanning performance</li>
                <li>Enhance user experience</li>
                <li>Develop new security features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sharing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            Data Sharing and Disclosure
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-blue-900 font-semibold">
              We do not sell, rent, or share your data with third parties for marketing purposes.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Security Analysis</h4>
              <p className="text-gray-700">
                URLs are analyzed using public security databases and threat intelligence sources. This analysis happens in real-time and no data is retained after the scan completes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Legal Requirements</h4>
              <p className="text-gray-700">
                We may disclose information if required by law, court order, or to protect our rights, property, or safety. However, since we don't store URL data, there's typically nothing to disclose.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Service Providers</h4>
              <p className="text-gray-700">
                We use trusted third-party services for hosting and security analysis. These providers are bound by strict confidentiality agreements and data protection standards.
              </p>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Lock className="w-8 h-8 text-red-600" />
            Data Security
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Technical Safeguards</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">End-to-end HTTPS encryption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Secure server infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Regular security audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Access controls and monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Operational Security</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Zero-logging architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Minimal data retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Employee security training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-sm">Incident response procedures</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            Your Privacy Rights
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">GDPR Rights (EU Users)</h4>
              <p className="text-gray-700 mb-3">Under GDPR, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Access your personal data (though we don't store URL data)</li>
                <li>Rectify inaccurate data</li>
                <li>Erase your data</li>
                <li>Restrict processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">CCPA Rights (California Users)</h4>
              <p className="text-gray-700 mb-3">Under CCPA, you have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Know what personal information is collected</li>
                <li>Delete personal information</li>
                <li>Opt-out of the sale of personal information</li>
                <li>Non-discrimination for exercising your rights</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-2 text-gray-800">How to Exercise Your Rights</h4>
              <p className="text-gray-700">
                Contact us at <a href="mailto:support@lsafe.io" className="text-blue-600 font-semibold">support@lsafe.io</a> to exercise any of these rights. Since we don't store URL data, most requests will be automatically fulfilled by our design.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            🍪 Cookies and Tracking
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Essential Cookies Only</h4>
              <p className="text-gray-700">
                We use only essential cookies required for the service to function properly. These include session management and security features.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Third-Party Cookies</h4>
              <p className="text-gray-700">
                Our site uses Google Analytics for aggregate site traffic analysis and Google AdSense for displaying advertisements. These Google services may set their own cookies to deliver relevant ads and measure traffic. These cookies are managed by Google and governed by <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>. You can manage your Google ad preferences at <a href="https://adssettings.google.com" className="text-blue-600 hover:text-blue-700 underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Local Storage</h4>
              <p className="text-gray-700">
                Your scan history is stored locally in your browser using localStorage. This data never leaves your device and can be cleared at any time through your browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* Changes to Policy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>
          <p className="text-gray-700 mb-3">When we make changes, we will:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Update the "Last updated" date at the top of this policy</li>
            <li>Notify users of significant changes through our website</li>
            <li>Maintain previous versions for reference</li>
          </ul>
          <p className="text-gray-700">
            Your continued use of LSafe after any changes indicates your acceptance of the updated policy.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-3">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <p className="font-semibold text-gray-800">Email: <a href="mailto:support@lsafe.io" className="text-blue-600">support@lsafe.io</a></p>
            <p className="text-sm text-gray-600 mt-2">Subject Line: Privacy Policy Inquiry</p>
            <p className="text-sm text-gray-600">Response Time: We aim to respond within 48 hours</p>
          </div>
        </section>
      </div>

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

export default Privacy;
