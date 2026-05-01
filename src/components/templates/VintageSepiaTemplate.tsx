import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function VintageSepiaTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f5e6c8', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Sepia vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(146,64,14,0.15) 100%)' }} />

      {/* Borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #92400e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(146,64,14,0.4)', pointerEvents: 'none' }} />

      {/* Sepia corner marks */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 },
        { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <svg key={i} width="30" height="30" style={{ position: 'absolute', ...pos, transform: `rotate(${i*90}deg)` }} viewBox="0 0 30 30" fill="none">
          <path d="M2 2 L12 2 L2 12 Z" fill="rgba(146,64,14,0.2)" stroke="#92400e" strokeWidth="1"/>
          <line x1="2" y1="2" x2="10" y2="2" stroke="#92400e" strokeWidth="1.5"/>
          <line x1="2" y1="2" x2="2" y2="10" stroke="#92400e" strokeWidth="1.5"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} filter="sepia(100%) saturate(50%)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 1, background: '#92400e', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#78350f', letterSpacing: 4, textTransform: 'uppercase', fontStyle: 'italic' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#92400e', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#44403c', borderBottom: '1px solid #92400e', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#78350f' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#a16207' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#a16207' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d97706" />
          <SignatureRow data={data} accentColor="#92400e" textColor="#44403c" subColor="#78350f" />
        </div>
      </div>
    </div>
  );
}
