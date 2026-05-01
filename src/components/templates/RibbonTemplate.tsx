import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function RibbonTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#fff5f5', position: 'relative',
      fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Outer border */}
      <div style={{ position: 'absolute', inset: 12, border: '3px solid #dc2626', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(220,38,38,0.3)', pointerEvents: 'none' }} />

      {/* Top ribbon banner */}
      <div style={{
        position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)',
        background: '#dc2626', color: 'white',
        padding: '8px 48px', fontSize: 13, fontWeight: 'bold',
        letterSpacing: 4, textTransform: 'uppercase',
        clipPath: 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%)',
        minWidth: 300, textAlign: 'center',
      }}>
        Certificate of {data.eventType}
      </div>

      {/* Decorative stars */}
      {[{top:36,left:80},{top:36,right:80}].map((pos,i) => (
        <div key={i} style={{ position:'absolute', ...pos, color:'#dc2626', fontSize:24 }}>★</div>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 64px 28px',
      }}>
        {/* Organizer */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 130, objectFit: 'contain', marginBottom: 8 }} />
          )}
          <div style={{ fontSize: 11, color: '#dc2626', letterSpacing: 5, textTransform: 'uppercase' }}>
            {data.organizer}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(220,38,38,0.3)' }} />
            <div style={{ color: '#dc2626', fontSize: 14 }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(220,38,38,0.3)' }} />
          </div>
        </div>

        {/* Recipient */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic' }}>Proudly presented to</div>
          <div style={{ fontSize: 52, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #dc2626', paddingBottom: 8 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic', marginTop: 4 }}>
            in recognition of outstanding participation in
          </div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#dc2626' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>
            {data.certificateNumber ? `No: ${data.certificateNumber}` : ''}
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer1SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer1SignatureURL} alt="ttd" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 120, borderTop: '1px solid #dc2626', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1c1917' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#dc2626' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer2SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer2SignatureURL} alt="ttd" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 120, borderTop: '1px solid #dc2626', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1c1917' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 10, color: '#dc2626' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
