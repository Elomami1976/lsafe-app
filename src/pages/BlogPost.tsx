import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { Shield, AlertTriangle, Lock, Mail, Globe, Smartphone, CreditCard, Users, ArrowLeft, Clock, ChevronRight, Fingerprint, Cookie } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const blogPosts: Record<string, {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
}> = {
  'phishing-attacks': {
    title: 'How to Identify and Avoid Phishing Attacks in 2026',
    description: 'Learn the latest techniques cybercriminals use to steal your personal information and how to protect yourself from sophisticated phishing schemes.',
    icon: Mail,
    color: 'red',
    readTime: '8 min read',
    category: 'Threat Prevention',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Phishing attacks have evolved dramatically in recent years. What once were obvious scam emails with poor grammar are now sophisticated attacks that can fool even tech-savvy users. In 2026, phishing remains one of the most common and effective cyber threats, responsible for over 90% of data breaches.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Signs of Phishing</h2>
        <p className="text-gray-700 mb-4">Learning to recognize phishing attempts is your first line of defense:</p>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-start gap-3 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <span><strong>Urgent language creating panic</strong> - Messages like "Your account will be closed!" or "Immediate action required!" are designed to make you act without thinking.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <span><strong>Mismatched sender addresses</strong> - The display name might say "PayPal" but the actual email is from "paypa1-security@gmail.com".</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <span><strong>Generic greetings</strong> - "Dear Customer" instead of your actual name often indicates a mass phishing campaign.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <span><strong>Requests for sensitive information</strong> - Legitimate companies never ask for passwords, SSN, or full credit card numbers via email.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <span><strong>Suspicious links</strong> - Links that don't match the supposed sender's domain or use lookalike characters.</span>
          </li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-800 mb-3">Pro Tip: Always Verify Links</h3>
          <p className="text-blue-700">
            Before clicking any link in an email, hover over it to see the actual URL. Better yet, copy the link and paste it into LSafe to scan for threats before visiting. This simple step can prevent most phishing attacks.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Protect Yourself</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
              <span className="font-semibold text-gray-800">Verify sender addresses</span>
            </div>
            <p className="text-sm text-gray-600">Check the actual email address, not just the display name.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
              <span className="font-semibold text-gray-800">Hover before clicking</span>
            </div>
            <p className="text-sm text-gray-600">Check where links actually lead before clicking them.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
              <span className="font-semibold text-gray-800">Use LSafe to scan URLs</span>
            </div>
            <p className="text-sm text-gray-600">Our scanner detects known phishing domains and suspicious patterns.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
              <span className="font-semibold text-gray-800">Enable 2FA</span>
            </div>
            <p className="text-sm text-gray-600">Two-factor authentication protects you even if credentials are stolen.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">5</span>
              <span className="font-semibold text-gray-800">Keep software updated</span>
            </div>
            <p className="text-sm text-gray-600">Security updates patch vulnerabilities exploited by phishing sites.</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">6</span>
              <span className="font-semibold text-gray-800">Go directly to websites</span>
            </div>
            <p className="text-sm text-gray-600">Instead of clicking email links, type URLs directly into your browser.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Real-World Phishing Example</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-red-800 mb-3">⚠️ Fake Delivery Notification Scam</h3>
          <p className="text-red-700 mb-4">
            One of the most common 2026 phishing techniques involves fake delivery notifications. Scammers send emails appearing to be from major shipping companies like UPS, FedEx, or Amazon, claiming your package couldn't be delivered.
          </p>
          <p className="text-red-700">
            The link leads to a convincing lookalike website that asks for your login credentials, payment information, or personal details. Always verify tracking numbers directly on the official carrier website, and scan suspicious links with LSafe.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Do If You've Been Phished</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-8">
          <li>Change your password immediately on the affected account</li>
          <li>Enable two-factor authentication if not already active</li>
          <li>Check for unauthorized account activity</li>
          <li>Report the phishing attempt to the impersonated company</li>
          <li>Monitor your credit report for suspicious activity</li>
          <li>Scan your device for malware that may have been installed</li>
        </ol>
      </>
    )
  },
  'malware-protection': {
    title: 'Complete Guide to Malware Protection for Everyday Users',
    description: 'Understanding different types of malware and implementing effective protection strategies to keep your devices and data safe.',
    icon: Shield,
    color: 'blue',
    readTime: '10 min read',
    category: 'Security Basics',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Malware, short for malicious software, encompasses various threats designed to damage, disrupt, or gain unauthorized access to your devices and data. Understanding these threats is essential for protecting yourself in today's digital landscape.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Malware</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🦠 Viruses</h3>
            <p className="text-gray-600">Programs that attach to legitimate files and spread when those files are shared. They can corrupt data, slow down systems, or give attackers access to your computer.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🔒 Ransomware</h3>
            <p className="text-gray-600">One of the most devastating malware types. It encrypts your files and demands payment (usually in cryptocurrency) for the decryption key. Even paying doesn't guarantee recovery.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">👁️ Spyware</h3>
            <p className="text-gray-600">Secretly monitors your activities, collecting personal information, passwords, browsing habits, and even keystrokes without your knowledge.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🐴 Trojans</h3>
            <p className="text-gray-600">Disguised as legitimate software but contain hidden malicious code. Named after the ancient Greek trick, they deceive users into installing them.</p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">📢 Adware</h3>
            <p className="text-gray-600">Displays unwanted advertisements, often in pop-ups. While less dangerous than other malware, it can slow down your device and lead to more malicious content.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Protection Strategies</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Keep everything updated</strong> - Operating system, browsers, and all applications should be set to auto-update.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Use reputable antivirus software</strong> - Windows Defender (built-in) is solid, or consider paid solutions for extra features.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Be cautious with downloads</strong> - Only download from official sources. If it seems too good to be true, it probably is.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Scan URLs with LSafe</strong> - Check links before visiting to avoid malware distribution sites.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Regular backups</strong> - Keep copies of important data offline or in secure cloud storage.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <span className="text-gray-700"><strong>Use strong passwords</strong> - Unique, complex passwords for each account. Consider a password manager.</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Warning Signs of Infection</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-800 mb-4">If you notice any of these symptoms, your device may be infected:</p>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Slow computer performance</span>
            </li>
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Unexpected pop-ups or ads</span>
            </li>
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Programs crashing frequently</span>
            </li>
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Unknown programs starting up</span>
            </li>
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Increased network activity</span>
            </li>
            <li className="flex items-center gap-2 text-yellow-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Browser homepage changed</span>
            </li>
          </ul>
        </div>
      </>
    )
  },
  'safe-online-shopping': {
    title: 'Safe Online Shopping: Protect Your Money and Identity',
    description: 'Essential tips for secure e-commerce transactions and how to identify legitimate online stores from fraudulent ones.',
    icon: CreditCard,
    color: 'green',
    readTime: '7 min read',
    category: 'Online Safety',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Online shopping offers incredible convenience, but it also presents opportunities for cybercriminals. Fake stores, payment scams, and identity theft are common threats. Learning to shop safely protects both your money and personal information.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Before You Buy - Security Checklist</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-blue-800">
              <span className="text-green-600">✓</span>
              <span>Check for HTTPS in the URL (look for the padlock icon)</span>
            </li>
            <li className="flex items-center gap-3 text-blue-800">
              <span className="text-green-600">✓</span>
              <span>Research the store's reputation and read customer reviews</span>
            </li>
            <li className="flex items-center gap-3 text-blue-800">
              <span className="text-green-600">✓</span>
              <span>Look for clear contact information and return policies</span>
            </li>
            <li className="flex items-center gap-3 text-blue-800">
              <span className="text-green-600">✓</span>
              <span>Verify the URL matches the official store name exactly</span>
            </li>
            <li className="flex items-center gap-3 text-blue-800">
              <span className="text-green-600">✓</span>
              <span><strong>Scan the URL with LSafe</strong> for known threats and scam reports</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Red Flags of Fake Online Stores</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">💰</span>
            <h3 className="font-semibold text-gray-800 mt-2">Too-Good-To-Be-True Prices</h3>
            <p className="text-sm text-gray-600">Luxury items at 90% off are almost always scams.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">🖼️</span>
            <h3 className="font-semibold text-gray-800 mt-2">Poor Website Quality</h3>
            <p className="text-sm text-gray-600">Broken images, grammar errors, and unprofessional design.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">📍</span>
            <h3 className="font-semibold text-gray-800 mt-2">No Physical Address</h3>
            <p className="text-sm text-gray-600">Legitimate businesses provide contact information.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">💳</span>
            <h3 className="font-semibold text-gray-800 mt-2">Unusual Payment Methods</h3>
            <p className="text-sm text-gray-600">Only wire transfers or cryptocurrency accepted.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">📅</span>
            <h3 className="font-semibold text-gray-800 mt-2">New Domain</h3>
            <p className="text-sm text-gray-600">Recently registered domains are higher risk.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <span className="text-red-600 text-2xl">⭐</span>
            <h3 className="font-semibold text-gray-800 mt-2">Fake Reviews</h3>
            <p className="text-sm text-gray-600">All 5-star reviews with similar wording.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Safe Payment Practices</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-8">
          <li><strong>Use credit cards</strong> - Better fraud protection than debit cards</li>
          <li><strong>Consider virtual card numbers</strong> - One-time numbers for online purchases</li>
          <li><strong>Never save payment info</strong> - Especially on unfamiliar sites</li>
          <li><strong>Enable transaction alerts</strong> - Get notified of every charge</li>
          <li><strong>Use PayPal or similar</strong> - Adds a layer of payment protection</li>
          <li><strong>Monitor statements regularly</strong> - Catch unauthorized charges early</li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-yellow-800 mb-3">🚨 If You've Been Scammed</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Contact your bank immediately to dispute the charge</li>
            <li>• Report the website to the FTC at reportfraud.ftc.gov</li>
            <li>• Change passwords if you created an account</li>
            <li>• Monitor your credit report for suspicious activity</li>
            <li>• Report the scam to help protect others</li>
          </ul>
        </div>
      </>
    )
  },
  'social-media-security': {
    title: 'Social Media Security: Protecting Your Digital Identity',
    description: 'How to maintain privacy and security on social platforms while avoiding common threats targeting social media users.',
    icon: Users,
    color: 'purple',
    readTime: '9 min read',
    category: 'Privacy',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Social media platforms contain treasure troves of personal information that cybercriminals actively exploit. From identity theft to targeted scams, understanding social media threats is essential for protecting your digital identity.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Settings to Review</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <p className="text-purple-800 mb-4">Check these settings on all your social accounts:</p>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Who can see your posts</span>
            </li>
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Who can send friend requests</span>
            </li>
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Search engine indexing</span>
            </li>
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Connected apps & permissions</span>
            </li>
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Location sharing settings</span>
            </li>
            <li className="flex items-center gap-2 text-purple-700">
              <Lock className="w-4 h-4" />
              <span>Two-factor authentication</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Social Media Threats</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white border-l-4 border-red-500 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">Impersonation Scams</h3>
            <p className="text-gray-600">Criminals create fake profiles pretending to be friends or family, then request money or personal information.</p>
          </div>
          
          <div className="bg-white border-l-4 border-orange-500 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">Romance Scams</h3>
            <p className="text-gray-600">Fake romantic interests build relationships over time before requesting financial help for "emergencies."</p>
          </div>
          
          <div className="bg-white border-l-4 border-yellow-500 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">Quiz and App Scams</h3>
            <p className="text-gray-600">Fun-looking quizzes that actually harvest your personal data for identity theft or targeted attacks.</p>
          </div>
          
          <div className="bg-white border-l-4 border-green-500 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">Fake Giveaways</h3>
            <p className="text-gray-600">Posts claiming you've won prizes that require personal information or payment to claim.</p>
          </div>
          
          <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800">Malicious Links</h3>
            <p className="text-gray-600">Shortened URLs in posts or messages leading to phishing sites or malware downloads.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Practices</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <ol className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <span>Think before you share personal information publicly</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <span>Verify friend requests from people you know in person</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <span><strong>Use LSafe to check suspicious links</strong> before clicking</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <span>Enable login notifications for unauthorized access alerts</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
              <span>Regularly review and revoke third-party app permissions</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
              <span>Use unique passwords for each social platform</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">7</span>
              <span>Be skeptical of unsolicited messages, even from "friends"</span>
            </li>
          </ol>
        </div>
      </>
    )
  },
  'mobile-device-security': {
    title: 'Mobile Device Security: Keeping Your Smartphone Safe',
    description: 'Comprehensive guide to protecting your smartphone from threats, securing your apps, and maintaining mobile privacy.',
    icon: Smartphone,
    color: 'orange',
    readTime: '8 min read',
    category: 'Device Security',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Your smartphone contains more personal information than any other device you own. From banking apps to personal photos, email to health data, protecting your mobile device is absolutely crucial in today's connected world.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Essential Security Measures</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" />
              Screen Lock
            </h3>
            <p className="text-gray-600">Use biometrics (fingerprint/face) combined with a strong PIN (6+ digits) or password. Avoid simple patterns.</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-600" />
              Software Updates
            </h3>
            <p className="text-gray-600">Install OS and app updates promptly. They contain critical security patches that protect against new threats.</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-600" />
              App Permissions
            </h3>
            <p className="text-gray-600">Review and limit what apps can access. Does a flashlight app really need your contacts?</p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-orange-600" />
              App Sources
            </h3>
            <p className="text-gray-600">Only download apps from official stores (Google Play, Apple App Store). Avoid side-loading APKs.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Secure Connections</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-blue-800">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <span><strong>Avoid public WiFi</strong> for banking, shopping, or entering passwords</span>
            </li>
            <li className="flex items-start gap-3 text-blue-800">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <span><strong>Use a VPN</strong> when connecting to public or unsecured networks</span>
            </li>
            <li className="flex items-start gap-3 text-blue-800">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
              <span><strong>Disable Bluetooth</strong> when not actively using it</span>
            </li>
            <li className="flex items-start gap-3 text-blue-800">
              <Globe className="w-5 h-5 text-purple-600 mt-0.5" />
              <span><strong>Turn off auto-connect</strong> for WiFi networks</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Protecting Your Data</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-8">
          <li>Enable device encryption (usually on by default)</li>
          <li>Set up Find My Device / Find My iPhone for remote wipe</li>
          <li>Regular backups to secure cloud storage</li>
          <li>Use secure messaging apps with end-to-end encryption</li>
          <li>Be cautious with QR codes - <strong>scan the resulting URL with LSafe</strong></li>
        </ol>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Signs Your Phone May Be Compromised</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Battery draining faster than usual</span>
            </div>
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Unexpected data usage spikes</span>
            </div>
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Apps you didn't install</span>
            </div>
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Unusual account activity</span>
            </div>
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Phone running hot when idle</span>
            </div>
            <div className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Strange texts or calls in history</span>
            </div>
          </div>
        </div>
      </>
    )
  },
  'password-security': {
    title: 'Password Security: Creating and Managing Strong Passwords',
    description: 'Master the art of creating unbreakable passwords and learn about password managers to keep your accounts secure.',
    icon: Lock,
    color: 'indigo',
    readTime: '6 min read',
    category: 'Security Basics',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Passwords remain the first line of defense for your online accounts. Despite advances in authentication, weak or reused passwords are still responsible for the majority of account breaches. Let's fix that.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What Makes a Strong Password</h2>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-indigo-800">
              <span className="text-green-600">✓</span>
              <span>At least 12 characters long (16+ is better)</span>
            </li>
            <li className="flex items-center gap-2 text-indigo-800">
              <span className="text-green-600">✓</span>
              <span>Mix of uppercase, lowercase, numbers, and symbols</span>
            </li>
            <li className="flex items-center gap-2 text-indigo-800">
              <span className="text-green-600">✓</span>
              <span>No personal information (birthdays, names, addresses)</span>
            </li>
            <li className="flex items-center gap-2 text-indigo-800">
              <span className="text-green-600">✓</span>
              <span>No common words, phrases, or keyboard patterns</span>
            </li>
            <li className="flex items-center gap-2 text-indigo-800">
              <span className="text-green-600">✓</span>
              <span>Unique for each and every account</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Creation Strategies</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🔤 Passphrase Method</h3>
            <p className="text-gray-600 mb-2">Combine random words with numbers and symbols:</p>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">Coffee$Mountain7!Bicycle#Rain</code>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">📝 Sentence Method</h3>
            <p className="text-gray-600 mb-2">Create a phrase and use first letters:</p>
            <p className="text-sm text-gray-500">"I love eating 2 pizzas on Friday nights!" →</p>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm">Ile2poFn!</code>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Managers</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <p className="text-green-800 mb-4">Using a password manager is the most secure approach:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Generates strong, unique passwords automatically</span>
            </li>
            <li className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Securely stores all your passwords with encryption</span>
            </li>
            <li className="flex items-start gap-2">
              <Smartphone className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Auto-fills login forms across all devices</span>
            </li>
            <li className="flex items-start gap-2">
              <Globe className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Syncs securely between computer and phone</span>
            </li>
          </ul>
          <p className="text-green-800 mt-4 font-medium">Popular options: Bitwarden (free), 1Password, LastPass, Dashlane</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Two-Factor Authentication (2FA)</h2>
        <p className="text-gray-700 mb-4">Always enable 2FA when available. Options ranked by security:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-8">
          <li><strong>Hardware keys</strong> (YubiKey) - Most secure, enterprise-level</li>
          <li><strong>Authenticator apps</strong> (Google Authenticator, Authy) - Very secure</li>
          <li><strong>SMS codes</strong> - Better than nothing, but vulnerable to SIM swapping</li>
          <li><strong>Email codes</strong> - Least secure, depends on email security</li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-800 mb-3">🚨 If Your Password Is Compromised</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• Change it immediately on the affected account</li>
            <li>• Change it on ANY accounts using the same password</li>
            <li>• Enable 2FA if not already active</li>
            <li>• Monitor the account for suspicious activity</li>
            <li>• Check haveibeenpwned.com for other compromises</li>
          </ul>
        </div>
      </>
    )
  },
  'browser-fingerprint': {
    title: 'What Is Browser Fingerprinting and How Are You Being Tracked?',
    description: 'Websites can identify you without cookies using your browser\'s unique combination of settings, fonts, and hardware. Find out what data is exposed and how to reduce your digital footprint.',
    icon: Fingerprint,
    color: 'purple',
    readTime: '7 min read',
    category: 'Privacy',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Browser fingerprinting is a powerful tracking technique that identifies you based on the unique combination of your browser's configuration — without storing any data on your device. No cookies, no login required. Just the silent collection of dozens of browser attributes to build an identifier that is statistically unique to you.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What Data Is Collected</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🎨 Canvas Fingerprint</h3>
            <p className="text-gray-600">Your GPU renders a hidden image slightly differently than every other device. Websites read these pixel-level differences to create a near-unique identifier that doesn't change across sessions.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">📐 WebGL Fingerprint</h3>
            <p className="text-gray-600">Similar to canvas, but uses 3D rendering hardware properties. The GPU vendor, renderer string, and supported extensions are all unique to your hardware combination.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🔤 System Fonts</h3>
            <p className="text-gray-600">The specific set of fonts installed on your OS is surprisingly unique. A combination of pre-installed fonts from your OS version and any fonts you've added yourself creates a distinctive list.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🖥️ Screen & Hardware Info</h3>
            <p className="text-gray-600">Screen resolution, color depth, pixel ratio, timezone, language, and CPU core count all narrow down your identity. Combined, they significantly reduce the anonymity set.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🔌 Browser Extensions</h3>
            <p className="text-gray-600">The list of installed extensions and their versions is detectable via timing attacks and DOM probing, adding another dimension to the fingerprint.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why It's Hard to Block</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <p className="text-yellow-800 mb-3">Unlike cookies, fingerprinting doesn't store anything on your device. This means:</p>
          <ul className="space-y-2 text-yellow-700">
            <li>• <strong>Private/incognito mode doesn't help</strong> — your hardware is the same</li>
            <li>• <strong>Clearing cookies doesn't help</strong> — no data is stored locally</li>
            <li>• <strong>VPNs don't help</strong> — they only mask your IP, not your browser attributes</li>
            <li>• <strong>Tracking persists across sites</strong> — ad networks pool fingerprints across domains</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Reduce Your Fingerprint</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <ol className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <span>Use the <strong>Tor Browser</strong> — it normalizes fingerprint data so all users look identical</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <span>Enable <strong>privacy.resistFingerprinting</strong> in Firefox's about:config</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <span>Use the <strong>CanvasBlocker</strong> browser extension to randomize canvas output</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <span>Minimize installed fonts and extensions to reduce uniqueness</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
              <span>Use <strong>LSafe's Browser Fingerprint Test</strong> to see exactly what you're exposing right now</span>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-800 mb-3">🔍 Test Your Own Fingerprint</h3>
          <p className="text-blue-700">
            Use our free <strong>Browser Fingerprint Test</strong> tool to instantly see your canvas hash, WebGL renderer, screen info, timezone, language, and get a uniqueness score. Everything runs locally in your browser — no data is sent to any server.
          </p>
        </div>
      </>
    )
  },
  'cookie-tracker-analyzer': {
    title: 'Cookies & Trackers: How Websites Follow You Across the Internet',
    description: 'From Google Analytics to Facebook Pixel and session recorders, websites embed dozens of trackers. Learn what they do, what data they collect, and how to detect them on any site.',
    icon: Cookie,
    color: 'orange',
    readTime: '8 min read',
    category: 'Privacy',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Most websites you visit today contain multiple third-party tracking scripts that silently report your behavior back to advertising networks, analytics platforms, and data brokers — often without your knowledge or meaningful consent.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Trackers</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">📊 Analytics Trackers</h3>
            <p className="text-gray-600"><strong>Examples:</strong> Google Analytics, Hotjar, Mixpanel, Plausible</p>
            <p className="text-gray-600 mt-1">Record page views, session duration, bounce rate, and navigation paths. Help site owners understand usage patterns. Generally lower privacy risk but still send data to third parties.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🎯 Advertising Trackers</h3>
            <p className="text-gray-600"><strong>Examples:</strong> Facebook Pixel, Google Ads, DoubleClick, Criteo</p>
            <p className="text-gray-600 mt-1">Build a detailed profile of your interests and behaviors to serve targeted ads across the web. Data is shared between ad networks to create a cross-site identity.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🎥 Session Recorders</h3>
            <p className="text-gray-600"><strong>Examples:</strong> FullStory, Microsoft Clarity, LogRocket, Mouseflow</p>
            <p className="text-gray-600 mt-1">Literally record your mouse movements, scrolling, clicks, and keystrokes to replay your session. Can capture form inputs — including sensitive data typed before submission.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🧪 A/B Testing Tools</h3>
            <p className="text-gray-600"><strong>Examples:</strong> Optimizely, VWO, Google Optimize</p>
            <p className="text-gray-600 mt-1">Test different site versions on different users to optimize conversion rates. Often linked to advertising profiles, allowing behavioral segmentation.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What GDPR & CCPA Require</h2>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <p className="text-purple-800 mb-3">Under privacy regulations, websites must:</p>
          <ul className="space-y-2 text-purple-700">
            <li>• <strong>Disclose all trackers</strong> in their Privacy Policy</li>
            <li>• <strong>Obtain informed consent</strong> before setting non-essential cookies (GDPR)</li>
            <li>• <strong>Allow opt-out</strong> of data sale and tracking (CCPA)</li>
            <li>• <strong>Honor Do Not Track</strong> signals where applicable</li>
            <li>• <strong>Provide data deletion</strong> requests for EU/California residents</li>
          </ul>
          <p className="text-purple-700 mt-3">Many sites bury consent in dark patterns or pre-ticked boxes that technically violate these rules.</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Detect Trackers on Any Site</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <ol className="space-y-3">
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <span>Use <strong>LSafe's Cookie & Tracker Analyzer</strong> — paste any page's HTML source to instantly identify 24+ known trackers with risk ratings</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <span>Install <strong>uBlock Origin</strong> or <strong>Privacy Badger</strong> browser extensions</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <span>Open <strong>DevTools → Network tab</strong> and filter by third-party domains</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <span>Check the site's <strong>Privacy Policy</strong> for listed third parties and data processors</span>
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Practical Steps to Reduce Tracking</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <ul className="space-y-2 text-blue-800">
            <li>• Enable <strong>Enhanced Tracking Protection</strong> in Firefox (Strict mode)</li>
            <li>• Use <strong>Safari</strong> with Intelligent Tracking Prevention enabled</li>
            <li>• Block third-party cookies in your browser settings</li>
            <li>• Use a <strong>DNS-level blocker</strong> like NextDNS or Pi-hole</li>
            <li>• Regularly clear cookies and site data in your browser</li>
            <li>• Use <strong>Brave Browser</strong> which blocks trackers by default</li>
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-orange-800 mb-3">🍪 Analyze Any Website's Trackers</h3>
          <p className="text-orange-700">
            Try LSafe's free <strong>Cookie & Tracker Analyzer</strong>. Right-click any page → View Page Source → copy the HTML and paste it into our tool. We'll instantly flag every tracker we find with explanations of what data they collect and their risk level.
          </p>
        </div>
      </>
    )
  },
  'email-header-analyzer': {
    title: 'How to Read Email Headers to Detect Phishing and Spoofing',
    description: 'Every email contains hidden routing data in its headers — timestamps, server hops, and authentication results. Learn how to read them and spot fake sender addresses before it\'s too late.',
    icon: Mail,
    color: 'blue',
    readTime: '9 min read',
    category: 'Threat Prevention',
    content: (
      <>
        <p className="text-lg text-gray-700 mb-6">
          Email headers are the hidden metadata in every message you receive. They contain the full routing path from sender to inbox, authentication results, and timestamps that can expose whether an email is genuine or a carefully crafted phishing attempt.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What Are Email Headers?</h2>
        <p className="text-gray-700 mb-6">
          When your mail client shows you the "From" name and subject line, it's hiding dozens of technical header lines. These headers are added by every mail server the message passes through, creating a complete audit trail. Knowing how to read them can reveal spoofed senders and compromised accounts.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Headers Explained</h2>

        <div className="space-y-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">📬 Received Headers</h3>
            <p className="text-gray-600">Each mail server that handles the message adds a "Received:" header. Reading them <strong>bottom to top</strong> gives the true routing path. Unexpected geographic hops or unusual relay servers are red flags.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">↩️ From vs. Return-Path</h3>
            <p className="text-gray-600">Phishers often set a legitimate-looking "From" display name while the actual Return-Path (where bounces go) reveals the real sender address. These should match for legitimate email.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">✅ SPF — Sender Policy Framework</h3>
            <p className="text-gray-600">A DNS record specifying which servers are authorized to send email for a domain. An <strong>SPF: fail</strong> or <strong>softfail</strong> means the sending server isn't authorized — a major red flag for spoofing.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🔑 DKIM — DomainKeys Identified Mail</h3>
            <p className="text-gray-600">A cryptographic signature proving the email wasn't altered in transit. A <strong>DKIM: fail</strong> means the message was tampered with or forged after leaving the sender's server.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-bold text-gray-800 mb-2">🛡️ DMARC — Domain-based Message Authentication</h3>
            <p className="text-gray-600">Combines SPF and DKIM and tells receiving servers what to do with failures: reject, quarantine, or report. A missing DMARC record leaves a domain wide open to impersonation.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Real Phishing Example</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-red-800 mb-3">⚠️ Fake "PayPal" Email Breakdown</h3>
          <p className="text-red-700 mb-3">Your mail client shows: <strong>From: service@paypal.com</strong></p>
          <p className="text-red-700 mb-1">But the raw headers reveal:</p>
          <ul className="space-y-1 text-red-600 text-sm font-mono bg-red-100 p-3 rounded">
            <li>Return-Path: bounce@random-domain.ru</li>
            <li>Received: from mail.random-domain.ru (192.168.45.12)</li>
            <li>Authentication-Results: spf=fail; dkim=none; dmarc=fail</li>
          </ul>
          <p className="text-red-700 mt-3">Three authentication failures and a Russian relay server — a clear phishing email despite the legitimate-looking From address.</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Get Email Headers</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📧 Gmail</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Open the email</li>
                <li>2. Click the three-dot menu (⋮)</li>
                <li>3. Select "Show original"</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📨 Outlook</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Open the email</li>
                <li>2. Click File → Properties</li>
                <li>3. Find "Internet headers"</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🍎 Apple Mail</h3>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Open the email</li>
                <li>2. Click View menu</li>
                <li>3. Message → All Headers</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-800 mb-3">✉️ Analyze Headers Instantly</h3>
          <p className="text-blue-700">
            Copy the raw headers from any suspicious email and paste them into LSafe's free <strong>Email Header Analyzer</strong>. It parses SPF, DKIM, and DMARC results, visualizes the routing hops with timestamps, identifies the origin IP, and gives an overall risk score — all instantly in your browser with no data sent to any server.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Do With a Suspicious Email</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-8">
          <li>Do <strong>not</strong> click any links or download attachments</li>
          <li>Analyze the headers using LSafe's Email Header Analyzer</li>
          <li>If SPF, DKIM, or DMARC fail — treat it as phishing</li>
          <li>Report it to your email provider's abuse team</li>
          <li>Forward to the impersonated company's phishing report address</li>
          <li>Delete the email from your inbox and trash</li>
        </ol>
      </>
    )
  }
};

const relatedPosts: Record<string, string[]> = {
  'phishing-attacks': ['email-header-analyzer', 'malware-protection'],
  'malware-protection': ['phishing-attacks', 'mobile-device-security'],
  'safe-online-shopping': ['phishing-attacks', 'password-security'],
  'social-media-security': ['browser-fingerprint', 'cookie-tracker-analyzer'],
  'mobile-device-security': ['malware-protection', 'safe-online-shopping'],
  'password-security': ['social-media-security', 'mobile-device-security'],
  'browser-fingerprint': ['cookie-tracker-analyzer', 'social-media-security'],
  'cookie-tracker-analyzer': ['browser-fingerprint', 'social-media-security'],
  'email-header-analyzer': ['phishing-attacks', 'malware-protection'],
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug || !blogPosts[slug]) {
    return <Navigate to="/blog" replace />;
  }
  
  const post = blogPosts[slug];
  const IconComponent = post.icon;
  const related = relatedPosts[slug] || [];

  return (
    <div className="min-h-screen bg-white">
      <PageSEO
        title={`${post.title} - LSafe Security Blog`}
        description={post.description}
      />
      <Navigation />
      
      {/* Hero */}
      <section className={`bg-gradient-to-r from-${post.color}-600 to-${post.color}-800 text-white py-16`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm font-medium text-white/80">{post.category}</span>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-white/90">{post.description}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>
          
          {/* CTA */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Stay Safe with LSafe</h3>
            <p className="text-gray-600 mb-6">
              Put this knowledge into practice. Scan any suspicious URL before clicking.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <Shield className="w-5 h-5" />
              Scan a URL Now
            </Link>
          </div>
          
          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map(postSlug => {
                  const relatedPost = blogPosts[postSlug];
                  if (!relatedPost) return null;
                  const RelatedIcon = relatedPost.icon;
                  return (
                    <Link 
                      key={postSlug}
                      to={`/blog/${postSlug}`}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <RelatedIcon className="w-6 h-6 text-gray-600" />
                        <span className="text-sm text-gray-500">{relatedPost.category}</span>
                      </div>
                      <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

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

export default BlogPost;
