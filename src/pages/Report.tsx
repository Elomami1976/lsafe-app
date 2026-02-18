
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import AdSenseControl from '../components/AdSenseControl';
import {
  VerdictSection,
  ChecksSection,
  RedirectsSection,
  DnsSection,
  TlsSection,
  HeadersSection,
  MetadataSection,
  RiskSafetySection
} from '../components/ReportSections';
import { Share2, FileText, AlertTriangle, RefreshCw, Shield, CheckCircle, Lock, Search } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
// Dynamically import html2pdf.js for PDF export
const exportToPDF = async (elementId: string, filename: string) => {
  const html2pdf = (await import('html2pdf.js')).default;
  const element = document.getElementById(elementId);
  if (element) {
    html2pdf().from(element).set({ filename }).save();
  }
};

const CHECK_OPTIONS = [
  { id: 'phishing', label: 'Phishing Detection' },
  { id: 'malware', label: 'Malware Heuristics' },
  { id: 'typosquat', label: 'Typo-squatting' },
  { id: 'reputation', label: 'Reputation Database' },
  { id: 'dns', label: 'DNS Records' },
  { id: 'tls', label: 'TLS/SSL' },
  { id: 'headers', label: 'Security Headers' },
  { id: 'metadata', label: 'Page Metadata' },
];

const Report: React.FC = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') || '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const [selectedChecks, setSelectedChecks] = useState<string[]>(CHECK_OPTIONS.map(opt => opt.id));
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('Initializing scan...');

  // Determine API base URL:
  // - In dev: use localhost:3001
  // - In production: use VITE_API_URL env variable (e.g. your Render.com URL), or fallback to relative path
  const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3001');

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setScanProgress(0);

    // Progress animation while the real scan runs
    const steps = [
      { progress: 10, text: 'Resolving DNS records...' },
      { progress: 25, text: 'Inspecting TLS certificate...' },
      { progress: 40, text: 'Fetching HTTP headers...' },
      { progress: 55, text: 'Checking malware databases...' },
      { progress: 70, text: 'Running WHOIS lookup...' },
      { progress: 85, text: 'Analyzing URL patterns...' },
      { progress: 95, text: 'Computing risk score...' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScanProgress(steps[currentStep].progress);
        setScanStep(steps[currentStep].text);
        currentStep++;
      }
    }, 800);

    // Call the real backend API
    fetch(`${API_BASE}/api/scan?url=${encodeURIComponent(url)}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        clearInterval(interval);
        setScanProgress(100);
        setScanStep('Scan complete!');
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        clearInterval(interval);
        setError(err.message || 'Failed to scan URL');
        setLoading(false);
      });

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [url, selectedChecks]);

  if (!url) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageSEO
        title="URL Security Report - LSafe Scanner"
        description="View detailed URL security reports from LSafe. Get comprehensive threat analysis, SSL checks, and safety scores for any link."
      />
      <AdSenseControl enabled={false} />
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">URL Security Report</h1>
          <p className="text-lg text-gray-600 mb-6">No URL was provided for scanning. Enter a URL on our homepage to get a detailed security analysis.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition">
            <Search className="w-5 h-5" />
            Scan a URL Now
          </a>
        </div>

        {/* Educational content to ensure page has substantial publisher content */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              What Is URL Security Scanning?
            </h2>
            <p className="text-gray-600 mb-3">
              URL security scanning is the process of analyzing a web address to determine whether it's safe to visit. Our scanner checks for phishing attempts, malware distribution, domain reputation issues, and other security threats.
            </p>
            <p className="text-gray-600">
              By scanning a URL before clicking, you can protect yourself from identity theft, financial fraud, ransomware infections, and other cyber threats that target unsuspecting internet users.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              How Our Reports Work
            </h2>
            <p className="text-gray-600 mb-3">
              Each LSafe report provides a comprehensive security assessment including a risk score from 0 to 100, HTTPS encryption status, domain reputation analysis, and threat detection results.
            </p>
            <p className="text-gray-600">
              We cross-reference URLs against multiple security databases and use advanced heuristic analysis to detect phishing patterns, suspicious redirects, and known malicious domains.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Tips to Stay Safe Online</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>Always check that websites use HTTPS encryption before entering personal information or login credentials.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <span>Be cautious of links received in unsolicited emails, text messages, or social media messages — even if they appear to come from trusted sources.</span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Use a URL scanner like LSafe to verify suspicious links before clicking. It only takes a few seconds and could prevent a security incident.</span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Keep your browser and operating system updated to benefit from the latest security patches and built-in protection features.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AdSenseControl enabled={false} />
      <Navigation />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            {/* Scanner Animation */}
            <div className="flex flex-col items-center justify-center space-y-6">
              {/* Animated Scanner Icon */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-spin"></div>
                <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              
              {/* Scanning Text */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Scanning URL</h2>
                <p className="text-blue-600 font-medium">{scanStep}</p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full">
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Progress</span>
                  <span className="font-semibold">{scanProgress}%</span>
                </div>
              </div>
              
              {/* URL Being Scanned */}
              <div className="w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Analyzing:</p>
                <p className="text-gray-900 font-mono text-sm break-all">{url}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdSenseControl enabled={false} />
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-500 mb-8">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-red-100 rounded-full text-red-600">
               <AlertTriangle size={24} />
             </div>
             <h2 className="text-xl font-bold text-gray-800">Scan Failed</h2>
          </div>
          <p className="text-red-600 font-medium mb-2">{error}</p>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            The URL could not be scanned. This might be because the server is unreachable, or the URL itself is down.
            Please verify the link and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full flex justify-center items-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
          >
            <RefreshCw size={16} /> Try Again
          </button>
        </div>

        {/* Additional content so the page isn't content-thin */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Why Did the Scan Fail?</h2>
          <p className="text-gray-600 mb-4">
            URL scans can fail for several reasons. Here are the most common causes and how to resolve them:
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-800">Invalid URL Format:</strong> Make sure the URL includes the protocol (https:// or http://) and is spelled correctly.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-800">Server Unreachable:</strong> The website's server may be temporarily down or blocking requests from security scanners.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-800">Network Issues:</strong> Check your internet connection and try again in a few moments.
              </div>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <a href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <Search className="w-5 h-5" />
            Try scanning a different URL
          </a>
        </div>
      </div>
    </div>
  );
  if (!report) return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdSenseControl enabled={false} />
      <Navigation />
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <Shield className="mx-auto h-16 w-16 text-blue-600 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Preparing Your Report…</h1>
        <p className="text-gray-600 mb-6">We're finishing the analysis. This should only take a moment.</p>
      </div>
    </div>
  );

  // Copy, Download, PDF, and Share handlers
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
  };
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lsafe-report-${report.normalizedUrl?.replace(/[^a-zA-Z0-9]/g, '_') || 'report'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleExportPDF = () => {
    exportToPDF('lsafe-report-content', `lsafe-report-${report.normalizedUrl?.replace(/[^a-zA-Z0-9]/g, '_') || 'report'}.pdf`);
  };
  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LSafe URL Safety Report',
          text: `Check out this URL safety report for ${report.normalizedUrl}`,
          url: shareUrl
        });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 flex flex-col font-sans">
      <PageSEO
        title="URL Security Report - LSafe Scanner"
        description="View detailed URL security reports from LSafe. Get comprehensive threat analysis, SSL checks, and safety scores for any link."
      />
      <AdSenseControl enabled={true} />
      <Navigation />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Security Scanning Report</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 break-all bg-gray-50 p-2 rounded border border-gray-100">
                <span className="font-mono">{report.normalizedUrl}</span>
              </div>
            </div>
          </div>

          <Tooltip id="lsafe-tooltip" effect="solid" className="max-w-xs z-50" />

          {/* Actions Toolbar */}
          <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Report Actions">
             <button onClick={handleCopy} className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium transition flex items-center gap-2">Copy JSON</button>
             <button onClick={handleDownload} className="px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 text-sm font-medium transition flex items-center gap-2">Download JSON</button>
             <button onClick={handleExportPDF} className="px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-sm font-medium transition flex items-center gap-2"><FileText size={16}/> Save as PDF</button>
             <button onClick={handleShare} className="px-4 py-2 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-sm font-medium transition flex items-center gap-2"><Share2 size={16}/> Share</button>
          </div>

          {/* Report Body */}
          <div id="lsafe-report-content" className="space-y-8">
            <VerdictSection
              verdict={report.verdict}
              score={report.score}
              confidence={report.confidence}
              summary={report.summary}
              scannedAt={report.scannedAt}
            />
            
            {/* Network Overview Section */}
            {report.network && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Domain Reputation</h3>
                  <p className="text-sm text-gray-600 mb-2">Based on overall scan verdict</p>
                  <div className={`mt-2 text-2xl font-bold ${
                    report.network.domainReputation === 'Good' ? 'text-green-600' :
                    report.network.domainReputation === 'Questionable' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {report.network.domainReputation}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">IP Address</h3>
                  <p className="text-sm text-gray-600 mb-2">Simulated IP (client-side)</p>
                  <div className="mt-2 text-2xl font-bold text-gray-900 font-mono break-all">
                    {report.network.resolvedIp}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Server Location</h3>
                  <p className="text-sm text-gray-600 mb-2">Estimated location</p>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {report.network.location}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hosting Provider</h3>
                  <p className="text-sm text-gray-600 mb-2">Estimated provider</p>
                  <div className="mt-2 text-2xl font-bold text-gray-900">
                    {report.network.provider}
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 gap-8">
                <ChecksSection checks={report.checks || []} />
                {report.redirects && report.redirects.length > 0 && <RedirectsSection redirects={report.redirects} />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {report.dns && <DnsSection dns={report.dns} />}
                    {report.tls && <TlsSection tls={report.tls} />}
                </div>
                {report.headers && <HeadersSection headers={report.headers} />}
                {report.metadata && <MetadataSection metadata={report.metadata} />}
                <RiskSafetySection riskFactors={report.riskFactors || []} safetyFactors={report.safetyFactors || []} />
            </div>
          </div>

          {/* Feedback */}
          <div className="mt-12 pt-8 border-t border-gray-100">
             <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Report Feedback</h4>
             <div className="flex flex-col sm:flex-row gap-3">
                <textarea
                  className="flex-grow border border-gray-300 rounded-lg p-3 text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={2}
                  placeholder="Is this report accurate? Let us know any issues..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  disabled={feedbackSent}
                />
                <button
                  className={`self-end sm:self-center px-6 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
                      !feedback.trim() || feedbackSent ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                  disabled={!feedback.trim() || feedbackSent}
                  onClick={() => {
                    setFeedbackSent(true);
                    setTimeout(() => setFeedbackSent(false), 3000);
                    setFeedback('');
                    alert('Thank you for your feedback!');
                  }}
                >{feedbackSent ? 'Sent!' : 'Send Feedback'}</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Report;
