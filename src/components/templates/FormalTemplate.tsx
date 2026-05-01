import type { CertificateData } from '@/src/types';

interface Props {
  data: CertificateData;
  scale?: number;
}

export default function FormalTemplate({ data, scale = 1 }: Props) {
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
        fontFamily: 'Georgia, serif',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Outer border */}
      <div style={{
        position: 'absolute', inset: 16,
        border: '3px solid #1e3a5f',
        pointerEvents: 'none',
      }} />
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: 24,
        border: '1px solid #1e3a5f',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 40,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '32px 48px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 52, maxWidth: 140, objectFit: 'contain', marginBottom: 10 }} />
          )}
          <div style={{ fontSize: 13, letterSpacing: 6, color: '#1e3a5f', textTransform: 'uppercase', marginBottom: 8 }}>
            {data.organizer}
          </div>
          <div style={{ width: 80, height: 2, background: '#1e3a5f', margin: '0 auto 16px' }} />
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1e3a5f', letterSpacing: 4, textTransform: 'uppercase' }}>
            Sertifikat
          </div>
          <div style={{ fontSize: 16, color: '#4a5568', letterSpacing: 2, marginTop: 4 }}>
            {data.eventType}
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 14, color: '#718096' }}>Diberikan kepada</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #1e3a5f', paddingBottom: 8, minWidth: 400 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 14, color: '#718096', marginTop: 8 }}>
            atas keikutsertaannya dalam
          </div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#1e3a5f' }}>
            {data.eventTitle}
          </div>
          {data.location && (
            <div style={{ fontSize: 13, color: '#718096' }}>
              {data.location}
            </div>
          )}
          <div style={{ fontSize: 13, color: '#718096' }}>
            {data.date}
          </div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {/* Cert number */}
          <div style={{ fontSize: 11, color: '#a0aec0' }}>
            {data.certificateNumber ? `No: ${data.certificateNumber}` : ''}
          </div>

          {/* Signatories */}
          <div style={{ display: 'flex', gap: 64 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer1SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer1SignatureURL} alt="ttd" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 120, borderTop: '1px solid #1e3a5f', paddingTop: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#1a202c' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 11, color: '#718096' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer2SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer2SignatureURL} alt="ttd" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 120, borderTop: '1px solid #1e3a5f', paddingTop: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: '#1a202c' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 11, color: '#718096' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
