import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function FormalPurpleTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#4c1d95', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #e9d5ff', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(233,213,255,0.35)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[
        { top: 14, left: 14, rot: 'rotate(0deg)' },
        { top: 14, right: 14, rot: 'rotate(90deg)' },
        { bottom: 14, left: 14, rot: 'rotate(-90deg)' },
        { bottom: 14, right: 14, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="64" height="64" style={{ position: 'absolute', ...pos, transform: pos.rot }} viewBox="0 0 64 64" fill="none">
          <path d="M6 6 L26 6 L6 26 Z" fill="rgba(233,213,255,0.15)" stroke="#e9d5ff" strokeWidth="1.5"/>
          <path d="M6 6 L18 6" stroke="#e9d5ff" strokeWidth="2.5"/>
          <path d="M6 6 L6 18" stroke="#e9d5ff" strokeWidth="2.5"/>
          <circle cx="6" cy="6" r="2" fill="#e9d5ff"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 38,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 12, letterSpacing: 5, color: '#e9d5ff', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#e9d5ff', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#e9d5ff', letterSpacing: 7, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#ddd6fe', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#ddd6fe' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #e9d5ff', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#ddd6fe', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#e9d5ff' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#ddd6fe' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#ddd6fe' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#e9d5ff" />
          <SignatureRow data={data} accentColor="#e9d5ff" textColor="#ffffff" subColor="#ddd6fe" />
        </div>
      </div>
    </div>
  );
}
