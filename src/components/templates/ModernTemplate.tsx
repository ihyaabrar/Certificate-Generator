import type { CertificateData } from '@/src/types';

interface Props {
  data: CertificateData;
  scale?: number;
}

export default function ModernTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122,
        height: 794,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        background: '#f8f9ff',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 12,
        background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
      }} />

      {/* Top accent bar */}
      <div style={{
        position: 'absolute', left: 12, right: 0, top: 0, height: 6,
        background: '#4f46e5',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', left: 12, right: 0, top: 6, bottom: 0,
        display: 'flex', flexDirection: 'column',
        padding: '40px 60px',
        gap: 0,
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 8 }} />
            )}
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#4f46e5', textTransform: 'uppercase', marginBottom: 4 }}>
              {data.organizer}
            </div>
            <div style={{ fontSize: 42, fontWeight: '900', color: '#1e1b4b', letterSpacing: -1, fontFamily: 'Georgia, serif' }}>
              SERTIFIKAT
            </div>
            <div style={{ fontSize: 16, color: '#6366f1', fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' }}>
              {data.eventType}
            </div>
          </div>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>✦</div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 2, background: 'linear-gradient(to right, #4f46e5, transparent)', marginBottom: 32 }} />

        {/* Recipient */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Diberikan kepada</div>
          <div style={{ fontSize: 52, fontWeight: 'bold', color: '#111827', fontFamily: 'Georgia, serif', lineHeight: 1.1, marginBottom: 16 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 6 }}>
            atas keikutsertaannya dalam
          </div>
          <div style={{ fontSize: 20, fontWeight: '700', color: '#4f46e5', marginBottom: 4 }}>
            {data.eventTitle}
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            {[data.location, data.date].filter(Boolean).join(' · ')}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 24 }}>
          <div style={{ fontSize: 11, color: '#d1d5db' }}>
            {data.certificateNumber ? `No: ${data.certificateNumber}` : ''}
          </div>
          <div style={{ display: 'flex', gap: 48 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #4f46e5', paddingTop: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#111827' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #4f46e5', paddingTop: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#111827' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
