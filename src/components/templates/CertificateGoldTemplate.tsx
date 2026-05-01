import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function CertificateGoldTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: 'linear-gradient(135deg, #fefce8 0%, #fffbeb 50%, #fef3c7 100%)',
      position: 'relative', fontFamily: 'Georgia, serif',
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Gold outer border */}
      <div style={{ position: 'absolute', inset: 10, border: '4px solid #d97706', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '1px solid #fbbf24', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(217,119,6,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[
        { top: 6, left: 6 }, { top: 6, right: 6 },
        { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', ...pos, width: 48, height: 48 }}>
          <svg viewBox="0 0 48 48" fill="none">
            <path d={i === 0 ? 'M4 4 L4 20 M4 4 L20 4' : i === 1 ? 'M44 4 L44 20 M44 4 L28 4' : i === 2 ? 'M4 44 L4 28 M4 44 L20 44' : 'M44 44 L44 28 M44 44 L28 44'} stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
            <circle cx={i === 0 ? 4 : i === 1 ? 44 : i === 2 ? 4 : 44} cy={i < 2 ? 4 : 44} r="3" fill="#d97706" />
          </svg>
        </div>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 56px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 56, maxWidth: 160, objectFit: 'contain', marginBottom: 8 }} />
          ) : null}
          <div style={{ fontSize: 11, color: '#92400e', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 6 }}>
            {data.organizer}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 6 }}>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(to right, transparent, #d97706)' }} />
            <div style={{ color: '#d97706', fontSize: 20 }}>✦</div>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(to left, transparent, #d97706)' }} />
          </div>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#78350f', letterSpacing: 8, textTransform: 'uppercase' }}>
            Sertifikat
          </div>
          <div style={{ fontSize: 14, color: '#b45309', letterSpacing: 4, textTransform: 'uppercase', marginTop: 2 }}>
            {data.eventType}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(to right, transparent, #d97706)' }} />
            <div style={{ color: '#d97706', fontSize: 20 }}>✦</div>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(to left, transparent, #d97706)' }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#92400e', fontStyle: 'italic' }}>Dengan bangga diberikan kepada</div>
          <div style={{ fontSize: 50, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #d97706', paddingBottom: 8 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#78350f', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#92400e' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: '#a16207' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>{data.certificateNumber ? `No: ${data.certificateNumber}` : ''}</div>
          <div style={{ display: 'flex', gap: 56 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer1SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer1SignatureURL} alt="ttd" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 120, borderTop: '1px solid #d97706', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1c1917' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#92400e' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer2SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer2SignatureURL} alt="ttd" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 4 }} />
                )}
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
