import type { CertificateData } from '@/src/types';

interface Props {
  data: CertificateData;
  scale?: number;
}

export default function MinimalistTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122,
        height: 794,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        background: '#ffffff',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#374151' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, top: 8,
        display: 'flex', flexDirection: 'column',
        padding: '48px 80px',
        justifyContent: 'space-between',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 8 }} />
            )}
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 6 }}>
              {data.organizer}
            </div>
            <div style={{ fontSize: 38, fontWeight: '300', color: '#111827', letterSpacing: -1 }}>
              SERTIFIKAT
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 2 }}>
              {data.eventType}
            </div>
            <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 4 }}>
              {data.date}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#e5e7eb' }} />

        {/* Recipient */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 3 }}>
            Diberikan kepada
          </div>
          <div style={{ fontSize: 56, fontWeight: '700', color: '#111827', lineHeight: 1, letterSpacing: -2 }}>
            {data.recipientName}
          </div>
          <div style={{ height: 3, width: 60, background: '#374151', marginTop: 4 }} />
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
            {data.eventTitle}
          </div>
          {data.location && (
            <div style={{ fontSize: 12, color: '#9ca3af' }}>{data.location}</div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#e5e7eb' }} />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 16 }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>
            {data.certificateNumber ? `No: ${data.certificateNumber}` : ''}
          </div>
          <div style={{ display: 'flex', gap: 48 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #374151', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#111827' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #374151', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#111827' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
