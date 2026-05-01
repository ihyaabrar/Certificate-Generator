import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function RoyalBlueTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#1e3a8a', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Outer silver border */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #93c5fd', pointerEvents: 'none' }} />
      {/* Inner thin border */}
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(147,197,253,0.4)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[['0','0','rotate(0)'],['auto','0','rotate(90deg)'],['0','auto','rotate(-90deg)'],['auto','auto','rotate(180deg)']].map(([t,r,rot],i) => (
        <svg key={i} width="60" height="60" style={{ position:'absolute', top: t==='0'?14:'auto', bottom: t==='auto'?14:'auto', left: r==='0'?14:'auto', right: r==='auto'?14:'auto', transform: rot }} viewBox="0 0 60 60" fill="none">
          <path d="M4 4 L24 4 L4 24 Z" fill="none" stroke="#93c5fd" strokeWidth="1.5"/>
          <path d="M4 4 L14 4" stroke="#93c5fd" strokeWidth="2"/>
          <path d="M4 4 L4 14" stroke="#93c5fd" strokeWidth="2"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 60px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 12, letterSpacing: 5, color: '#93c5fd', textTransform: 'uppercase', marginBottom: 6 }}>
            {data.organizer}
          </div>
          <div style={{ width: 60, height: 1, background: '#93c5fd', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#ffffff', letterSpacing: 8, textTransform: 'uppercase' }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 14, color: '#93c5fd', letterSpacing: 3, marginTop: 4 }}>
            {data.eventType}
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#bfdbfe' }}>Diberikan kepada</div>
          <div style={{ fontSize: 46, fontWeight: 'bold', color: '#93c5fd', borderBottom: '1px solid #93c5fd', paddingBottom: 8, minWidth: 380 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#bfdbfe', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#93c5fd' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#93c5fd' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#93c5fd" />
          <SignatureRow data={data} accentColor="#93c5fd" textColor="#ffffff" subColor="#bfdbfe" />
        </div>
      </div>
    </div>
  );
}
