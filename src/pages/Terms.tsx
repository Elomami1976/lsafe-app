import React from 'react';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { FileText, Shield, AlertTriangle, Scale, Lock, Server, Copyright, CheckCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title="Terms of Service - LSafe URL Security Scanner"
        description="LSafe terms of service. Read about the terms and conditions for using our free URL security scanner and link checker."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Please read these terms carefully before using LSafe. By using our service, you agree to these terms.
          </p>
        </div>
      </section>

      {/* Important Notice Banner */}
      <div className="bg-yellow-50 border-t border-b border-yellow-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-yellow-900">
          <AlertTriangle className="w-6 h-6" />
          <p className="font-semibold">
            Important: <span className="font-normal">These Terms of Service constitute a legally binding agreement. Please read them carefully and contact us if you have any questions before using LSafe.</span>
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-sm text-gray-600">Last updated: February 1, 2026</p>
          <p className="text-sm text-gray-600">Effective date: February 1, 2026</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Acceptance of Terms */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Acceptance of Terms
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 text-gray-700">
            <p>
              By accessing or using LSafe ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
            </p>
            <p>
              These Terms apply to all users of the Service, including visitors, registered users, and any other users of the Service.
            </p>
            <p>
              We may modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service after changes are posted constitutes acceptance of the modified Terms.
            </p>
          </div>
        </section>

        {/* Description of Service */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Server className="w-8 h-8 text-green-600" />
            Description of Service
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">What LSafe Does</h4>
              <p className="text-gray-700 mb-3">LSafe is a URL security analysis service that:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Analyzes URLs for potential security threats</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Provides risk assessments based on available security intelligence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Offers recommendations for safe browsing practices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Generates security reports for analyzed URLs</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-3 text-gray-800">What LSafe Does NOT Do</h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5 flex-shrink-0">✗</span>
                  <span>Guarantee the safety or security of any URL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5 flex-shrink-0">✗</span>
                  <span>Provide real-time protection or blocking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5 flex-shrink-0">✗</span>
                  <span>Store or log the URLs you analyze</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5 flex-shrink-0">✗</span>
                  <span>Offer professional security consulting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5 flex-shrink-0">✗</span>
                  <span>Replace comprehensive security software</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-600" />
            User Responsibilities
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Acceptable Use</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use the Service for legitimate security purposes</li>
                <li>Respect rate limits and fair usage policies</li>
                <li>Provide accurate information when contacting support</li>
                <li>Report security vulnerabilities responsibly</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Prohibited Activities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Attempting to circumvent security measures</li>
                <li>Using the Service to harm others or systems</li>
                <li>Reverse engineering or copying the Service</li>
                <li>Automated scraping or bulk analysis</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
            Disclaimers and Limitations
          </h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <p className="text-orange-900 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Disclaimer:
            </p>
            <p className="text-orange-900">
              LSafe provides risk assessments, not guarantees. No security tool can detect all threats. Always exercise caution with unfamiliar URLs.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Service Limitations</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li><strong>No Guarantee:</strong> We cannot guarantee the detection of all threats or the absence of false positives</li>
                <li><strong>Time Sensitivity:</strong> Threat landscapes change rapidly; a safe URL today may become dangerous tomorrow</li>
                <li><strong>Coverage Limits:</strong> Our analysis is limited to available security intelligence sources</li>
                <li><strong>Technical Constraints:</strong> Some URLs may be inaccessible or unanalyzable due to technical limitations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">User Responsibility</h4>
              <p className="text-gray-700 mb-2">
                You acknowledge that LSafe is a tool to assist in security assessment, not a replacement for good security practices. You remain solely responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Verifying the legitimacy of websites before entering sensitive information</li>
                <li>Using comprehensive security software and keeping it updated</li>
                <li>Following safe browsing practices regardless of scan results</li>
                <li>Any consequences resulting from visiting analyzed URLs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Lock className="w-8 h-8 text-green-600" />
            Privacy and Data Handling
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Zero Logging Policy</h4>
              <p className="text-gray-700">
                We do not store, log, or retain the URLs you analyze. All analysis happens in real-time, and no URL data is kept after the scan completes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Local Data Storage</h4>
              <p className="text-gray-700">
                Your scan history is stored locally in your browser only. This data never leaves your device and can be cleared at any time through your browser settings.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Third-Party Analysis</h4>
              <p className="text-gray-700">
                URLs are analyzed using third-party security databases and services. While we don't store the URLs, these services may have their own data handling practices.
              </p>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Copyright className="w-8 h-8 text-blue-600" />
            Intellectual Property
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Our Rights</h4>
              <p className="text-gray-700">
                The LSafe service, including its design, functionality, algorithms, and content, is protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without explicit permission.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Your Rights</h4>
              <p className="text-gray-700">
                You retain all rights to any URLs or content you analyze using our service. We claim no ownership over your data or the results of your scans.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Third-Party Rights</h4>
              <p className="text-gray-700">
                We respect the intellectual property rights of others. If you believe your rights have been infringed, please contact us immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Service Availability */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Server className="w-8 h-8 text-purple-600" />
            Service Availability
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Best Effort Service</h4>
              <p className="text-gray-700">
                We strive to maintain high availability but cannot guarantee uninterrupted service. The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Service Modifications</h4>
              <p className="text-gray-700">
                We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time, with or without notice. We are not liable for any such modifications or interruptions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Fair Usage</h4>
              <p className="text-gray-700">
                To ensure service availability for all users, we may implement rate limiting or usage restrictions. Excessive or abusive usage may result in temporary or permanent restrictions.
              </p>
            </div>
          </div>
        </section>

        {/* Liability */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Scale className="w-8 h-8 text-red-600" />
            Liability and Indemnification
          </h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-900 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Legal Notice:
            </p>
            <p className="text-red-900 text-sm">
              The following sections contain important legal limitations. Please read carefully as they affect your legal rights.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Limitation of Liability</h4>
              <p className="text-gray-700 mb-2">TO THE MAXIMUM EXTENT PERMITTED BY LAW, LSAFE SHALL NOT BE LIABLE FOR:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Any damages resulting from the use or inability to use the Service</li>
                <li>Damages caused by malicious URLs not detected by our analysis</li>
                <li>False positives or negatives in security assessments</li>
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of data, profits, or business opportunities</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Indemnification</h4>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless LSafe from any claims, damages, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Disclaimer of Warranties</h4>
              <p className="text-gray-700">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
            <Scale className="w-8 h-8 text-blue-600" />
            Governing Law and Disputes
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Applicable Law</h4>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Dispute Resolution</h4>
              <p className="text-gray-700">
                We encourage resolving disputes through direct communication. If you have concerns about the Service, please contact us at legal@lsafe.io before pursuing formal legal action.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Severability</h4>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Information</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-3">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <p className="font-semibold text-gray-800">Contact Email: <a href="mailto:support@lsafe.io" className="text-blue-600">support@lsafe.io</a></p>
            <p className="text-sm text-gray-600 mt-2">For all inquiries: Legal questions, general support, security concerns</p>
            <p className="text-sm text-gray-600">Please include "Terms of Service" in your subject line for faster processing.</p>
          </div>
        </section>

        {/* Acknowledgment */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900 font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Acknowledgment:
          </p>
          <p className="text-blue-900 mt-2">
            By using LSafe, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
          </p>
        </div>
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

export default Terms;
