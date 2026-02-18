import React from 'react';
import { Info, ShieldCheck, AlertTriangle, XCircle, CheckCircle, ChevronDown, ChevronUp, HelpCircle, FileText } from 'lucide-react';
import { useState } from 'react';

type VerdictType = 'safe' | 'suspicious' | 'dangerous';
interface VerdictProps {
  verdict: VerdictType;
  score: number;
  confidence: string;
  summary: string;
  scannedAt: string;
}
export function VerdictSection({ verdict, score, confidence, summary, scannedAt }: VerdictProps) {
  // Tooltip content for verdict
  const verdictHelp: Record<VerdictType, string> = {
    safe: 'Low risk: Generally safe to visit. No major security issues detected.',
    suspicious: 'Moderate risk: Some suspicious signals detected. Use caution.',
    dangerous: 'High risk: Dangerous signals detected. Avoid visiting.'
  };
  let verdictIcon = <ShieldCheck className="inline mr-1 text-green-600" size={28} />;
  let verdictText = 'Safe';
  let verdictColor = 'text-green-600';
  if (verdict === 'suspicious') {
    verdictIcon = <AlertTriangle className="inline mr-1 text-yellow-600" size={28} />;
    verdictText = 'Suspicious';
    verdictColor = 'text-yellow-600';
  } else if (verdict === 'dangerous') {
    verdictIcon = <XCircle className="inline mr-1 text-red-600" size={28} />;
    verdictText = 'Dangerous';
    verdictColor = 'text-red-600';
  }
  return (
    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 shadow">
      <div className="flex items-center gap-4 mb-2">
        <span className={`text-2xl font-bold flex items-center gap-2 ${verdictColor}`}>{verdictIcon}{verdictText}
          <span data-tooltip-id="lsafe-tooltip" data-tooltip-content={verdictHelp[verdict]} className="ml-1 cursor-pointer"><HelpCircle size={18} /></span>
        </span>
        <span className="text-lg font-mono text-gray-900">Score: <span className="font-bold">{score}</span>/100
          <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="The risk score is calculated based on security checks. Lower is safer." className="ml-1 cursor-pointer"><HelpCircle size={14} /></span>
        </span>
        <span className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-800 ml-2">Confidence: {confidence}
          <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="Confidence reflects how certain the system is about the verdict." className="ml-1 cursor-pointer"><HelpCircle size={12} /></span>
        </span>
      </div>
      <div className="text-gray-700 mb-1">{summary}</div>
      <div className="text-xs text-gray-500">Scanned at: {new Date(scannedAt).toLocaleString()}</div>
    </div>
  );
}

export function ChecksSection({ checks }: any) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Info size={18} className="text-blue-500" />
        <h2 className="font-bold text-lg">Security Checks
          <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="Automated checks for common web security issues." className="ml-1 cursor-pointer"><HelpCircle size={14} /></span>
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1">Check</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Summary</th>
              <th className="px-2 py-1">Score Δ</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((c: any) => (
              <tr key={c.id} className="border-t border-gray-200">
                <td className="px-2 py-1 font-mono flex items-center gap-1">
                  {c.status === 'pass' && <CheckCircle size={14} className="text-green-500" />}
                  {c.status === 'warn' && <AlertTriangle size={14} className="text-yellow-500" />}
                  {c.status === 'fail' && <XCircle size={14} className="text-red-500" />}
                  {c.title}
                  {c.help && <span data-tooltip-id="lsafe-tooltip" data-tooltip-content={c.help} className="ml-1 cursor-pointer"><HelpCircle size={12} /></span>}
                </td>
                <td className={`px-2 py-1 font-bold capitalize ${c.status === 'pass' ? 'text-green-600' : c.status === 'warn' ? 'text-yellow-600' : c.status === 'fail' ? 'text-red-600' : 'text-gray-600'}`}>{c.status}
                  <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="Pass: No issue. Warn: Caution. Fail: Problem detected." className="ml-1 cursor-pointer"><HelpCircle size={10} /></span>
                </td>
                <td className="px-2 py-1 text-gray-700">{c.summary}</td>
                <td className="px-2 py-1 text-center">{c.scoreDelta > 0 ? '+' : ''}{c.scoreDelta}
                  <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="How much this check changed the risk score." className="ml-1 cursor-pointer"><HelpCircle size={10} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RedirectsSection({ redirects }: any) {
  return (
    <div className="mb-6">
      <h2 className="font-bold text-lg mb-2 text-gray-900">Redirect Chain</h2>
      <ol className="border-l-2 border-blue-300 pl-4">
        {redirects.map((hop: any, i: number) => (
          <li key={i} className="mb-2">
            <div className="text-xs text-gray-700">{hop.status} → <span className="font-mono break-all">{hop.url}</span></div>
            {hop.location && <div className="text-xs text-blue-600">Location: {hop.location}</div>}
            {hop.timeMs && <div className="text-xs text-gray-400">Time: {hop.timeMs}ms</div>}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function DnsSection({ dns }: any) {
  const [open, setOpen] = useState(true);
  const hasRecords = dns && Object.keys(dns).length > 0;
  
  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm border-gray-200">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" 
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          <h2 className="font-bold text-lg">DNS Records
            <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="DNS records show how a domain is mapped to IP addresses and services." className="ml-1 cursor-pointer align-text-top"><HelpCircle size={14} /></span>
          </h2>
        </div>
        {open ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>
      
      {open && (
        <div className="p-4 bg-white">
          {!hasRecords ? (
             <div className="text-gray-500 italic">No DNS records available</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(dns).map(([type, records]: [string, any]) => {
                if (!records || (Array.isArray(records) && records.length === 0)) return null;
                return (
                  <div key={type} className="border-b last:border-0 pb-3 last:pb-0">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold w-16 text-center shadow-sm mr-3">{type}</span>
                    <div className="mt-2 text-sm pl-2">
                      {Array.isArray(records) ? (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {records.map((rec: any, idx: number) => {
                             const display = typeof rec === 'object' ? JSON.stringify(rec).replace(/[{"}]/g, '').replace(/,/g, ', ') : rec;
                             return <li key={idx} className="break-all font-mono text-xs">{display}</li>;
                          })}
                        </ul>
                      ) : (
                        <span className="text-gray-700 font-mono text-xs break-all">{JSON.stringify(records)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TlsSection({ tls }: any) {
  const [open, setOpen] = useState(true);
  const isEnabled = tls?.enabled;

  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm border-gray-200">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" 
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          <h2 className="font-bold text-lg">TLS/SSL Details
            <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="TLS/SSL certificates secure connections and verify site identity." className="ml-1 cursor-pointer align-text-top"><HelpCircle size={14} /></span>
          </h2>
        </div>
          {open ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>

      {open && (
          <div className="p-4 bg-white">
          {!isEnabled ? (
             <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
                <AlertTriangle size={20} />
               <span className="font-semibold">TLS/SSL is not enabled or handshake failed.</span>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded border border-gray-100">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</span>
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <CheckCircle size={16} />
                    Secure Connection Established
                  </div>
               </div>
               
              <div className="p-3 bg-gray-50 rounded border border-gray-100">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Protocol</span>
                <div className="font-mono text-gray-800">{tls.protocol || 'Unknown'}</div>
               </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-100">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Issuer</span>
                <div className="font-medium text-gray-800">{tls.issuer || 'Unknown'}</div>
               </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-100">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Subject</span>
                <div className="font-medium text-gray-800">{tls.subject || 'Unknown'}</div>
               </div>
               
              <div className="p-3 bg-gray-50 rounded border border-gray-100">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Validity</span>
                <div className="text-gray-800">
                  <div><span className="text-gray-500">From:</span> {tls.validFrom ? new Date(tls.validFrom).toLocaleDateString() : 'N/A'}</div>
                  <div><span className="text-gray-500">To:</span> {tls.validTo ? new Date(tls.validTo).toLocaleDateString() : 'N/A'}</div>
                    <div className={`mt-1 font-bold ${paramsDaysColor(tls.daysToExpiry)}`}>
                       {tls.daysToExpiry !== undefined ? `${tls.daysToExpiry} days remaining` : ''}
                    </div>
                  </div>
               </div>

              <div className="p-3 bg-gray-50 rounded border border-gray-100 md:col-span-2">
                <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Fingerprint (SHA-256)</span>
                <div className="font-mono text-xs break-all text-gray-600 bg-white p-1 rounded border border-gray-200">{tls.fingerprintSha256 || 'N/A'}</div>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function paramsDaysColor(days?: number) {
  if (days === undefined) return 'text-gray-500';
  if (days < 0) return 'text-red-600';
  if (days < 30) return 'text-yellow-600';
  return 'text-green-600';
}

export function HeadersSection({ headers }: any) {
  const [open, setOpen] = useState(true);
  const headerList = Array.isArray(headers) ? headers : [];

  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm border-gray-200">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" 
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          <h2 className="font-bold text-lg">Security Headers Audit
            <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="HTTP headers can improve security by controlling browser behavior." className="ml-1 cursor-pointer align-text-top"><HelpCircle size={14} /></span>
          </h2>
        </div>
        {open ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>
      
      {open && (
        <div className="overflow-x-auto">
          {headerList.length === 0 ? (
             <div className="p-4 text-gray-500 italic bg-white">No header audit data available.</div>
          ) : (
          <table className="min-w-full text-sm bg-white">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Header</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 w-24">Status</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Recommendation / Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {headerList.map((h: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-blue-700 font-medium">{h.header}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${h.status === 'pass' ? 'bg-green-100 text-green-800' : 
                        h.status === 'warn' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {h.status === 'pass' && <CheckCircle size={12} className="mr-1" />}
                      {h.status === 'warn' && <AlertTriangle size={12} className="mr-1" />}
                      {h.status === 'fail' && <XCircle size={12} className="mr-1" />}
                      {h.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {h.status !== 'pass' && h.recommendation ? (
                      <div className="text-gray-800 italic">{h.recommendation}</div>
                    ) : (
                      <div className="font-mono text-xs text-gray-500 truncate max-w-xs" title={h.value}>{h.value || 'Present'}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      )}
    </div>
  );
}

export function MetadataSection({ metadata }: any) {
  const [open, setOpen] = useState(true);
  
  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm border-gray-200">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" 
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          <h2 className="font-bold text-lg">Page Metadata
            <span data-tooltip-id="lsafe-tooltip" data-tooltip-content="Metadata describes the web page for search engines and social media." className="ml-1 cursor-pointer align-text-top"><HelpCircle size={14} /></span>
          </h2>
        </div>
        {open ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </div>
      
      {open && (
         <div className="p-4 bg-white grid gap-4 grid-cols-1 md:grid-cols-2">
            <MetaItem label="Title" value={metadata?.title} fullWidth />
            <MetaItem label="Description" value={metadata?.description} fullWidth />
            <MetaItem label="Language" value={metadata?.language} />
            <MetaItem label="Content Type" value={metadata?.contentType} />
            <MetaItem label="Content Length" value={metadata?.contentLength ? formatBytes(metadata.contentLength) : undefined} />
            <MetaItem label="HTTP Status" value={metadata?.status} />
            <MetaItem label="Final URL" value={metadata?.finalUrl} fullWidth code />
         </div>
      )}
    </div>
  );
}

const MetaItem = ({ label, value, fullWidth, code }: any) => {
   if (!value) return null;
   return (
     <div className={`${fullWidth ? 'md:col-span-2' : ''} p-3 bg-gray-50 rounded border border-gray-100 hover:border-blue-200 transition-colors`}>
       <div className="text-xs font-bold uppercase text-gray-500 mb-1">{label}</div>
       <div className={`text-gray-800 break-words ${code ? 'font-mono text-xs' : 'text-sm'}`}>{value}</div>
     </div>
   )
}

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function RiskSafetySection({ riskFactors, safetyFactors }: any) {
  return (
    <div className="mb-6" role="region" aria-label="Risk and Safety Factors">
      <h2 className="font-bold text-lg mb-2">Risk & Safety Factors</h2>
      <div className="flex gap-8">
        <div>
          <div className="font-semibold text-red-600 mb-1">Risks</div>
          <ul className="list-disc ml-5 text-xs">
            {riskFactors.map((r: string, i: number) => <li key={i}>{r}</li>)}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-green-600 mb-1">Safety</div>
          <ul className="list-disc ml-5 text-xs">
            {safetyFactors.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function RawSection({ raw }: any) {
  // raw can be the full report object or just the raw data object
  // If it has a 'raw' property, it's likely the full report
  const rawData = raw?.raw || raw || {};
  
  const fetchRes = rawData?.fetchRes || {};
  const tlsInfo = rawData?.tlsInfo || {};
  const dnsInfo = rawData?.dnsInfo || {};
  
  return (
    <details className="mb-6 p-4 border rounded-lg bg-gray-50 border-gray-200 shadow-sm" role="region" aria-label="Raw Evidence">
      <summary className="cursor-pointer font-bold text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 mb-2" tabIndex={0}>
         <FileText size={18} />
         Raw Evidence (JSON dump & advanced details)
      </summary>
      
      <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-200">
        <details className="group">
          <summary className="font-semibold text-xs cursor-pointer text-gray-600 hover:text-blue-600 mb-1 flex items-center gap-1">
             <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
             HTTP Request/Response Headers (Debug)
          </summary>
          <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
             <div className="bg-gray-800 text-gray-400 text-[10px] px-3 py-1 uppercase font-bold tracking-wider">JSON</div>
             <pre className="text-green-400 p-3 text-xs overflow-x-auto font-mono scrollbar-thin">{JSON.stringify(fetchRes.finalHeaders, null, 2)}</pre>
          </div>
        </details>

        <details className="group">
          <summary className="font-semibold text-xs cursor-pointer text-gray-600 hover:text-blue-600 mb-1 flex items-center gap-1">
             <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
             TLS/SSL Certificate Chain (Debug)
          </summary>
          <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
             <div className="bg-gray-800 text-gray-400 text-[10px] px-3 py-1 uppercase font-bold tracking-wider">JSON</div>
             <pre className="text-green-400 p-3 text-xs overflow-x-auto font-mono scrollbar-thin">{JSON.stringify(tlsInfo, null, 2)}</pre>
          </div>
        </details>

        <details className="group">
          <summary className="font-semibold text-xs cursor-pointer text-gray-600 hover:text-blue-600 mb-1 flex items-center gap-1">
             <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
             DNS Resolution History (Debug)
          </summary>
          <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
             <div className="bg-gray-800 text-gray-400 text-[10px] px-3 py-1 uppercase font-bold tracking-wider">JSON</div>
             <pre className="text-green-400 p-3 text-xs overflow-x-auto font-mono scrollbar-thin">{JSON.stringify(dnsInfo, null, 2)}</pre>
          </div>
        </details>
        
        <details className="group">
          <summary className="font-semibold text-xs cursor-pointer text-gray-600 hover:text-blue-600 mb-1 flex items-center gap-1">
             <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
             Full Report JSON
          </summary>
          <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
             <div className="bg-gray-800 text-gray-400 text-[10px] px-3 py-1 uppercase font-bold tracking-wider">JSON</div>
             <pre className="text-green-400 p-3 text-xs overflow-x-auto font-mono scrollbar-thin">{JSON.stringify(raw, null, 2)}</pre>
          </div>
        </details>
      </div>
    </details>
  );
}
