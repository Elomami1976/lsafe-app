import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { Shield, AlertTriangle, Lock, Mail, Globe, Smartphone, CreditCard, Users, BookOpen, Clock, ChevronRight } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const blogPosts = [
  {
    id: 'phishing-attacks',
    title: 'How to Identify and Avoid Phishing Attacks in 2026',
    excerpt: 'Learn the latest techniques cybercriminals use to steal your personal information and how to protect yourself from sophisticated phishing schemes.',
    icon: Mail,
    color: 'red',
    readTime: '8 min read',
    category: 'Threat Prevention',
    content: `
      Phishing attacks have evolved dramatically in recent years. What once were obvious scam emails with poor grammar are now sophisticated attacks that can fool even tech-savvy users.

      **Common Signs of Phishing:**
      - Urgent language creating panic ("Your account will be closed!")
      - Mismatched or suspicious sender email addresses
      - Generic greetings instead of your actual name
      - Requests for sensitive information via email
      - Links that don't match the supposed sender's domain
      - Attachments from unknown sources

      **How to Protect Yourself:**
      1. Always verify sender email addresses carefully
      2. Hover over links before clicking to see the actual URL
      3. Never provide passwords or financial info via email
      4. Use LSafe to scan suspicious links before clicking
      5. Enable two-factor authentication on all accounts
      6. Keep your software and browsers updated

      **Real-World Example:**
      A common 2026 phishing technique involves fake delivery notifications. Scammers send emails appearing to be from major shipping companies, claiming your package couldn't be delivered. The link leads to a fake site that harvests your login credentials.

      Always scan uncertain links with LSafe before clicking!
    `
  },
  {
    id: 'malware-protection',
    title: 'Complete Guide to Malware Protection for Everyday Users',
    excerpt: 'Understanding different types of malware and implementing effective protection strategies to keep your devices and data safe.',
    icon: Shield,
    color: 'blue',
    readTime: '10 min read',
    category: 'Security Basics',
    content: `
      Malware, short for malicious software, encompasses various threats designed to damage, disrupt, or gain unauthorized access to your devices and data.

      **Types of Malware:**
      
      **Viruses** - Programs that attach to legitimate files and spread when those files are shared.
      
      **Ransomware** - Encrypts your files and demands payment for the decryption key.
      
      **Spyware** - Secretly monitors your activities and collects personal information.
      
      **Trojans** - Disguised as legitimate software but contain hidden malicious code.
      
      **Adware** - Displays unwanted advertisements and can slow down your device.

      **Protection Strategies:**
      1. Keep your operating system and software updated
      2. Use reputable antivirus software with real-time protection
      3. Be cautious when downloading files from the internet
      4. Scan URLs with LSafe before visiting unknown websites
      5. Regularly back up your important data
      6. Use strong, unique passwords for all accounts
      7. Avoid clicking on pop-up advertisements

      **Warning Signs of Infection:**
      - Slow computer performance
      - Unexpected pop-ups or advertisements
      - Programs crashing frequently
      - Unknown programs starting automatically
      - Increased network activity
    `
  },
  {
    id: 'safe-online-shopping',
    title: 'Safe Online Shopping: Protect Your Money and Identity',
    excerpt: 'Essential tips for secure e-commerce transactions and how to identify legitimate online stores from fraudulent ones.',
    icon: CreditCard,
    color: 'green',
    readTime: '7 min read',
    category: 'Online Safety',
    content: `
      Online shopping convenience comes with risks. Cybercriminals create fake stores and scam sites to steal your payment information and personal data.

      **Before You Buy - Security Checklist:**
      
      ✓ Check for HTTPS in the URL (padlock icon)
      ✓ Research the store's reputation and reviews
      ✓ Look for clear contact information and return policies
      ✓ Verify the URL matches the official store name
      ✓ Scan the URL with LSafe for known threats
      
      **Red Flags of Fake Online Stores:**
      - Prices that seem too good to be true
      - Poor website design or broken images
      - No physical address or phone number
      - Only accepting wire transfers or cryptocurrency
      - Recently registered domain names
      - Missing or fake customer reviews
      - No social media presence

      **Safe Payment Practices:**
      1. Use credit cards instead of debit cards (better fraud protection)
      2. Consider virtual card numbers for online purchases
      3. Never save payment information on unfamiliar sites
      4. Enable transaction alerts on your accounts
      5. Use PayPal or similar services for added protection
      6. Monitor your statements regularly for unauthorized charges

      **If You've Been Scammed:**
      - Contact your bank immediately to dispute the charge
      - Report the website to the FTC and local authorities
      - Change passwords if you created an account
      - Monitor your credit report for suspicious activity
    `
  },
  {
    id: 'social-media-security',
    title: 'Social Media Security: Protecting Your Digital Identity',
    excerpt: 'How to maintain privacy and security on social platforms while avoiding common threats targeting social media users.',
    icon: Users,
    color: 'purple',
    readTime: '9 min read',
    category: 'Privacy',
    content: `
      Social media platforms are treasure troves of personal information that cybercriminals exploit for identity theft, scams, and targeted attacks.

      **Privacy Settings to Review:**
      
      - Who can see your posts and profile information
      - Who can send you friend/follow requests
      - Whether your profile appears in search engines
      - App permissions and connected services
      - Location sharing settings
      - Two-factor authentication options

      **Common Social Media Threats:**

      **Impersonation Scams** - Criminals create fake profiles pretending to be friends or family, then request money or personal information.

      **Romance Scams** - Fake romantic interests build relationships over time before requesting financial help.

      **Quiz and App Scams** - Fun-looking quizzes that actually harvest your personal data for identity theft.

      **Fake Giveaways** - Posts claiming you've won prizes that require personal information or payment to claim.

      **Malicious Links** - Shortened URLs in posts or messages leading to phishing sites or malware downloads.

      **Best Practices:**
      1. Think before you share personal information
      2. Verify friend requests from people you know in person
      3. Use LSafe to check suspicious links before clicking
      4. Enable login notifications
      5. Regularly review and revoke app permissions
      6. Use unique passwords for each platform
      7. Be skeptical of unsolicited messages
    `
  },
  {
    id: 'mobile-device-security',
    title: 'Mobile Device Security: Keeping Your Smartphone Safe',
    excerpt: 'Comprehensive guide to protecting your smartphone from threats, securing your apps, and maintaining mobile privacy.',
    icon: Smartphone,
    color: 'orange',
    readTime: '8 min read',
    category: 'Device Security',
    content: `
      Your smartphone contains more personal information than any other device. From banking apps to personal photos, protecting your mobile device is crucial.

      **Essential Security Measures:**

      **Screen Lock** - Use biometrics (fingerprint/face) combined with a strong PIN or password.

      **Software Updates** - Install OS and app updates promptly as they often contain security patches.

      **App Permissions** - Review and limit what apps can access (camera, microphone, location, contacts).

      **App Sources** - Only download apps from official stores (Google Play, Apple App Store).

      **Secure Connections:**
      - Avoid public WiFi for sensitive activities
      - Use a VPN when connecting to public networks
      - Disable Bluetooth when not in use
      - Turn off auto-connect for WiFi networks

      **Protecting Your Data:**
      1. Enable device encryption
      2. Set up remote wipe capabilities
      3. Regular backups to secure cloud storage
      4. Use secure messaging apps with end-to-end encryption
      5. Be cautious with QR codes - scan the resulting URL with LSafe

      **Signs Your Phone May Be Compromised:**
      - Battery draining faster than usual
      - Unexpected data usage spikes
      - Apps you didn't install
      - Unusual account activity
      - Phone running hot when idle
      - Strange texts or calls in your history
    `
  },
  {
    id: 'password-security',
    title: 'Password Security: Creating and Managing Strong Passwords',
    excerpt: 'Master the art of creating unbreakable passwords and learn about password managers to keep your accounts secure.',
    icon: Lock,
    color: 'indigo',
    readTime: '6 min read',
    category: 'Security Basics',
    content: `
      Passwords remain the first line of defense for your online accounts. Weak or reused passwords are responsible for the majority of account breaches.

      **What Makes a Strong Password:**
      - At least 12 characters long (16+ is better)
      - Mix of uppercase, lowercase, numbers, and symbols
      - No personal information (birthdays, names, addresses)
      - No common words or patterns
      - Unique for each account

      **Password Creation Strategies:**

      **Passphrase Method** - Combine random words with numbers and symbols:
      "Coffee$Mountain7!Bicycle#Rain"

      **Sentence Method** - Create a phrase and use first letters:
      "I love eating 2 pizzas on Friday nights!" → "Ile2poFn!"

      **Password Managers:**
      Using a password manager is the most secure approach:
      - Generates strong, unique passwords
      - Securely stores all your passwords
      - Auto-fills login forms
      - Syncs across devices
      - Only requires remembering one master password

      **Two-Factor Authentication (2FA):**
      Always enable 2FA when available:
      1. Authenticator apps (most secure)
      2. SMS codes (better than nothing)
      3. Hardware keys (enterprise-level security)
      4. Biometric verification

      **What to Do If Your Password Is Compromised:**
      - Change it immediately on the affected account
      - Change it on any accounts using the same password
      - Enable 2FA if not already active
      - Monitor the account for suspicious activity
      - Consider a password manager going forward
    `
  }
];

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <PageSEO
        title="Security Blog & Guides - LSafe | Online Security Tips"
        description="Expert guides on online security, phishing prevention, malware protection, and internet safety. Learn how to protect yourself from cyber threats with LSafe."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <BookOpen className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-6">Security Blog & Guides</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Expert articles and comprehensive guides to help you stay safe online. 
            Learn about the latest threats and how to protect yourself from cybercriminals.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                  <AlertTriangle className="h-16 w-16" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Featured Article
                </span>
                <h2 className="text-3xl font-bold mb-3">How to Identify and Avoid Phishing Attacks in 2026</h2>
                <p className="text-lg opacity-90 mb-4">
                  Phishing attacks are becoming more sophisticated. Learn the latest techniques and protect yourself.
                </p>
                <Link to="/blog/phishing-attacks" className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Read Full Guide <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Latest Security Guides</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const IconComponent = post.icon;
              const colorClasses: Record<string, string> = {
                red: 'bg-red-100 text-red-600',
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
                orange: 'bg-orange-100 text-orange-600',
                indigo: 'bg-indigo-100 text-indigo-600',
              };
              
              return (
                <article key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition group">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`rounded-lg p-3 ${colorClasses[post.color]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{post.category}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition"
                    >
                      Read More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">Quick Security Tips</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Simple actions you can take right now to improve your online security
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Scan Before Click</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Always use LSafe to check suspicious links before clicking them.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Enable 2FA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Add two-factor authentication to all your important accounts.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Update Software</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Keep your devices and apps updated to protect against vulnerabilities.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
              <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Verify Senders</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Always verify email sender addresses before clicking any links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Stay Protected with LSafe</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Knowledge is your first defense. Use LSafe's free URL scanner to verify any suspicious links.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            <Shield className="w-5 h-5" />
            Scan a URL Now
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

export default Blog;
