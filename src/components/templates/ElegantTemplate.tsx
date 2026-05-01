import type { CertificateData } from '@/src/types';

interface Props {
  data: CertificateData;
  scale?: number;
}

export default function ElegantTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122,
        height: 794,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        background: '#fffdf7',
        position: 'relative',
        fontFamily: 'Georgia, serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Corner decorations */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 40, height: 40,
          borderTop: i < 2 ? '3px solid #92400e' : undefined,
          borderBottom: i >= 2 ? '3px solid #92400e' : undefined,
          borderLeft: i % 2 === 0 ? '3px solid #92400e' : undefined,
          borderRight: i % 2 === 1 ? '3px solid #92400e' : undefined,
        }} />
      ))}

      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: 20,
        border: '1px solid #d97706',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 56px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 130, objectFit: 'contain', marginBottom: 8 }} />
          )}
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
            <div style={{ color: '#d97706', fontSize: 18 }}>✦</div>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
          </div>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#92400e', textTransform: 'uppercase', marginBottom: 6 }}>
            {data.organizer}
          </div>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#78350f', letterSpacing: 6, textTransform: 'uppercase' }}>
            Sertifikat
          </div>
          <div style={{ fontSize: 14, color: '#b45309', letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' }}>
            {data.eventType}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
            <div style={{ color: '#d97706', fontSize: 18 }}>✦</div>
            <div style={{ flex: 1, height: 1, background: '#d97706' }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Dengan bangga diberikan kepada</div>
          <div style={{ fontSize: 50, fontWeight: 'bold', color: '#1c1917', borderBottom: '1px solid #d97706', paddingBottom: 8 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#78350f', fontStyle: 'italic', marginTop: 4 }}>
            atas keikutsertaannya dalam
          </div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#92400e' }}>
            {data.eventTitle}
          </div>
          <div style={{ fontSize: 12, color: '#a16207' }}>
            {[data.location, data.date].filter(Boolean).join(' · ')}
          </div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>
            {data.certificateNumber ? `No: ${data.certificateNumber}` : ''}
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #d97706', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1c1917' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#92400e' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #d97706', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1c1917' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 10, color: '#92400e' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
