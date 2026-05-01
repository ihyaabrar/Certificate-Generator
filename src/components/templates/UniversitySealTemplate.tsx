import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function UniversitySealTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fafaf9', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Borders */}
      <div style={{ position: 'absolute', inset: 14, border: '3px solid #44403c', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(68,64,60,0.4)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 30,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        {/* Seal + header */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Circular seal */}
          <div style={{ position: 'relative', width: 90, height: 90, marginBottom: 10 }}>
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
              <circle cx="45" cy="45" r="42" fill="none" stroke="#44403c" strokeWidth="2"/>
              <circle cx="45" cy="45" r="36" fill="none" stroke="#44403c" strokeWidth="1"/>
              <circle cx="45" cy="45" r="28" fill="rgba(68,64,60,0.05)" stroke="#44403c" strokeWidth="1"/>
              {/* UNIVERSITAS text around circle */}
              <path id="topArc" d="M 10 45 A 35 35 0 0 1 80 45" fill="none"/>
              <text fontSize="8" fill="#44403c" letterSpacing="3">
                <textPath href="#topArc" startOffset="10%">UNIVERSITAS</textPath>
              </text>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogoImg data={data} height={36} />
            </div>
          </div>
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#44403c', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 2, background: '#44403c', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#44403c', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#78716c', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#78716c' }}>Diberikan kepada</div>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #44403c', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#78716c', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#44403c' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#78716c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#78716c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#a8a29e" />
          <SignatureRow data={data} accentColor="#44403c" textColor="#1c1917" subColor="#78716c" />
        </div>
      </div>
    </div>
  );
}
