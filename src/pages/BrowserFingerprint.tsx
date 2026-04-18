import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import {
  Fingerprint, Monitor, Globe, Shield, Eye, Cpu, Copy,
  CheckCircle, RefreshCw, Wifi, Layers, AlertTriangle,
} from 'lucide-react';

// ── Canvas fingerprint ────────────────────────────────────────────────────────
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 60;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'N/A';
    ctx.textBaseline = 'top';
    ctx.font = "16px 'Arial'";
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('LSafe🔒🛡️', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.8)';
    ctx.fillText('LSafe🔒🛡️', 4, 18);
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(100, 40, 20, 0, Math.PI * 2);
    ctx.fill();
    const data = canvas.toDataURL();
    let h = 0;
    for (let i = 0; i < data.length; i++) {
      h = Math.imul(31, h) + data.charCodeAt(i) | 0;
    }
    return Math.abs(h).toString(16).padStart(8, '0').toUpperCase();
  } catch {
    return 'N/A';
  }
}

// ── WebGL info ────────────────────────────────────────────────────────────────
function getWebGL(): { vendor: string; renderer: string } {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return { vendor: 'Not supported', renderer: 'Not supported' };
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      return {
        vendor: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || 'N/A',
        renderer: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'N/A',
      };
    }
    return {
      vendor: gl.getParameter(gl.VENDOR) || 'N/A',
      renderer: gl.getParameter(gl.RENDERER) || 'N/A',
    };
  } catch {
    return { vendor: 'Error', renderer: 'Error' };
  }
}

// ── Simple djb2-style hash ────────────────────────────────────────────────────
function hashString(str: string): string {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(33, h) ^ str.charCodeAt(i);
  }
  return (h >>> 0).toString(16).padStart(8, '0').toUpperCase();
}

interface FingerprintData {
  userAgent: string;
  platform: string;
  language: string;
  languages: string;
  screenResolution: string;
  availableResolution: string;
  colorDepth: string;
  pixelRatio: string;
  timezone: string;
  timezoneOffset: string;
  cookiesEnabled: boolean;
  doNotTrack: string;
  hardwareConcurrency: string;
  deviceMemory: string;
  maxTouchPoints: string;
  plugins: string[];
  canvasHash: string;
  webglVendor: string;
  webglRenderer: string;
  connectionType: string;
  onLine: boolean;
  sessionStorage: boolean;
  localStorage: boolean;
  indexedDB: boolean;
  fingerprintHash: string;
}

const BrowserFingerprint: React.FC = () => {
  const [data, setData] = useState<FingerprintData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const collectFingerprint = () => {
    setLoading(true);
    // Small delay so loading state is visible
    setTimeout(() => {
      const canvasHash = getCanvasFingerprint();
      const webgl = getWebGL();
      const nav = navigator as Navigator & Record<string, unknown>;
      const conn = (nav.connection || nav.mozConnection || nav.webkitConnection) as Record<string, unknown> | undefined;

      const plugins: string[] = [];
      for (let i = 0; i < Math.min((navigator.plugins?.length ?? 0), 10); i++) {
        plugins.push(navigator.plugins[i].name);
      }

      let ssAvailable = false;
      let lsAvailable = false;
      let idbAvailable = false;
      try { sessionStorage.setItem('_fp', '1'); sessionStorage.removeItem('_fp'); ssAvailable = true; } catch { /* */ }
      try { localStorage.setItem('_fp', '1'); localStorage.removeItem('_fp'); lsAvailable = true; } catch { /* */ }
      try { idbAvailable = !!window.indexedDB; } catch { /* */ }

      const fp: Omit<FingerprintData, 'fingerprintHash'> = {
        userAgent: navigator.userAgent,
        platform: navigator.platform || 'N/A',
        language: navigator.language,
        languages: (navigator.languages ?? [navigator.language]).join(', '),
        screenResolution: `${screen.width} × ${screen.height}`,
        availableResolution: `${screen.availWidth} × ${screen.availHeight}`,
        colorDepth: `${screen.colorDepth} bits`,
        pixelRatio: String(window.devicePixelRatio ?? 1),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timezoneOffset: `UTC${-new Date().getTimezoneOffset() / 60 >= 0 ? '+' : ''}${-new Date().getTimezoneOffset() / 60}`,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack ?? 'N/A',
        hardwareConcurrency: String(navigator.hardwareConcurrency ?? 'N/A'),
        deviceMemory: (nav.deviceMemory != null ? `${nav.deviceMemory} GB` : 'N/A'),
        maxTouchPoints: String(navigator.maxTouchPoints ?? 0),
        plugins,
        canvasHash,
        webglVendor: webgl.vendor,
        webglRenderer: webgl.renderer,
        connectionType: (conn?.effectiveType as string) ?? 'N/A',
        onLine: navigator.onLine,
        sessionStorage: ssAvailable,
        localStorage: lsAvailable,
        indexedDB: idbAvailable,
      };

      const fingerprintHash = hashString(JSON.stringify(fp));
      setData({ ...fp, fingerprintHash });
      setLoading(false);
    }, 600);
  };

  useEffect(() => { collectFingerprint(); }, []);

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Estimate uniqueness based on rare attributes
  const getUniquenessScore = (): number => {
    if (!data) return 0;
    let score = 45;
    if (parseFloat(data.pixelRatio) > 1) score += 10;
    if (parseInt(data.maxTouchPoints) > 0) score += 8;
    if (data.deviceMemory !== 'N/A') score += 5;
    if (data.connectionType !== 'N/A') score += 5;
    score += Math.min(data.plugins.length * 3, 15);
    if (data.doNotTrack === '1') score -= 8;
    if (data.webglRenderer.includes('NVIDIA') || data.webglRenderer.includes('AMD')) score += 7;
    return Math.min(Math.max(score, 5), 99);
  };

  const uniqueness = data ? getUniquenessScore() : 0;
  const uniquenessLabel = uniqueness >= 80 ? 'Highly Unique' : uniqueness >= 60 ? 'Fairly Unique' : uniqueness >= 40 ? 'Moderately Unique' : 'Common';
  const uniquenessColor = uniqueness >= 80 ? 'text-red-500' : uniqueness >= 60 ? 'text-orange-500' : uniqueness >= 40 ? 'text-yellow-500' : 'text-green-500';

  const Row = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) => (
    <div className="flex justify-between gap-4 py-2.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0 w-40">{label}</span>
      <span
        className={`text-sm text-gray-900 dark:text-white text-right truncate max-w-xs ${mono ? 'font-mono text-xs' : ''}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
    >
      <PageSEO
        title="Browser Fingerprint Test — Check Your Digital Identity | LSafe"
        description="Free browser fingerprint test. See what unique data websites silently collect about you: canvas fingerprint, WebGL renderer, screen info, timezone, and more."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20 shadow-glow-blue">
              <Fingerprint className="w-14 h-14 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Browser <span className="text-yellow-300">Fingerprint</span> Test
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Discover exactly what data websites silently collect about you. Your browser leaves a unique
            digital fingerprint — expose it now.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mt-6">
            {['100% Private', 'No Server Calls', 'Instant Results'].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-white/90 text-sm">
                <CheckCircle className="w-3.5 h-3.5 text-green-300" /> {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {loading ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center gap-3 text-purple-600 dark:text-purple-400 text-lg font-medium">
              <RefreshCw className="w-6 h-6 animate-spin" />
              Collecting fingerprint data…
            </div>
          </div>
        ) : data ? (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">

            {/* Summary card */}
            <motion.div
              variants={fadeInUp}
              className="glass-card p-8 text-center bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-violet-200/50 dark:border-violet-500/30"
            >
              <p className="text-xs font-bold text-violet-500 dark:text-violet-400 uppercase tracking-widest mb-3">
                Your Fingerprint Hash
              </p>
              <div className="font-mono text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-widest mb-6">
                {data.fingerprintHash}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                <div>
                  <div className={`text-3xl font-black ${uniquenessColor}`}>{uniqueness}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Uniqueness</div>
                </div>
                <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                <div>
                  <div className={`text-xl font-bold ${uniquenessColor}`}>{uniquenessLabel}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Assessment</div>
                </div>
                <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 hidden sm:block" />
                <div>
                  <div className="text-3xl font-black text-blue-500 font-mono">{data.canvasHash}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Canvas Hash</div>
                </div>
              </div>

              {/* Uniqueness bar */}
              <div className="max-w-sm mx-auto mb-6">
                <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uniqueness}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      uniqueness >= 80 ? 'bg-red-500' : uniqueness >= 60 ? 'bg-orange-500' : uniqueness >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Higher = more trackable across sessions without cookies
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Full Report'}
                </button>
                <button
                  onClick={collectFingerprint}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </motion.div>

            {/* Data grid */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Browser & System */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-blue-500" /> Browser & System
                </h2>
                <Row label="User Agent" value={data.userAgent} mono />
                <Row label="Platform" value={data.platform} />
                <Row label="Language" value={data.language} />
                <Row label="All Languages" value={data.languages} />
                <Row label="Hardware Threads" value={data.hardwareConcurrency} />
                <Row label="Device Memory" value={data.deviceMemory} />
                <Row label="Touch Points" value={data.maxTouchPoints} />
                <Row label="Online" value={data.onLine ? '✅ Yes' : '❌ No'} />
              </motion.div>

              {/* Screen & Privacy */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-500" /> Screen & Privacy
                </h2>
                <Row label="Resolution" value={data.screenResolution} />
                <Row label="Available" value={data.availableResolution} />
                <Row label="Color Depth" value={data.colorDepth} />
                <Row label="Pixel Ratio" value={data.pixelRatio} />
                <Row label="Timezone" value={data.timezone} />
                <Row label="UTC Offset" value={data.timezoneOffset} />
                <Row label="Cookies" value={data.cookiesEnabled ? '✅ Enabled' : '❌ Disabled'} />
                <Row label="Do Not Track" value={data.doNotTrack === '1' ? '✅ On' : data.doNotTrack === '0' ? '❌ Off' : '❓ Not Set'} />
                <Row label="Network Type" value={data.connectionType} />
              </motion.div>

              {/* Graphics */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-orange-500" /> Graphics (WebGL)
                </h2>
                <Row label="Canvas Hash" value={data.canvasHash} mono />
                <Row label="WebGL Vendor" value={data.webglVendor} />
                <Row label="WebGL Renderer" value={data.webglRenderer} />
              </motion.div>

              {/* Storage & Plugins */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-500" /> Storage & Plugins
                </h2>
                <Row label="LocalStorage" value={data.localStorage ? '✅ Available' : '❌ Blocked'} />
                <Row label="SessionStorage" value={data.sessionStorage ? '✅ Available' : '❌ Blocked'} />
                <Row label="IndexedDB" value={data.indexedDB ? '✅ Available' : '❌ Blocked'} />
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Browser Plugins ({data.plugins.length})
                  </p>
                  {data.plugins.length > 0 ? (
                    <div className="space-y-1.5">
                      {data.plugins.map(p => (
                        <div key={p} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No plugins detected</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* What this means */}
            <motion.div variants={fadeInUp} className="glass-card p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200/50 dark:border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">What This Means</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Websites combine these attributes to create a unique profile that can track you <strong>without cookies</strong>.
                    Even if you clear your cookies and browse in incognito mode, your fingerprint may still identify you.
                    Using a browser like Firefox with strict privacy settings, or the Tor Browser, can reduce your fingerprint uniqueness.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Privacy notice */}
            <motion.div variants={fadeInUp} className="glass-card p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-500/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-green-700 dark:text-green-400">
                  <strong>100% Private:</strong> All fingerprint data is collected and displayed locally in your browser.
                  Nothing is sent to our servers. This tool helps you understand what websites see about you.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default BrowserFingerprint;
