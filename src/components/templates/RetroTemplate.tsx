import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function RetroTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fed7aa', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Thick retro borders */}
      <div style={{ position: 'absolute', inset: 10, border: '4px solid #92400e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '2px solid #92400e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(146,64,14,0.4)', pointerEvents: 'none' }} />

      {/* Starburst corner decorations */}
      {[
        { top: 10, left: 10 }, { top: 10, right: 10 },
        { bottom: 10, left: 10 }, { bottom: 10, right: 10 },
      ].map((pos, i) => (
        <svg key={i} width="60" height="60" style={{ position: 'absolute', ...pos }} viewBox="0 0 60 60" fill="none">
          <path d="M30 5 L33 22 L48 12 L38 26 L55 30 L38 34 L48 48 L33 38 L30 55 L27 38 L12 48 L22 34 L5 30 L22 26 L12 12 L27 22 Z" fill="#92400e" opacity="0.6"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 80px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 3, background: '#92400e', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#78350f', letterSpacing: 4, textTransform: 'uppercase', fontStyle: 'italic' }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 13, color: '#92400e', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#44403c', borderBottom: '3px solid #92400e', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#78350f' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#92400e' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#92400e' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#92400e" />
          <SignatureRow data={data} accentColor="#92400e" textColor="#44403c" subColor="#78350f" />
        </div>
      </div>
    </div>
  );
}
