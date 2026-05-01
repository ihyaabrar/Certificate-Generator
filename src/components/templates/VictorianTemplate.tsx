import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function VictorianTemplate({ data, scale = 1 }: Props) {
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
      {/* Victorian borders */}
      <div style={{ position: 'absolute', inset: 10, border: '3px double #44403c', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(68,64,60,0.4)', pointerEvents: 'none' }} />

      {/* Victorian corner ornaments */}
      {[
        { top: 10, left: 10, rot: 'rotate(0deg)' },
        { top: 10, right: 10, rot: 'rotate(90deg)' },
        { bottom: 10, left: 10, rot: 'rotate(-90deg)' },
        { bottom: 10, right: 10, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="60" height="60" style={{ position: 'absolute', top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, transform: pos.rot }} viewBox="0 0 60 60" fill="none">
          <path d="M4 4 L20 4 L4 20 Z" fill="rgba(68,64,60,0.08)" stroke="#44403c" strokeWidth="1"/>
          <path d="M4 4 L14 4" stroke="#44403c" strokeWidth="2"/>
          <path d="M4 4 L4 14" stroke="#44403c" strokeWidth="2"/>
          <path d="M14 4 C18 4 18 8 14 8" stroke="#44403c" strokeWidth="1" fill="none"/>
          <path d="M4 14 C4 18 8 18 8 14" stroke="#44403c" strokeWidth="1" fill="none"/>
          <circle cx="4" cy="4" r="2" fill="#44403c"/>
        </svg>
      ))}

      {/* Top decorative band */}
      <div style={{ position: 'absolute', top: 30, left: 30, right: 30, height: 1, background: 'rgba(68,64,60,0.2)' }} />
      <div style={{ position: 'absolute', bottom: 30, left: 30, right: 30, height: 1, background: 'rgba(68,64,60,0.2)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#44403c', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: '#44403c' }} />
            <div style={{ fontSize: 16, color: '#44403c' }}>❧</div>
            <div style={{ flex: 1, height: 1, background: '#44403c' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#1c1917', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#57534e', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#57534e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #44403c', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#57534e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#44403c' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#78716c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#78716c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#a8a29e" />
          <SignatureRow data={data} accentColor="#44403c" textColor="#1c1917" subColor="#57534e" />
        </div>
      </div>
    </div>
  );
}
