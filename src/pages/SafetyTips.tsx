import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import { 
  Shield, AlertTriangle, Lock, Mail, Globe, Smartphone, 
  CreditCard, Users, Eye, Wifi, Download, Key, 
  CheckCircle, XCircle, Lightbulb
} from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const SafetyTips: React.FC = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <PageSEO
        title="Internet Safety Tips - Stay Safe Online | LSafe"
        description="Essential internet safety tips and best practices. Learn how to protect yourself from online threats, scams, phishing, and cyber attacks with our comprehensive guide."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <Lightbulb className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Internet Safety Tips</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Practical, actionable advice to protect yourself and your family online. 
            Simple steps that make a big difference in your digital security.
          </p>
        </div>
      </section>

      {/* Quick Safety Checklist */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              🛡️ Your Daily Security Checklist
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Scan suspicious links</span>
              </div>
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Use strong passwords</span>
              </div>
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Enable 2FA</span>
              </div>
              <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Keep software updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Link Safety */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 rounded-full p-4">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Safe Link Practices</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                DO This
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span><strong>Always scan links</strong> with LSafe before clicking on links from emails, texts, or social media</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span><strong>Hover over links</strong> to preview the actual URL before clicking</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span><strong>Verify HTTPS</strong> - Look for the padlock icon in your browser's address bar</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span><strong>Type URLs directly</strong> for important sites like banks instead of clicking links</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span><strong>Bookmark trusted sites</strong> to avoid typo-squatting attacks</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-800 text-lg mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                DON'T Do This
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span><strong>Never click links</strong> in unsolicited emails claiming urgent action needed</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span><strong>Don't trust shortened URLs</strong> without scanning them first</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span><strong>Avoid clicking pop-up ads</strong> or "You've won!" messages</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span><strong>Don't ignore browser warnings</strong> about unsafe sites</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span><strong>Never enter passwords</strong> on sites that look "off" or misspelled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Password Security */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-100 rounded-full p-4">
              <Key className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Password Security Tips</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🔑</div>
              <h3 className="font-bold text-gray-800 mb-2">Use Long Passwords</h3>
              <p className="text-gray-600 text-sm">
                Aim for at least 12 characters. Longer passwords are exponentially harder to crack. 
                A 16-character password is 100x more secure than a 12-character one.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🎲</div>
              <h3 className="font-bold text-gray-800 mb-2">Make Them Unique</h3>
              <p className="text-gray-600 text-sm">
                Never reuse passwords across different accounts. When one site gets breached, 
                attackers try those credentials everywhere else.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="font-bold text-gray-800 mb-2">Use a Password Manager</h3>
              <p className="text-gray-600 text-sm">
                Let software generate and store complex passwords. You only need to remember 
                one master password. Try Bitwarden (free) or 1Password.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-bold text-gray-800 mb-2">Enable Two-Factor Auth</h3>
              <p className="text-gray-600 text-sm">
                Add a second layer of security with 2FA. Even if your password is stolen, 
                attackers can't access your account without the second factor.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="font-bold text-gray-800 mb-2">Avoid Personal Info</h3>
              <p className="text-gray-600 text-sm">
                Don't use birthdays, pet names, or addresses. Attackers can find this info 
                on social media and use it to guess your passwords.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-bold text-gray-800 mb-2">Change Compromised Passwords</h3>
              <p className="text-gray-600 text-sm">
                If a site you use gets breached, change that password immediately. 
                Check haveibeenpwned.com to see if your email has been in any breaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Safety */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-red-100 rounded-full p-4">
              <Mail className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Email Safety Tips</h2>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 text-white">
              <h3 className="text-xl font-bold mb-2">⚠️ Recognizing Phishing Emails</h3>
              <p className="opacity-90">90% of cyber attacks start with a phishing email. Learn to spot them!</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Check the Sender's Email Address</h4>
                  <p className="text-gray-600 text-sm">
                    Don't just look at the display name. Click to see the actual email address. 
                    "PayPal Security" sending from "paypa1-secure@gmail.com" is a scam.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Beware of Urgent Language</h4>
                  <p className="text-gray-600 text-sm">
                    "Your account will be suspended!", "Act now!", "Immediate action required!" 
                    - these phrases are designed to make you panic and click without thinking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Never Provide Sensitive Info</h4>
                  <p className="text-gray-600 text-sm">
                    Banks and legitimate companies never ask for passwords, SSNs, or full 
                    credit card numbers via email. If in doubt, call the company directly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-800">Scan Links Before Clicking</h4>
                  <p className="text-gray-600 text-sm">
                    Copy any link from an email and paste it into LSafe to check if it's safe 
                    before visiting. This simple step prevents most phishing attacks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 rounded-full p-4">
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Safe Online Shopping</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-gray-800">Before You Buy</h3>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">1</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Research the Store</h4>
                  <p className="text-sm text-gray-600">Look up reviews on Trustpilot, BBB, or Reddit. New stores with amazing deals are often scams.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">2</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Verify HTTPS</h4>
                  <p className="text-sm text-gray-600">Never enter payment info on a site without the padlock icon in the address bar.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <span className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">3</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Scan the URL</h4>
                  <p className="text-sm text-gray-600">Use LSafe to check if the shopping site has been reported for fraud or security issues.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-xl text-gray-800">Payment Safety</h3>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Use Credit Cards</h4>
                  <p className="text-sm text-gray-600">Credit cards offer better fraud protection than debit cards. You can dispute charges more easily.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Use PayPal or Apple Pay</h4>
                  <p className="text-sm text-gray-600">These services add a protection layer and don't share your actual card number with merchants.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200 flex items-start gap-3">
                <Eye className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800">Monitor Statements</h4>
                  <p className="text-sm text-gray-600">Check your bank statements regularly for unauthorized charges. Enable transaction alerts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Safety */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pink-100 rounded-full p-4">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Social Media Safety</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-pink-500 text-white p-4">
                <h3 className="font-bold text-lg">Privacy Settings</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Set profiles to "Friends Only"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Disable location tagging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Review tagged photos before they appear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Limit who can send friend requests</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-purple-500 text-white p-4">
                <h3 className="font-bold text-lg">What Not to Share</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Your full birthdate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Home address or workplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Vacation plans (wait until you're back)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Financial information</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="font-bold text-lg">Avoid These Scams</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Fake giveaways requiring shares</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>"See who viewed your profile" apps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Messages from "friends" asking for money</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span>Personality quizzes harvesting data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile & WiFi Safety */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-100 rounded-full p-4">
                  <Smartphone className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Mobile Device Safety</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🔒 Lock Your Phone</h4>
                  <p className="text-sm text-gray-600">Use biometrics (fingerprint/face) plus a 6-digit PIN minimum. Avoid simple patterns.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">📱 Only Use Official App Stores</h4>
                  <p className="text-sm text-gray-600">Download apps only from Google Play or Apple App Store. Avoid APK files from websites.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🔄 Keep Everything Updated</h4>
                  <p className="text-sm text-gray-600">Enable automatic updates for your OS and apps. Updates patch security vulnerabilities.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">📍 Review App Permissions</h4>
                  <p className="text-sm text-gray-600">Does a flashlight app need access to your contacts? Deny unnecessary permissions.</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-100 rounded-full p-4">
                  <Wifi className="w-8 h-8 text-cyan-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Public WiFi Safety</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Public WiFi Risks</h4>
                  <p className="text-sm text-red-700">
                    Anyone on the same network can potentially intercept your data. 
                    Hackers set up fake "Free WiFi" hotspots to steal information.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🛡️ Use a VPN</h4>
                  <p className="text-sm text-gray-600">A VPN encrypts your connection, making it safe to use public WiFi. Many are free or low-cost.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">🚫 Avoid Sensitive Activities</h4>
                  <p className="text-sm text-gray-600">Don't do banking, shopping, or enter passwords on public WiFi without a VPN.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">📶 Disable Auto-Connect</h4>
                  <p className="text-sm text-gray-600">Turn off automatic WiFi connection. Only connect to networks you trust.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Safety */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-yellow-100 rounded-full p-4">
              <Download className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Safe Downloading Practices</h2>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">✅ Safe Sources</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Official software websites (Microsoft, Adobe, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Official app stores (Google Play, Apple App Store)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Reputable download sites (SourceForge, GitHub)</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Open-source projects with verified signatures</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4">❌ Dangerous Sources</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>"Free" software or "cracked" programs</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Email attachments from unknown senders</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Pop-up download buttons on websites</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Links from social media promising "free" content</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg p-4 border border-yellow-300">
              <p className="text-gray-700 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <strong>Pro tip:</strong> Scan any download link with LSafe before clicking. 
                We check against malware distribution databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Put These Tips Into Practice</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start by scanning any suspicious links you encounter. It's free, instant, and could save you from a cyber attack.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
          >
            <Shield className="w-6 h-6" />
            Scan a URL Now
          </Link>
        </div>
      </section>

      {/* More Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Want to Learn More?</h2>
          <p className="text-gray-600 mb-8">
            Check out our in-depth security guides for comprehensive protection strategies.
          </p>
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            📚 Visit Our Security Blog
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <img src={LSaveLogo} alt="LSafe" className="h-12 w-12 mx-auto mb-4" />
          <p className="mb-4">© 2026 LSafe. Making the internet safer, one URL at a time.</p>
          <div className="flex justify-center gap-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SafetyTips;
