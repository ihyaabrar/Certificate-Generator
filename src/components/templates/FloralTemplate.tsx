import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

const FlowerCorner = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    {/* Petals */}
    <ellipse cx="20" cy="10" rx="8" ry="14" fill="rgba(190,24,93,0.2)" transform="rotate(0 20 10)"/>
    <ellipse cx="30" cy="8" rx="8" ry="14" fill="rgba(190,24,93,0.15)" transform="rotate(20 30 8)"/>
    <ellipse cx="10" cy="20" rx="8" ry="14" fill="rgba(190,24,93,0.15)" transform="rotate(-20 10 20)"/>
    <circle cx="20" cy="18" r="6" fill="rgba(190,24,93,0.3)"/>
    {/* Stem */}
    <path d="M20 24 Q30 40 50 50" stroke="#be185d" strokeWidth="1.5" fill="none"/>
    <path d="M20 24 Q10 40 5 60" stroke="#be185d" strokeWidth="1.5" fill="none"/>
    {/* Small flowers */}
    <circle cx="50" cy="50" r="4" fill="rgba(190,24,93,0.2)"/>
    <circle cx="5" cy="60" r="3" fill="rgba(190,24,93,0.15)"/>
  </svg>
);

export default function FloralTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#ffffff', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Floral corners */}
      <div style={{ position: 'absolute', top: 0, left: 0 }}><FlowerCorner /></div>
      <div style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}><FlowerCorner /></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }}><FlowerCorner /></div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1,-1)' }}><FlowerCorner /></div>

      {/* Pink border */}
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(190,24,93,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 80px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 12, letterSpacing: 4, color: '#be185d', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(190,24,93,0.4)' }} />
            <div style={{ fontSize: 18, color: '#be185d' }}>✿</div>
            <div style={{ width: 40, height: 1, background: 'rgba(190,24,93,0.4)' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#9d174d', letterSpacing: 3, fontStyle: 'italic' }}>Sertifikat</div>
          <div style={{ fontSize: 13, color: '#be185d', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid rgba(190,24,93,0.5)', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#9d174d' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#be185d' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#be185d' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#fda4af" />
          <SignatureRow data={data} accentColor="#be185d" textColor="#1a202c" subColor="#9d174d" />
        </div>
      </div>
    </div>
  );
}
