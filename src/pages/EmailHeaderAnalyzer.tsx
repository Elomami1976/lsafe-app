import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import {
  Mail, Shield, AlertTriangle, CheckCircle, XCircle, MapPin,
  Clock, ChevronDown, ChevronRight, Copy, RefreshCw,
} from 'lucide-react';

// ── Header parsing ────────────────────────────────────────────────────────────
interface ReceivedHop {
  from: string;
  by: string;
  ip: string;
  date: string;
  raw: string;
}

interface AuthResult {
  status: 'pass' | 'fail' | 'softfail' | 'neutral' | 'none' | 'permerror' | 'temperror';
  detail: string;
}

interface ParsedEmail {
  from: string;
  to: string;
  cc: string;
  subject: string;
  date: string;
  messageId: string;
  replyTo: string;
  returnPath: string;
  xMailer: string;
  xOriginatingIp: string;
  spamScore: string;
  spf: AuthResult;
  dkim: AuthResult & { domain: string };
  dmarc: AuthResult;
  receivedHops: ReceivedHop[];
  allHeaders: [string, string][];
}

function parseAuth(text: string): AuthResult {
  const m = text.match(/(pass|fail|softfail|neutral|none|permerror|temperror)/i);
  return {
    status: (m?.[1]?.toLowerCase() ?? 'none') as AuthResult['status'],
    detail: text.trim(),
  };
}

function parseHeaders(raw: string): ParsedEmail {
  // Unfold multi-line header values
  const unfolded = raw.replace(/\r?\n([ \t]+)/g, ' $1').trim();
  const lines = unfolded.split(/\r?\n/);

  const map: Record<string, string[]> = {};
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (m) {
      const key = m[1].toLowerCase();
      if (!map[key]) map[key] = [];
      map[key].push(m[2].trim());
    }
  }
  const first = (k: string) => map[k]?.[0] ?? '';
  const all = (k: string) => map[k] ?? [];

  // Parse Received hops (most recent first, which is the order they appear in headers)
  const hops: ReceivedHop[] = all('received').map(r => {
    const fromM = r.match(/from\s+([^\s(]+(?:\s+\([^)]+\))?)/i);
    const byM = r.match(/\bby\s+([^\s(]+(?:\s+\([^)]+\))?)/i);
    const ipM = r.match(/\[(\d{1,3}(?:\.\d{1,3}){3})\]/);
    const dateM = r.match(/;\s*(.+)$/);
    return {
      from: fromM?.[1]?.trim() ?? '',
      by: byM?.[1]?.trim() ?? '',
      ip: ipM?.[1] ?? '',
      date: dateM?.[1]?.trim() ?? '',
      raw: r,
    };
  });

  // Authentication-Results
  const authRaw = all('authentication-results').join(' ');
  const spfRaw = first('received-spf');

  const spfM = authRaw.match(/spf=(pass|fail|softfail|neutral|none|permerror|temperror)[^;\n]*/i);
  const dkimM = authRaw.match(/dkim=(pass|fail|neutral|none|permerror|temperror)[^;\n]*/i);
  const dmarcM = authRaw.match(/dmarc=(pass|fail|none|permerror|temperror)[^;\n]*/i);

  const spf = spfM ? parseAuth(spfM[0]) : spfRaw ? parseAuth(spfRaw) : { status: 'none' as const, detail: '' };
  const dkimDomainM = dkimM?.[0]?.match(/header\.d=([^\s;]+)/i) ?? dkimM?.[0]?.match(/d=([^\s;]+)/i);
  const dkim = {
    ...(dkimM ? parseAuth(dkimM[0]) : { status: 'none' as const, detail: '' }),
    domain: dkimDomainM?.[1] ?? '',
  };
  const dmarc = dmarcM ? parseAuth(dmarcM[0]) : { status: 'none' as const, detail: '' };

  const xOrigIp = first('x-originating-ip') || first('x-original-ip') || first('x-sender-ip') ||
    hops.slice(-1)[0]?.ip || '';

  const allHeaders: [string, string][] = Object.entries(map)
    .flatMap(([k, vals]) => vals.map<[string, string]>(v => [k, v]));

  return {
    from: first('from'),
    to: first('to'),
    cc: first('cc'),
    subject: first('subject'),
    date: first('date'),
    messageId: first('message-id'),
    replyTo: first('reply-to'),
    returnPath: first('return-path'),
    xMailer: first('x-mailer') || first('x-mimecast-originator'),
    xOriginatingIp: xOrigIp,
    spamScore: first('x-spam-score') || first('x-spam-level') || first('x-spam-status'),
    spf,
    dkim,
    dmarc,
    receivedHops: hops,
    allHeaders,
  };
}

// ── UI helpers ────────────────────────────────────────────────────────────────
type AuthStatus = AuthResult['status'];

const STATUS_ICON: Record<AuthStatus, React.ReactNode> = {
  pass: <CheckCircle className="w-5 h-5 text-green-500" />,
  fail: <XCircle className="w-5 h-5 text-red-500" />,
  softfail: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  neutral: <AlertTriangle className="w-5 h-5 text-gray-400" />,
  none: <AlertTriangle className="w-5 h-5 text-gray-400" />,
  permerror: <XCircle className="w-5 h-5 text-red-500" />,
  temperror: <AlertTriangle className="w-5 h-5 text-orange-400" />,
};

const STATUS_BADGE: Record<AuthStatus, string> = {
  pass: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700',
  fail: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700',
  softfail: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700',
  neutral: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600',
  none: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600',
  permerror: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700',
  temperror: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-700',
};

function overallRisk(p: ParsedEmail): 'high' | 'medium' | 'low' {
  const failures = [p.spf.status, p.dkim.status, p.dmarc.status].filter(s => s === 'fail' || s === 'permerror').length;
  const passes = [p.spf.status, p.dkim.status, p.dmarc.status].filter(s => s === 'pass').length;
  if (failures >= 2) return 'high';
  if (failures === 1) return 'medium';
  if (passes >= 2) return 'low';
  return 'medium';
}

const RISK_CONFIG = {
  high: { label: 'High Risk — Possible Phishing / Spoofing', gradient: 'from-red-500 to-red-600', bg: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-700', icon: <AlertTriangle className="w-6 h-6 text-white" /> },
  medium: { label: 'Medium Risk — Verify the Sender', gradient: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700', icon: <AlertTriangle className="w-6 h-6 text-white" /> },
  low: { label: 'Low Risk — Appears Legitimate', gradient: 'from-green-500 to-emerald-600', bg: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700', icon: <CheckCircle className="w-6 h-6 text-white" /> },
};

const SAMPLE = `Delivered-To: user@example.com
Received: by 2002:a0c:d88b:0:b0:6b2:3c5e:8e2e with SMTP id s11csp1234567ivc;
        Mon, 18 Apr 2026 10:30:00 -0700 (PDT)
Received: from mail.sender-domain.com (mail.sender-domain.com [203.0.113.42])
        by mx.example.com with ESMTPS id abc123xyz
        for <user@example.com>;
        Mon, 18 Apr 2026 10:29:57 -0700 (PDT)
Authentication-Results: mx.example.com;
       dkim=pass header.i=@sender-domain.com header.s=selector2 header.b=A1b2C3d4;
       spf=pass (example.com: domain of info@sender-domain.com designates 203.0.113.42 as permitted sender) smtp.mailfrom=info@sender-domain.com;
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=sender-domain.com
Return-Path: <info@sender-domain.com>
From: "Security Newsletter" <info@sender-domain.com>
To: user@example.com
Subject: Your Weekly Security Digest — April 2026
Date: Mon, 18 Apr 2026 10:29:54 -0700
Message-ID: <CABcDeFgHiJkLmNoPq@mail.sender-domain.com>
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
X-Mailer: Mailchimp Mailer
X-Spam-Score: 0.2`;

// ── Component ─────────────────────────────────────────────────────────────────
const EmailHeaderAnalyzer: React.FC = () => {
  const [raw, setRaw] = useState('');
  const [parsed, setParsed] = useState<ParsedEmail | null>(null);
  const [showAllHeaders, setShowAllHeaders] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const analyze = () => {
    if (raw.trim()) setParsed(parseHeaders(raw));
  };

  const reset = () => { setParsed(null); setRaw(''); setShowAllHeaders(false); };

  const copyReport = () => {
    if (!parsed) return;
    const txt = [
      `From: ${parsed.from}`,
      `To: ${parsed.to}`,
      `Subject: ${parsed.subject}`,
      `Date: ${parsed.date}`,
      `SPF: ${parsed.spf.status}`,
      `DKIM: ${parsed.dkim.status}${parsed.dkim.domain ? ` (${parsed.dkim.domain})` : ''}`,
      `DMARC: ${parsed.dmarc.status}`,
      `Origin IP: ${parsed.xOriginatingIp}`,
      `Hops: ${parsed.receivedHops.length}`,
    ].join('\n');
    navigator.clipboard.writeText(txt);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const risk = parsed ? overallRisk(parsed) : 'low';
  const riskCfg = RISK_CONFIG[risk];

  const InfoRow = ({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) =>
    value ? (
      <div className="flex gap-3 py-2.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
        <span className="text-sm font-medium text-gray-400 dark:text-gray-500 w-28 shrink-0">{label}</span>
        <span className={`text-sm text-gray-900 dark:text-white break-all ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
      </div>
    ) : null;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
    >
      <PageSEO
        title="Email Header Analyzer — Detect Phishing & Spam | LSafe"
        description="Free email header analyzer. Check SPF, DKIM, DMARC authentication, trace email routing, detect phishing and spoofing. Paste raw headers for instant analysis."
      />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-br from-cyan-600 via-teal-700 to-blue-800">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
              <Mail className="w-14 h-14 text-white" />
            </div>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Email Header <span className="text-cyan-200">Analyzer</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Detect phishing, spoofing, and spam. Verify SPF, DKIM & DMARC authentication and trace your
            email's full routing path — instantly.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mt-6">
            {['Phishing Detection', 'SPF / DKIM / DMARC', 'Routing Path', 'Origin IP'].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full text-white/90 text-sm">
                <CheckCircle className="w-3.5 h-3.5 text-green-300" /> {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <AnimatePresence mode="wait">

          {/* ── Input view ── */}
          {!parsed && (
            <motion.div key="input" variants={staggerContainer} initial="initial" animate="animate" exit={{ opacity: 0 }}>
              <motion.div variants={fadeInUp} className="glass-card p-8 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Paste Raw Email Headers</h2>
                <div className="flex items-start gap-2 mb-4 p-3 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-700">
                  <AlertTriangle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-cyan-700 dark:text-cyan-300">
                    <strong>Gmail:</strong> Open email → ⋮ menu → Show original → Copy to clipboard.&nbsp;
                    <strong>Outlook:</strong> File → Properties → Internet headers.&nbsp;
                    <strong>Apple Mail:</strong> View → All Headers.
                  </p>
                </div>
                <textarea
                  value={raw}
                  onChange={e => setRaw(e.target.value)}
                  placeholder={`Paste email headers here…\n\nDelivered-To: you@example.com\nReceived: from mail.example.com…\nAuthentication-Results: …\nFrom: sender@example.com\n…`}
                  className="w-full h-60 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-cyan-400 dark:focus:border-cyan-500 focus:outline-none text-sm font-mono text-gray-700 dark:text-gray-300 placeholder-gray-400 resize-y"
                />
                <div className="flex gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={analyze}
                    disabled={!raw.trim()}
                    className="flex-1 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" /> Analyze Headers
                  </motion.button>
                  <button
                    onClick={() => setRaw(SAMPLE)}
                    className="px-6 py-3.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
                  >
                    Try Sample
                  </button>
                </div>
              </motion.div>

              {/* How-to cards */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-500" /> How to Get Email Headers
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { client: 'Gmail', emoji: '📧', steps: ['Open the email', 'Click ⋮ (three dots)', 'Select "Show original"', '"Copy to clipboard"'] },
                    { client: 'Outlook', emoji: '📮', steps: ['Open the email', 'Go to File → Properties', 'Find "Internet headers"', 'Copy the text block'] },
                    { client: 'Apple Mail', emoji: '🍎', steps: ['Open the email', 'Go to View menu', 'Select "All Headers"', 'Copy the displayed text'] },
                  ].map(item => (
                    <div key={item.client} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{item.emoji} {item.client}</h4>
                      <ol className="space-y-1.5">
                        {item.steps.map((step, i) => (
                          <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                            <span className="font-bold text-cyan-500 shrink-0">{i + 1}.</span> {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ── Results view ── */}
          {parsed && (
            <motion.div key="results" variants={staggerContainer} initial="initial" animate="animate" exit={{ opacity: 0 }} className="space-y-6">

              {/* Risk banner */}
              <motion.div variants={fadeInUp} className={`glass-card p-6 border ${riskCfg.bg}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${riskCfg.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                    {riskCfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xl text-gray-900 dark:text-white">{riskCfg.label}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      SPF: <strong>{parsed.spf.status}</strong> · DKIM: <strong>{parsed.dkim.status}</strong> · DMARC: <strong>{parsed.dmarc.status}</strong>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyReport}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/60 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      {copiedSummary ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedSummary ? 'Copied' : 'Copy'}
                    </button>
                    <button
                      onClick={reset}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/60 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" /> New
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Authentication */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-500" /> Email Authentication
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { protocol: 'SPF', status: parsed.spf.status, subtitle: 'Sender Policy Framework', desc: 'Authorizes which servers can send on behalf of the domain.', detail: parsed.spf.detail },
                    { protocol: 'DKIM', status: parsed.dkim.status, subtitle: `DomainKeys Identified Mail${parsed.dkim.domain ? ` · ${parsed.dkim.domain}` : ''}`, desc: 'Cryptographic signature proving the email was not tampered with.', detail: parsed.dkim.detail },
                    { protocol: 'DMARC', status: parsed.dmarc.status, subtitle: 'Domain Message Authentication', desc: "Enforces SPF/DKIM policy and tells receivers what to do on failure.", detail: parsed.dmarc.detail },
                  ].map(item => (
                    <div key={item.protocol} className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-xl text-gray-900 dark:text-white">{item.protocol}</span>
                        <div className="flex items-center gap-1.5">
                          {STATUS_ICON[item.status]}
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STATUS_BADGE[item.status]}`}>
                            {item.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{item.subtitle}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Email info */}
              <motion.div variants={fadeInUp} className="glass-card p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" /> Email Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-8">
                  <div>
                    <InfoRow label="From" value={parsed.from} />
                    <InfoRow label="To" value={parsed.to} />
                    <InfoRow label="CC" value={parsed.cc} />
                    <InfoRow label="Reply-To" value={parsed.replyTo} />
                    <InfoRow label="Return-Path" value={parsed.returnPath} />
                  </div>
                  <div>
                    <InfoRow label="Subject" value={parsed.subject} />
                    <InfoRow label="Date" value={parsed.date} />
                    <InfoRow label="Message-ID" value={parsed.messageId} mono />
                    <InfoRow label="Sent via" value={parsed.xMailer} />
                    <InfoRow label="Origin IP" value={parsed.xOriginatingIp} mono />
                    <InfoRow label="Spam Score" value={parsed.spamScore} />
                  </div>
                </div>
              </motion.div>

              {/* Routing path */}
              {parsed.receivedHops.length > 0 && (
                <motion.div variants={fadeInUp} className="glass-card p-6">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-500" /> Email Routing ({parsed.receivedHops.length} {parsed.receivedHops.length === 1 ? 'hop' : 'hops'})
                  </h2>
                  <p className="text-xs text-gray-400 mb-4">Reading order: most recent (top) → original sender (bottom)</p>
                  <div className="space-y-2">
                    {parsed.receivedHops.map((hop, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${
                            i === 0 ? 'bg-blue-500' : i === parsed.receivedHops.length - 1 ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            {parsed.receivedHops.length - i}
                          </div>
                          {i < parsed.receivedHops.length - 1 && (
                            <div className="w-0.5 h-4 bg-gray-300 dark:bg-gray-600 mt-1" />
                          )}
                        </div>
                        <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 min-w-0">
                          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs">
                            {hop.from && <span className="text-gray-600 dark:text-gray-400"><strong>from</strong> {hop.from}</span>}
                            {hop.by && <span className="text-gray-600 dark:text-gray-400"><strong>by</strong> {hop.by}</span>}
                            {hop.ip && <span className="font-mono text-cyan-600 dark:text-cyan-400">[{hop.ip}]</span>}
                          </div>
                          {hop.date && (
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {hop.date}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* All raw headers (collapsible) */}
              <motion.div variants={fadeInUp} className="glass-card overflow-hidden">
                <button
                  onClick={() => setShowAllHeaders(v => !v)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span>All Headers ({parsed.allHeaders.length})</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showAllHeaders ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showAllHeaders && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 max-h-96 overflow-y-auto space-y-1">
                        {parsed.allHeaders.map(([key, val], i) => (
                          <div key={i} className="flex gap-2 text-xs font-mono py-1.5 border-b border-gray-100 dark:border-gray-700/60 last:border-0">
                            <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0 w-44 truncate" title={key}>{key}:</span>
                            <span className="text-gray-700 dark:text-gray-300 break-all">{val}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Privacy note */}
              <motion.div variants={fadeInUp} className="glass-card p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 dark:text-green-400">
                    <strong>100% Private:</strong> Email header analysis runs entirely in your browser.
                    Your headers are never uploaded to our servers.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EmailHeaderAnalyzer;
