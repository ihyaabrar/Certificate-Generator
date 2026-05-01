import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function BaroqueTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fef3c7', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Baroque borders */}
      <div style={{ position: 'absolute', inset: 8, border: '4px solid #92400e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 16, border: '1px solid #92400e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(146,64,14,0.3)', pointerEvents: 'none' }} />

      {/* Baroque scrollwork corners */}
      {[
        { top: 8, left: 8, rot: 'rotate(0deg)' },
        { top: 8, right: 8, rot: 'rotate(90deg)' },
        { bottom: 8, left: 8, rot: 'rotate(-90deg)' },
        { bottom: 8, right: 8, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="70" height="70" style={{ position: 'absolute', top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, transform: pos.rot }} viewBox="0 0 70 70" fill="none">
          <path d="M4 4 L24 4 L4 24 Z" fill="rgba(146,64,14,0.1)" stroke="#92400e" strokeWidth="1"/>
          <path d="M4 4 L16 4" stroke="#92400e" strokeWidth="2.5"/>
          <path d="M4 4 L4 16" stroke="#92400e" strokeWidth="2.5"/>
          <path d="M8 8 C14 8 14 14 8 14" stroke="#92400e" strokeWidth="1" fill="none"/>
          <path d="M8 8 C8 14 14 14 14 8" stroke="#92400e" strokeWidth="1" fill="none"/>
          <circle cx="4" cy="4" r="2.5" fill="#92400e"/>
          <circle cx="16" cy="4" r="1.5" fill="#92400e"/>
          <circle cx="4" cy="16" r="1.5" fill="#92400e"/>
          <path d="M18 4 C22 4 22 8 18 8" stroke="#92400e" strokeWidth="1" fill="none"/>
          <path d="M4 18 C4 22 8 22 8 18" stroke="#92400e" strokeWidth="1" fill="none"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 38,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#92400e', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: '#92400e' }} />
            <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2 L14.4 9.2 L22 9.2 L16 13.8 L18.4 21 L12 16.4 L5.6 21 L8 13.8 L2 9.2 L9.6 9.2 Z" fill="#92400e"/></svg>
            <div style={{ flex: 1, height: 1, background: '#92400e' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#78350f', letterSpacing: 5, textTransform: 'uppercase', fontStyle: 'italic' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#92400e', letterSpacing: 3, marginTop: 2 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#44403c', borderBottom: '2px solid #92400e', paddingBottom: 6, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(146,64,14,0.3)' }} />
            <div style={{ fontSize: 14, color: '#92400e' }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(146,64,14,0.3)' }} />
          </div>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>atas keikutsertaannya dalam</div>
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
