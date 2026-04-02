import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import { Shield, Users, Globe, CheckCircle, Database, Zap, Lock, TrendingUp, Award } from 'lucide-react';

const LSaveLogo = '/LSave4.png';

const About: React.FC = () => {
  return (
    <motion.div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <PageSEO
        title="About LSafe - Our Mission to Make the Web Safer"
        description="Learn about LSafe, the free URL security scanner. Our mission is to protect users from phishing, malware, and online threats with real-time link checking."
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <motion.div 
          className="container mx-auto px-4 text-center relative z-10 py-20"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl"></div>
              <div className="relative glass rounded-2xl p-4 shadow-glow-blue">
                <img src={LSaveLogo} alt="LSafe Logo" className="h-20 w-20" />
              </div>
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-black mb-6 text-white">
            About <span className="gradient-text">LSafe</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to making the internet safer by providing enterprise-grade URL security analysis that's accessible to everyone, everywhere.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our <span className="gradient-text">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              In an era where cyber threats are constantly evolving, LSafe stands as your first line of defense against malicious URLs. We believe everyone deserves access to professional-grade security tools without compromising their privacy.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, color: 'blue', gradient: 'from-blue-500 to-cyan-500', title: 'Security First', desc: 'We prioritize your security and privacy above all else, using industry-leading threat intelligence to protect you from online dangers.' },
              { icon: Users, color: 'green', gradient: 'from-green-500 to-emerald-500', title: 'User-Centric', desc: 'Our tools are designed with real users in mind - simple, fast, and effective without requiring technical expertise.' },
              { icon: Globe, color: 'purple', gradient: 'from-purple-500 to-pink-500', title: 'Global Impact', desc: "We're building a safer internet for everyone, one URL scan at a time, protecting users worldwide from cyber threats." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-10 text-center group"
              >
                <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            What We <span className="gradient-text">Do</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Advanced Threat Detection</h3>
              <ul className="space-y-6">
                {[
                  { title: 'Real-Time Analysis', desc: 'Instant URL scanning using multiple security databases and threat intelligence sources.' },
                  { title: 'Multi-Layer Security', desc: 'Comprehensive checks including malware detection, phishing analysis, and domain reputation.' },
                  { title: 'Privacy Protection', desc: 'Zero logging policy - we never store, track, or share the URLs you scan.' },
                ].map((item, index) => (
                  <motion.li 
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-lg">{item.title}</div>
                      <div className="text-gray-600 dark:text-gray-400">{item.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10"
            >
              <h3 className="text-xl font-bold mb-8 text-gray-900 dark:text-white">Security Metrics</h3>
              <div className="space-y-6">
                {[
                  { label: 'Threat Detection Rate', value: '99.2%', color: 'green' },
                  { label: 'False Positive Rate', value: '<0.1%', color: 'blue' },
                  { label: 'Average Scan Time', value: '<3 seconds', color: 'purple' },
                  { label: 'Security Databases', value: '15+ Sources', color: 'orange' },
                ].map((metric, index) => (
                  <motion.div 
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-gray-700 dark:text-gray-300">{metric.label}</span>
                    <span className={`text-${metric.color}-500 font-bold text-xl`}>{metric.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Technology */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Scanning <span className="gradient-text">Technology</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              LSafe uses a comprehensive multi-layered approach to analyze URLs and detect potential security threats. Our technology combines advanced algorithms, threat intelligence databases, and real-time analysis to provide accurate security assessments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-500/20"
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                How Our Scanner Works
              </h3>
              <div className="space-y-6">
                {[
                  { title: '1. DNS & Domain Analysis', desc: 'We check domain registration, age, SSL certificates, and DNS records to verify legitimacy.' },
                  { title: '2. Pattern Recognition', desc: 'Advanced algorithms detect suspicious patterns like phishing keywords, IP addresses instead of domains, and URL obfuscation techniques.' },
                  { title: '3. Threat Intelligence', desc: 'Cross-reference with multiple security databases including Google Safe Browsing, VirusTotal, and other threat feeds.' },
                  { title: '4. Risk Scoring', desc: 'Calculate a comprehensive risk score based on multiple security factors to provide clear safety ratings.' },
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-500/20"
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                What We Check For
              </h3>
              <ul className="space-y-5">
                {[
                  { title: 'Phishing & Fraud', desc: 'Fake login pages, impersonation sites, and social engineering attacks' },
                  { title: 'Malware Distribution', desc: 'Sites hosting viruses, trojans, ransomware, and other malicious software' },
                  { title: 'Suspicious URLs', desc: 'Shortened links, suspicious patterns, and potentially harmful redirects' },
                  { title: 'Domain Reputation', desc: 'Check domain age, registration details, and historical security incidents' },
                  { title: 'Security Best Practices', desc: 'HTTPS encryption, valid SSL certificates, and secure configurations' },
                ].map((item, index) => (
                  <motion.li 
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{item.title}</div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Database, color: 'blue', gradient: 'from-blue-500 to-cyan-500', title: 'Threat Intelligence', desc: 'Real-time feeds from multiple security vendors and research organizations.' },
              { icon: Zap, color: 'yellow', gradient: 'from-yellow-500 to-orange-500', title: 'Fast Processing', desc: 'Optimized algorithms for lightning-fast URL analysis and risk assessment.' },
              { icon: Lock, color: 'green', gradient: 'from-green-500 to-emerald-500', title: 'Privacy by Design', desc: 'Built from the ground up with privacy protection as a core principle.' },
              { icon: TrendingUp, color: 'purple', gradient: 'from-purple-500 to-pink-500', title: 'Continuous Learning', desc: 'Our systems continuously adapt to new threats and attack patterns.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-8 text-center group"
              >
                <div className={`bg-gradient-to-br ${item.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Our <span className="gradient-text">Commitment</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Trusted Security, Transparent Operations</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              We're committed to providing honest, reliable security assessments without false claims or misleading metrics. Our goal is to earn your trust through consistent, accurate results and complete transparency about our capabilities and limitations.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'No False Claims', desc: 'We provide honest assessments based on available data, not marketing hype.' },
                { title: 'Open About Limitations', desc: 'We clearly explain what our scans can and cannot detect.' },
                { title: 'Continuous Improvement', desc: 'We constantly work to improve our detection capabilities and user experience.' },
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <h4 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Have questions about LSafe or need help with URL security? We're here to help make the internet safer for everyone.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-10"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">For all inquiries, support, and questions:</p>
            <a 
              href="mailto:support@lsafe.io" 
              className="inline-block text-3xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              support@lsafe.io
            </a>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-6">We typically respond within 24-48 hours</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">© 2026 LSafe. All rights reserved. Built with security in mind.</p>
          <p className="mt-2 text-gray-600">Built by Tarek Elomami</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default About;
