import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function TrophyTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f59e0b', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Dark borders */}
      <div style={{ position: 'absolute', inset: 12, border: '3px solid #1c1917', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 28,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        {/* Trophy SVG */}
        <div style={{ textAlign: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ marginBottom: 8 }}>
            <path d="M20 8 L44 8 L44 32 C44 42 38 48 32 48 C26 48 20 42 20 32 Z" fill="#1c1917"/>
            <path d="M8 8 L20 8 L20 20 C20 20 14 20 10 16 C8 14 8 8 8 8 Z" fill="#1c1917"/>
            <path d="M56 8 L44 8 L44 20 C44 20 50 20 54 16 C56 14 56 8 56 8 Z" fill="#1c1917"/>
            <rect x="28" y="48" width="8" height="10" fill="#1c1917"/>
            <rect x="20" y="58" width="24" height="4" rx="2" fill="#1c1917"/>
          </svg>
          <LogoImg data={data} height={36} />
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#1c1917', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 3, background: '#1c1917', margin: '0 auto 8px' }} />
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1c1917', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#44403c', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#44403c' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', borderBottom: '3px solid #1c1917', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#44403c', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1c1917' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#44403c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#44403c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#44403c" />
          <SignatureRow data={data} accentColor="#1c1917" textColor="#1c1917" subColor="#44403c" />
        </div>
      </div>
    </div>
  );
}
