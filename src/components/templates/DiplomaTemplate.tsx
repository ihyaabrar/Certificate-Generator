import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function DiplomaTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%)',
        position: 'relative', fontFamily: 'Georgia, serif',
        overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Thick brown outer border */}
      <div style={{ position: 'absolute', inset: 12, border: '4px solid #78350f', pointerEvents: 'none' }} />
      {/* Inner thin border */}
      <div style={{ position: 'absolute', inset: 22, border: '1px solid #92400e', pointerEvents: 'none' }} />
      {/* Innermost decorative border */}
      <div style={{ position: 'absolute', inset: 28, border: '1px solid rgba(120,53,15,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#78350f', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          {/* Decorative line with ornament */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#92400e' }} />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z" fill="#92400e"/>
            </svg>
            <div style={{ flex: 1, height: 1, background: '#92400e' }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#78350f', letterSpacing: 6, textTransform: 'uppercase', fontStyle: 'italic' }}>
            DIPLOMA
          </div>
          <div style={{ fontSize: 13, color: '#92400e', letterSpacing: 3, marginTop: 2 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>Hoc Diploma Confertur</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#44403c', borderBottom: '2px solid #78350f', paddingBottom: 6, minWidth: 360 }}>
            {data.recipientName}
          </div>
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(120,53,15,0.3)' }} />
            <div style={{ fontSize: 16, color: '#92400e' }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(120,53,15,0.3)' }} />
          </div>
          <div style={{ fontSize: 13, color: '#78350f', fontStyle: 'italic' }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#44403c' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#92400e' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#92400e' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#92400e" />
          <SignatureRow data={data} accentColor="#78350f" textColor="#44403c" subColor="#92400e" />
        </div>
      </div>
    </div>
  );
}
