import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function ScholarTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f0f9ff', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#0369a1' }} />
      {/* Bottom accent bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#0369a1' }} />
      {/* Subtle side lines */}
      <div style={{ position: 'absolute', top: 6, left: 0, bottom: 3, width: 2, background: 'rgba(3,105,161,0.2)' }} />
      <div style={{ position: 'absolute', top: 6, right: 0, bottom: 3, width: 2, background: 'rgba(3,105,161,0.2)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 6, left: 2, right: 2, bottom: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '32px 60px 28px',
      }}>
        {/* Book/scroll icon + header */}
        <div style={{ textAlign: 'center' }}>
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={{ marginBottom: 8 }}>
            <rect x="8" y="6" width="28" height="36" rx="2" fill="none" stroke="#0369a1" strokeWidth="2"/>
            <rect x="14" y="6" width="28" height="36" rx="2" fill="#bae6fd" stroke="#0369a1" strokeWidth="2"/>
            <line x1="20" y1="16" x2="36" y2="16" stroke="#0369a1" strokeWidth="1.5"/>
            <line x1="20" y1="22" x2="36" y2="22" stroke="#0369a1" strokeWidth="1.5"/>
            <line x1="20" y1="28" x2="30" y2="28" stroke="#0369a1" strokeWidth="1.5"/>
          </svg>
          <LogoImg data={data} height={40} />
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#0369a1', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 2, background: '#0369a1', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 26, fontWeight: 'bold', color: '#0369a1', letterSpacing: 4, textTransform: 'uppercase' }}>
            CERTIFICATE OF SCHOLARSHIP
          </div>
          <div style={{ fontSize: 13, color: '#0c4a6e', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#0c4a6e', borderBottom: '2px solid #0369a1', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#0369a1' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#94a3b8" />
          <SignatureRow data={data} accentColor="#0369a1" textColor="#0c4a6e" subColor="#64748b" />
        </div>
      </div>
    </div>
  );
}
