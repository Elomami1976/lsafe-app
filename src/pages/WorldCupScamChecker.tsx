import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PageSEO from '../components/PageSEO';
import { pageVariants, staggerContainer, fadeInUp } from '../components/PageTransition';
import {
  Trophy, Shield, AlertTriangle, CheckCircle, XCircle, Ticket, Tv,
  MessageCircle, Mail, Search, RefreshCw, Sparkles, Lock, Globe,
  Zap, ArrowRight,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Heuristic scanner — runs 100% in the browser, no data leaves the device.
// ─────────────────────────────────────────────────────────────────────────────

type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

interface Finding {
  severity: Severity;
  title: string;
  detail: string;
}

interface SectionReport {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  score: number;        // 0 (safe) → 100 (dangerous)
  findings: Finding[];
  empty?: boolean;
}

// Known FIFA / World Cup 2026 official domains (whitelist).
const OFFICIAL_DOMAINS = [
  'fifa.com',
  'fifa.gg',
  'fifaplus.com',
  'fifa.tv',
  'tickets.fifa.com',
  'hospitality.fifa.com',
  'onlocationexp.com',
  'onlocation.com',
];

// Known legitimate broadcasters / streaming platforms.
const LEGIT_BROADCASTERS = [
  'bbc.co.uk', 'bbc.com', 'itv.com', 'espn.com', 'foxsports.com',
  'telemundo.com', 'peacocktv.com', 'tubitv.com',
  'beinsports.com', 'bein.com', 'mbc.net', 'shahid.net', 'ssc.sa',
  'tv2.dk', 'sbs.com.au', 'cbc.ca', 'tsn.ca', 'rds.ca',
  'foxtel.com.au', 'kayosports.com.au',
];

// Suspicious / abused TLDs commonly used by scammers.
const RISKY_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.xyz', '.buzz',
  '.click', '.zip', '.mov', '.country', '.work', '.support',
  '.live', '.stream', '.online', '.site', '.shop', '.click',
];

// Words that suggest pirated / unauthorized free streams.
const STREAM_SCAM_KEYWORDS = [
  'free-stream', 'freestream', 'hd-stream', 'live-stream-hd',
  'watch-free', 'watch-live-free', 'world-cup-free', 'worldcup-hd',
  'streamfifa', 'fifa-live', 'fifa-stream', 'streamhd',
  '1xbet', 'bet365-stream', 'betting-stream', 'crackstreams',
  'totalsportek', 'rojadirecta', 'streameast', 'vipstand',
];

// Words that suggest ticket scams.
const TICKET_SCAM_KEYWORDS = [
  'cheap-tickets', 'discount-fifa', 'fifa-ticket-resale',
  'world-cup-ticket-cheap', 'tickets-fifa-2026', 'fifaworldcuptickets',
  'fifa-ticketshop', 'fifa-2026-ticket', 'world-cup-pass',
];

// Phishing / urgency words common in WhatsApp + email scams.
const URGENCY_WORDS = [
  'urgent', 'immediate', 'act now', 'last chance', 'limited time',
  'expires today', 'expires soon', 'final notice', 'verify now',
  'congratulations', 'you have won', 'you won', 'winner',
  'claim your prize', 'claim now', 'selected', 'lucky',
];

const PAYMENT_RED_FLAGS = [
  'gift card', 'gift cards', 'itunes card', 'google play card',
  'amazon card', 'steam card', 'bitcoin', 'btc', 'ethereum',
  'crypto', 'usdt', 'wire transfer', 'western union', 'moneygram',
  'send money', 'transfer fee', 'processing fee', 'handling fee',
  'shipping fee', 'tax payment', 'customs fee',
];

const PERSONAL_DATA_REQUESTS = [
  'social security', 'ssn', 'national id', 'passport number',
  'credit card number', 'cvv', 'card pin', 'bank login',
  'password', 'one-time code', 'otp', 'verification code',
  '2fa code',
];

// URL extractor — handles bare hostnames too.
function extractUrls(text: string): string[] {
  if (!text) return [];
  const urlRegex = /\b((?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  const matches = text.match(urlRegex) ?? [];
  return Array.from(new Set(matches.filter(m => m.includes('.'))));
}

function normalizeUrl(input: string): { url: URL | null; raw: string } {
  const raw = input.trim();
  if (!raw) return { url: null, raw };
  let candidate = raw;
  if (!/^https?:\/\//i.test(candidate)) candidate = 'http://' + candidate;
  try {
    return { url: new URL(candidate), raw };
  } catch {
    return { url: null, raw };
  }
}

function hostnameOf(u: URL): string {
  return u.hostname.toLowerCase().replace(/^www\./, '');
}

function isOfficialOrSubdomain(host: string, list: string[]): boolean {
  return list.some(d => host === d || host.endsWith('.' + d));
}

// Levenshtein for lookalike detection.
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp: number[] = Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) dp[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[b.length];
}

function lookalikeOf(host: string, targets: string[]): string | null {
  const core = host.split('.').slice(-2).join('.');
  for (const t of targets) {
    if (core === t) return null; // exact match → not a lookalike
    const dist = levenshtein(core, t);
    if (dist > 0 && dist <= 2 && core.length >= 5) return t;
    // Contains "fifa" or "worldcup" but not on whitelist
    if (
      (core.includes('fifa') || core.includes('worldcup') || core.includes('world-cup')) &&
      !OFFICIAL_DOMAINS.some(d => core === d || host.endsWith('.' + d))
    ) {
      return t;
    }
  }
  return null;
}

function hasPunycode(host: string): boolean {
  return host.includes('xn--');
}

function analyzeUrl(rawInput: string, kind: 'stream' | 'ticket'): Finding[] {
  const findings: Finding[] = [];
  const { url, raw } = normalizeUrl(rawInput);
  if (!raw) return findings;

  if (!url) {
    findings.push({
      severity: 'high',
      title: 'Invalid URL format',
      detail: `"${raw}" doesn't look like a valid web address. Be suspicious of links that don't parse cleanly.`,
    });
    return findings;
  }

  const host = hostnameOf(url);

  // 1. Protocol
  if (url.protocol !== 'https:') {
    findings.push({
      severity: 'high',
      title: 'No HTTPS encryption',
      detail: 'This link is not secured with HTTPS. Anything you type — including payment details — would travel as plain text.',
    });
  } else {
    findings.push({
      severity: 'info',
      title: 'Uses HTTPS',
      detail: 'The connection is encrypted. (Note: HTTPS alone does NOT mean the site is legitimate.)',
    });
  }

  // 2. Punycode / IDN spoofing
  if (hasPunycode(host)) {
    findings.push({
      severity: 'critical',
      title: 'Punycode (IDN) domain detected',
      detail: `Hostname "${host}" uses Punycode encoding. This is a classic trick to impersonate "fifa.com", "ticketmaster.com", etc. using non-Latin characters.`,
    });
  }

  // 3. Official whitelist check
  const isOfficial = isOfficialOrSubdomain(host, OFFICIAL_DOMAINS);
  const isLegitBroadcaster = isOfficialOrSubdomain(host, LEGIT_BROADCASTERS);

  if (kind === 'ticket') {
    if (isOfficial) {
      findings.push({
        severity: 'info',
        title: 'Official FIFA domain',
        detail: `${host} is on the official FIFA / On Location whitelist for World Cup 2026 tickets and hospitality.`,
      });
    } else {
      const look = lookalikeOf(host, OFFICIAL_DOMAINS);
      if (look) {
        findings.push({
          severity: 'critical',
          title: 'Suspicious FIFA lookalike domain',
          detail: `"${host}" tries to mimic the official domain "${look}". FIFA sells tickets ONLY through tickets.fifa.com. Anything else is high-risk resale or outright fraud.`,
        });
      } else {
        findings.push({
          severity: 'high',
          title: 'Not an official ticket seller',
          detail: `"${host}" is not on FIFA's official sales channel list. Tickets bought from unauthorized resellers can be cancelled at the gate or never delivered.`,
        });
      }
    }

    for (const kw of TICKET_SCAM_KEYWORDS) {
      if (host.includes(kw) || url.pathname.toLowerCase().includes(kw)) {
        findings.push({
          severity: 'critical',
          title: `Ticket-scam keyword "${kw}"`,
          detail: 'The URL contains a phrase commonly seen in fake ticket sites. Legitimate sellers never need to advertise "cheap" FIFA tickets.',
        });
        break;
      }
    }
  }

  if (kind === 'stream') {
    if (isLegitBroadcaster) {
      findings.push({
        severity: 'info',
        title: 'Known legitimate broadcaster',
        detail: `${host} is on the verified broadcaster list. Safe to stream from.`,
      });
    } else {
      const look = lookalikeOf(host, [...OFFICIAL_DOMAINS, ...LEGIT_BROADCASTERS]);
      if (look) {
        findings.push({
          severity: 'critical',
          title: 'Suspicious broadcaster lookalike',
          detail: `"${host}" closely resembles "${look}". Scammers clone broadcaster pages to install malware, harvest credit cards, or trigger drive-by downloads.`,
        });
      } else {
        findings.push({
          severity: 'medium',
          title: 'Unknown / unverified streaming site',
          detail: `"${host}" is not on the list of authorized World Cup 2026 broadcasters. Unauthorized streams are a leading source of malware and crypto-miners.`,
        });
      }
    }

    for (const kw of STREAM_SCAM_KEYWORDS) {
      if (host.includes(kw) || url.pathname.toLowerCase().includes(kw)) {
        findings.push({
          severity: 'high',
          title: `Pirate-stream keyword "${kw}"`,
          detail: 'The URL contains language typical of pirated stream aggregators. These sites often inject fake "video player" downloads that are malware.',
        });
        break;
      }
    }
  }

  // 4. Risky TLD
  const tldMatch = host.match(/\.[a-z]+$/);
  if (tldMatch && RISKY_TLDS.includes(tldMatch[0])) {
    findings.push({
      severity: 'high',
      title: `Risky top-level domain "${tldMatch[0]}"`,
      detail: 'This TLD is heavily abused by scammers because registrations are cheap or anonymous. Treat with extra caution.',
    });
  }

  // 5. Excessive subdomains
  const subdomainCount = host.split('.').length - 2;
  if (subdomainCount >= 3) {
    findings.push({
      severity: 'medium',
      title: 'Unusually long subdomain chain',
      detail: `"${host}" has ${subdomainCount} subdomains. Scammers stack subdomains like "fifa.tickets.secure.login.example.com" to disguise the real domain.`,
    });
  }

  // 6. Numbers/dashes salad
  if (/\d{4,}/.test(host) || (host.match(/-/g) ?? []).length >= 3) {
    findings.push({
      severity: 'medium',
      title: 'Suspicious hostname structure',
      detail: 'Many digits or dashes in a domain (e.g. "fifa-world-cup-2026-tickets-live.com") is a hallmark of throwaway scam sites.',
    });
  }

  return findings;
}

function analyzeMessage(text: string, kind: 'whatsapp' | 'email'): Finding[] {
  const findings: Finding[] = [];
  if (!text.trim()) return findings;

  const lower = text.toLowerCase();

  // Embedded URLs
  const urls = extractUrls(text);
  if (urls.length > 0) {
    findings.push({
      severity: 'info',
      title: `${urls.length} link${urls.length > 1 ? 's' : ''} embedded`,
      detail: `Found: ${urls.slice(0, 4).join(', ')}${urls.length > 4 ? ` (+${urls.length - 4} more)` : ''}. Each one was scanned below.`,
    });
    for (const u of urls.slice(0, 5)) {
      const sub = analyzeUrl(u, 'stream');
      const worst = sub.find(f => f.severity === 'critical' || f.severity === 'high');
      if (worst) {
        findings.push({
          severity: worst.severity,
          title: `Embedded link "${u}"`,
          detail: worst.detail,
        });
      }
    }
  }

  // World Cup / FIFA mention without official source → suspicious
  const mentionsFifa = /fifa|world\s?cup|coupe du monde|كأس العالم|مونديال/i.test(text);
  const mentionsLottery = /lottery|sweepstake|giveaway|raffle|draw winner|تذكرة مجانية|فزت/i.test(text);
  if (mentionsFifa && mentionsLottery) {
    findings.push({
      severity: 'critical',
      title: 'Fake FIFA giveaway / lottery',
      detail: 'FIFA does NOT run lotteries, sweepstakes, or random prize draws via WhatsApp or email. This is one of the most common World Cup scam templates.',
    });
  }

  // Urgency
  const urgencyHits = URGENCY_WORDS.filter(w => lower.includes(w));
  if (urgencyHits.length >= 2) {
    findings.push({
      severity: 'high',
      title: 'High-pressure language',
      detail: `Found urgency triggers: "${urgencyHits.slice(0, 4).join('", "')}". Pressure tactics exist to stop you from thinking. Legitimate organizations don't rush you.`,
    });
  } else if (urgencyHits.length === 1) {
    findings.push({
      severity: 'medium',
      title: 'Urgency word detected',
      detail: `Contains "${urgencyHits[0]}". Be skeptical of any unsolicited message that pressures immediate action.`,
    });
  }

  // Payment red flags
  const payHits = PAYMENT_RED_FLAGS.filter(w => lower.includes(w));
  if (payHits.length > 0) {
    findings.push({
      severity: 'critical',
      title: 'Asks for non-refundable payment',
      detail: `Mentions "${payHits.slice(0, 3).join('", "')}". Gift cards, crypto, and wire transfers are favored by scammers because they're irreversible. Walk away.`,
    });
  }

  // Personal data
  const dataHits = PERSONAL_DATA_REQUESTS.filter(w => lower.includes(w));
  if (dataHits.length > 0) {
    findings.push({
      severity: 'critical',
      title: 'Requests sensitive personal data',
      detail: `Mentions "${dataHits.slice(0, 3).join('", "')}". No legitimate party will ask for these credentials over WhatsApp or email.`,
    });
  }

  // Generic greeting (only meaningful for email)
  if (kind === 'email' && /^(dear customer|dear user|dear sir\/madam|hello user|hi friend|dear winner)/im.test(text)) {
    findings.push({
      severity: 'medium',
      title: 'Generic, impersonal greeting',
      detail: 'Real organizations address you by your registered name. Mass scam emails default to "Dear Customer".',
    });
  }

  // WhatsApp-specific: forwarded chain message pattern
  if (kind === 'whatsapp' && /forward (this|to) \d+|share with \d+ (friends|people|contacts)|إعادة توجيه/i.test(text)) {
    findings.push({
      severity: 'high',
      title: 'Forwarded chain / share-to-win pattern',
      detail: 'Requests to forward to a number of contacts are a classic WhatsApp social-engineering chain. Do not forward.',
    });
  }

  // Excessive emojis / shouting
  const emojiCount = (text.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu) ?? []).length;
  if (emojiCount >= 8) {
    findings.push({
      severity: 'low',
      title: 'Excessive emojis',
      detail: `Counted ${emojiCount} emojis. Heavy emoji use is common in low-effort scam blasts targeting fans.`,
    });
  }

  // Nothing flagged → reassurance
  if (findings.length === 0 || (findings.length === 1 && findings[0].severity === 'info')) {
    findings.push({
      severity: 'info',
      title: 'No common scam patterns matched',
      detail: 'The message did not trigger any phishing heuristics. Still verify the sender through an independent channel before acting.',
    });
  }

  return findings;
}

function scoreFor(findings: Finding[]): number {
  const weights: Record<Severity, number> = {
    critical: 45, high: 25, medium: 12, low: 5, info: 0,
  };
  const total = findings.reduce((s, f) => s + weights[f.severity], 0);
  return Math.min(100, total);
}

function overallVerdict(score: number): {
  label: string;
  gradient: string;
  bg: string;
  text: string;
  icon: React.ReactNode;
} {
  if (score >= 60) return {
    label: 'High Risk — Likely Scam',
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-700',
    text: 'text-red-700 dark:text-red-400',
    icon: <AlertTriangle className="w-7 h-7 text-white" />,
  };
  if (score >= 25) return {
    label: 'Suspicious — Proceed with Caution',
    gradient: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700',
    text: 'text-yellow-700 dark:text-yellow-400',
    icon: <AlertTriangle className="w-7 h-7 text-white" />,
  };
  return {
    label: 'Likely Safe — Still Verify',
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700',
    text: 'text-green-700 dark:text-green-400',
    icon: <CheckCircle className="w-7 h-7 text-white" />,
  };
}

const SEVERITY_ICON: Record<Severity, React.ReactNode> = {
  critical: <XCircle className="w-5 h-5 text-red-500" />,
  high: <AlertTriangle className="w-5 h-5 text-red-500" />,
  medium: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  low: <AlertTriangle className="w-5 h-5 text-gray-400" />,
  info: <CheckCircle className="w-5 h-5 text-cyan-500" />,
};

const SEVERITY_BADGE: Record<Severity, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700',
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700',
  low: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600',
  info: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-700',
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const WorldCupScamChecker: React.FC = () => {
  const [streamUrl, setStreamUrl] = useState('');
  const [ticketUrl, setTicketUrl] = useState('');
  const [whatsappMsg, setWhatsappMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [report, setReport] = useState<SectionReport[] | null>(null);

  const hasAnyInput = !!(streamUrl.trim() || ticketUrl.trim() || whatsappMsg.trim() || emailMsg.trim());

  const runScan = () => {
    const sections: SectionReport[] = [];

    if (streamUrl.trim()) {
      const findings = analyzeUrl(streamUrl, 'stream');
      sections.push({ label: 'Streaming link', icon: Tv, score: scoreFor(findings), findings });
    } else {
      sections.push({ label: 'Streaming link', icon: Tv, score: 0, findings: [], empty: true });
    }

    if (ticketUrl.trim()) {
      const findings = analyzeUrl(ticketUrl, 'ticket');
      sections.push({ label: 'Ticket link', icon: Ticket, score: scoreFor(findings), findings });
    } else {
      sections.push({ label: 'Ticket link', icon: Ticket, score: 0, findings: [], empty: true });
    }

    if (whatsappMsg.trim()) {
      const findings = analyzeMessage(whatsappMsg, 'whatsapp');
      sections.push({ label: 'WhatsApp message', icon: MessageCircle, score: scoreFor(findings), findings });
    } else {
      sections.push({ label: 'WhatsApp message', icon: MessageCircle, score: 0, findings: [], empty: true });
    }

    if (emailMsg.trim()) {
      const findings = analyzeMessage(emailMsg, 'email');
      sections.push({ label: 'Email message', icon: Mail, score: scoreFor(findings), findings });
    } else {
      sections.push({ label: 'Email message', icon: Mail, score: 0, findings: [], empty: true });
    }

    setReport(sections);
    // Scroll to results after a tick
    setTimeout(() => {
      document.getElementById('wc-report')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const reset = () => {
    setReport(null);
    setStreamUrl('');
    setTicketUrl('');
    setWhatsappMsg('');
    setEmailMsg('');
  };

  const overallScore = useMemo(() => {
    if (!report) return 0;
    const active = report.filter(s => !s.empty);
    if (active.length === 0) return 0;
    return Math.max(...active.map(s => s.score));
  }, [report]);
  const verdict = overallVerdict(overallScore);

  const fillExample = () => {
    setStreamUrl('http://world-cup-2026-free-hd-stream.xyz/match/argentina-vs-brazil');
    setTicketUrl('https://fifa-ticket-resale-cheap.top/checkout');
    setWhatsappMsg(
      '🎉 CONGRATULATIONS! 🏆 You have been SELECTED to win 2 free FIFA World Cup 2026 tickets! ' +
      'Claim your prize NOW — pay only the $25 shipping fee in bitcoin to: bc1qxyz... ' +
      'Forward this to 10 friends or your ticket will expire today! https://fifa-winners.live/claim'
    );
    setEmailMsg(
      'Dear Customer,\n\nUrgent: Your FIFA hospitality booking requires verification. ' +
      'Please confirm your credit card number, CVV, and one-time code at https://fifa.tickets-verify.gq within 24 hours, ' +
      'or your seat will be released. Act now!\n\nFIFA Hospitality Team'
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      initial="initial" animate="animate" exit="exit" variants={pageVariants}
    >
      <PageSEO
        title="World Cup Scam Checker — FIFA Phishing & Fake Tickets Detector | LSafe"
        description="Free World Cup scam checker. Detect FIFA scams, fake ticket websites, unsafe football streaming sites, and phishing during the World Cup. Scan streams, tickets, WhatsApp and email messages instantly."
      />
      <Navigation />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-12 overflow-hidden bg-gradient-to-br from-emerald-700 via-green-800 to-slate-900">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 px-4 py-1.5 rounded-full text-yellow-200 text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              World Cup 2026 — Official scam-protection tool
            </div>
            <motion.div className="flex justify-center mb-5">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl">
                <Trophy className="w-14 h-14 text-yellow-300" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              World Cup <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">Scam Checker</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              Verify a streaming link, ticket page, WhatsApp message, or email before you click, pay, or share.
              Catches <strong className="text-yellow-200">fake FIFA tickets</strong>, <strong className="text-yellow-200">football phishing</strong>,
              and unsafe streams in seconds — all in your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['FIFA Scam Detection', 'Fake Ticket Sites', 'Safe Streaming Check', 'WhatsApp Phishing', '100% Browser-Side'].map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-white/90 text-xs">
                  <CheckCircle className="w-3 h-3 text-green-300" /> {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Input Card ── */}
      <div className="container mx-auto px-4 -mt-6 max-w-5xl pb-16">
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  Paste anything suspicious below
                </h2>
                <button
                  onClick={fillExample}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                >
                  Try with sample scam
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Streaming URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <Tv className="w-4 h-4 text-emerald-500" />
                    Streaming link
                  </label>
                  <input
                    type="text"
                    value={streamUrl}
                    onChange={e => setStreamUrl(e.target.value)}
                    placeholder="https://watch-worldcup-free.xyz/..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-emerald-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Ticket URL */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <Ticket className="w-4 h-4 text-yellow-500" />
                    Ticket purchase link
                  </label>
                  <input
                    type="text"
                    value={ticketUrl}
                    onChange={e => setTicketUrl(e.target.value)}
                    placeholder="https://tickets.fifa.com/..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    WhatsApp message
                  </label>
                  <textarea
                    value={whatsappMsg}
                    onChange={e => setWhatsappMsg(e.target.value)}
                    placeholder="Paste the full WhatsApp message you received…"
                    className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono focus:border-green-400 focus:outline-none transition-colors resize-y"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-cyan-500" />
                    Email message
                  </label>
                  <textarea
                    value={emailMsg}
                    onChange={e => setEmailMsg(e.target.value)}
                    placeholder="Paste the email body (subject, sender, content)…"
                    className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm font-mono focus:border-cyan-400 focus:outline-none transition-colors resize-y"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={runScan}
                  disabled={!hasAnyInput}
                  className="flex-1 min-w-[200px] py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  <Search className="w-5 h-5" />
                  Check for scams
                </motion.button>
                {report && (
                  <button
                    onClick={reset}
                    className="px-6 py-3.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-colors text-sm whitespace-nowrap flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset
                  </button>
                )}
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                Everything is analyzed in your browser. Nothing you paste leaves your device.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Report ── */}
        <AnimatePresence>
          {report && (
            <motion.div
              key="report"
              id="wc-report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Overall verdict */}
              <div className={`rounded-2xl border p-6 ${verdict.bg}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${verdict.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                    {verdict.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-2xl font-black ${verdict.text}`}>{verdict.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Highest risk score across all inputs: <strong>{overallScore}/100</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-5xl font-black ${verdict.text}`}>{overallScore}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">Risk Score</div>
                  </div>
                </div>
              </div>

              {/* Per-section reports */}
              <div className="grid md:grid-cols-2 gap-5">
                {report.map(section => {
                  const sv = overallVerdict(section.score);
                  const Icon = section.icon;
                  return (
                    <motion.div
                      key={section.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <h3 className="font-bold text-gray-900 dark:text-white">{section.label}</h3>
                        </div>
                        {section.empty ? (
                          <span className="text-xs text-gray-400 dark:text-gray-500">Not provided</span>
                        ) : (
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${SEVERITY_BADGE[section.score >= 60 ? 'critical' : section.score >= 25 ? 'medium' : 'info']}`}>
                            {sv.label.split(' — ')[0]} · {section.score}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        {section.empty ? (
                          <p className="text-sm text-gray-400 dark:text-gray-500 italic">No input given for this check.</p>
                        ) : section.findings.length === 0 ? (
                          <p className="text-sm text-gray-500 dark:text-gray-400">No issues detected.</p>
                        ) : (
                          <ul className="space-y-3">
                            {section.findings.map((f, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="mt-0.5 shrink-0">{SEVERITY_ICON[f.severity]}</span>
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{f.title}</p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 leading-relaxed">{f.detail}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Reminder
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This tool flags <em>known patterns</em> of <strong>world cup scam</strong>, <strong>fifa scam</strong>, <strong>football phishing</strong>,
                  and <strong>live stream scam</strong> activity. A "Likely Safe" result is not a guarantee — always buy tickets only at{' '}
                  <a href="https://tickets.fifa.com" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 dark:text-blue-400 underline">tickets.fifa.com</a>,
                  and stream only via official broadcasters in your region.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Why this tool / SEO content ── */}
      <section className="bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay safe from <span className="text-emerald-600 dark:text-emerald-400">phishing during World Cup</span> 2026
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The 2026 FIFA World Cup is the largest scam season of the year. Criminals exploit fans
              with fake ticket websites, hijacked streams, and WhatsApp giveaway fraud.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Ticket,
                title: 'Fake FIFA tickets',
                desc: 'Cloned ticketing pages and unauthorized resellers sell tickets that don\'t exist — or get cancelled at the gate. Our scanner detects domain lookalikes and unverified sellers.',
                color: 'from-yellow-500 to-amber-500',
              },
              {
                icon: Tv,
                title: 'Is this streaming site safe?',
                desc: 'Unauthorized streaming sites are the #1 source of malware during major tournaments. We flag pirate-stream patterns and unverified broadcaster domains.',
                color: 'from-emerald-500 to-green-600',
              },
              {
                icon: MessageCircle,
                title: 'WhatsApp & email phishing',
                desc: 'Fake "FIFA winner" messages and prize-claim scams flood inboxes. Our heuristics catch urgency triggers, gift-card payments, and forwarded-chain patterns.',
                color: 'from-cyan-500 to-blue-600',
              },
            ].map(card => (
              <div key={card.title} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Quick rules */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-700">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Red flags to walk away from
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Tickets sold outside <strong>tickets.fifa.com</strong> or On Location.</li>
                <li>• "You won FIFA tickets" messages on WhatsApp / SMS.</li>
                <li>• Requests to pay in <strong>gift cards, crypto, or wire transfer</strong>.</li>
                <li>• Free HD streaming sites asking you to install a "video player".</li>
                <li>• Lookalike domains like <code className="text-xs">fifa-tickets.top</code> or <code className="text-xs">fifaworldcup-2026.live</code>.</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-700">
              <h3 className="font-bold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Always do this instead
              </h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Buy tickets only at <strong>tickets.fifa.com</strong>.</li>
                <li>• Watch via your country's <strong>licensed broadcaster</strong> (BBC, FOX, beIN, MBC, SSC, etc.).</li>
                <li>• Verify the exact domain in your browser's address bar.</li>
                <li>• Use this scanner on every link <em>before</em> clicking.</li>
                <li>• When in doubt — don't click. Ask a friend or check our blog.</li>
              </ul>
            </div>
          </div>

          {/* Cross-promo to blog */}
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <Link
              to="/blog/fifa-world-cup-scams"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all hover:shadow-lg"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Read the guide</div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">FIFA World Cup Scams to Avoid in 2026</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">The full breakdown of every active World Cup 2026 scam pattern, with real examples.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/blog/fake-ticket-websites-world-cup"
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all hover:shadow-lg"
            >
              <div className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-400 mb-2">Read the guide</div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">Fake Ticket Websites During the World Cup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">How to spot cloned ticket pages, fraudulent resellers, and protect your payment.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Also try */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-300" />
              More security tools
            </h3>
            <p className="text-white/70 mb-6 text-sm">Use LSafe's full toolkit for general link, email, and privacy checks.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/url-scanner" className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                <Globe className="w-5 h-5 text-cyan-300 mb-2" />
                <div className="font-semibold text-sm">URL Scanner</div>
                <div className="text-xs text-white/50 mt-1">Full security scan of any link</div>
              </Link>
              <Link to="/email-header-analyzer" className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                <Mail className="w-5 h-5 text-cyan-300 mb-2" />
                <div className="font-semibold text-sm">Email Header Analyzer</div>
                <div className="text-xs text-white/50 mt-1">SPF, DKIM, DMARC & routing</div>
              </Link>
              <Link to="/cookie-analyzer" className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                <Shield className="w-5 h-5 text-cyan-300 mb-2" />
                <div className="font-semibold text-sm">Cookie Analyzer</div>
                <div className="text-xs text-white/50 mt-1">Detect trackers on any site</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WorldCupScamChecker;
