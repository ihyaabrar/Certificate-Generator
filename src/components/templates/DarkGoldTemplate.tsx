import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function DarkGoldTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#1c1917', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Gold borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #fbbf24', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(251,191,36,0.3)', pointerEvents: 'none' }} />

      {/* Gold corner ornaments */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 },
        { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <svg key={i} width="40" height="40" style={{ position: 'absolute', ...pos, transform: `rotate(${i*90}deg)` }} viewBox="0 0 40 40" fill="none">
          <path d="M4 4 L16 4 L4 16 Z" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1"/>
          <line x1="4" y1="4" x2="12" y2="4" stroke="#fbbf24" strokeWidth="2"/>
          <line x1="4" y1="4" x2="4" y2="12" stroke="#fbbf24" strokeWidth="2"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(5deg)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#fbbf24', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#fbbf24', letterSpacing: 6, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#d97706', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#d97706' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #fbbf24', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#d97706', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fbbf24' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#78716c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#78716c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#78716c" />
          <SignatureRow data={data} accentColor="#fbbf24" textColor="#ffffff" subColor="#d97706" />
        </div>
      </div>
    </div>
  );
}
