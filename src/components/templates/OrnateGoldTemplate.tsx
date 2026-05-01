import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

const OrnateCorner = ({ flip }: { flip?: boolean }) => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ transform: flip ? 'scale(-1,1)' : undefined }}>
    <path d="M4 4 L30 4 L4 30 Z" fill="rgba(217,119,6,0.1)" stroke="#d97706" strokeWidth="1"/>
    <path d="M4 4 L20 4" stroke="#d97706" strokeWidth="2.5"/>
    <path d="M4 4 L4 20" stroke="#d97706" strokeWidth="2.5"/>
    <path d="M8 8 Q20 8 20 20" stroke="#d97706" strokeWidth="1" fill="none"/>
    <path d="M8 8 Q8 20 20 20" stroke="#d97706" strokeWidth="1" fill="none"/>
    <circle cx="4" cy="4" r="3" fill="#d97706"/>
    <circle cx="20" cy="4" r="2" fill="#d97706"/>
    <circle cx="4" cy="20" r="2" fill="#d97706"/>
  </svg>
);

export default function OrnateGoldTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fffbeb', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Multiple decorative borders */}
      <div style={{ position: 'absolute', inset: 10, border: '3px solid #d97706', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '1px solid #d97706', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(217,119,6,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      <div style={{ position: 'absolute', top: 10, left: 10 }}><OrnateCorner /></div>
      <div style={{ position: 'absolute', top: 10, right: 10, transform: 'scaleX(-1)' }}><OrnateCorner /></div>
      <div style={{ position: 'absolute', bottom: 10, left: 10, transform: 'scaleY(-1)' }}><OrnateCorner /></div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, transform: 'scale(-1,-1)' }}><OrnateCorner /></div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 40,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" fill="#d97706"/></svg>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#92400e', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#d97706', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#44403c', borderBottom: '2px solid #d97706', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#92400e' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#a16207' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#a16207' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d97706" />
          <SignatureRow data={data} accentColor="#d97706" textColor="#44403c" subColor="#92400e" />
        </div>
      </div>
    </div>
  );
}
