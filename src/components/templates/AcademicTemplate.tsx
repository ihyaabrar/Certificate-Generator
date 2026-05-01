import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function AcademicTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#ffffff', position: 'relative',
      fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top blue band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: '#1d4ed8' }} />
      {/* Bottom blue band */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: '#1d4ed8' }} />

      {/* Seal circle */}
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 120, borderRadius: '50%',
        background: '#ffffff', border: '6px solid #1d4ed8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(29,78,216,0.3)',
        zIndex: 10,
      }}>
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '50%' }} />
          ) : (
            <>
              <div style={{ fontSize: 28, color: '#1d4ed8', fontWeight: 'bold', lineHeight: 1 }}>★</div>
              <div style={{ fontSize: 9, color: '#1d4ed8', fontWeight: 'bold', letterSpacing: 1, marginTop: 2 }}>SEAL</div>
            </>
          )}
        </div>
      </div>

      {/* Header text */}
      <div style={{ position: 'absolute', top: 16, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', letterSpacing: 4, textTransform: 'uppercase' }}>
          {data.organizer}
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', left: 80, right: 80, top: 140, bottom: 80,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: 40,
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#6b7280', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 6 }}>
            This is to certify that
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 3, textTransform: 'uppercase' }}>
            {data.eventType}
          </div>
        </div>

        {/* Recipient */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 54, fontWeight: 'bold', color: '#111827', borderBottom: '3px solid #1d4ed8', paddingBottom: 8, minWidth: 400 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 12 }}>
            has successfully completed
          </div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#1d4ed8', marginTop: 6 }}>
            {data.eventTitle}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
            {[data.location, data.date].filter(Boolean).join(' · ')}
          </div>
        </div>

        {/* Signatories */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>
            {data.certificateNumber ? `Certificate No: ${data.certificateNumber}` : ''}
          </div>
          <div style={{ display: 'flex', gap: 64 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer1SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer1SignatureURL} alt="ttd" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 130, borderTop: '2px solid #1d4ed8', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#111827' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                {data.signer2SignatureURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.signer2SignatureURL} alt="ttd" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 4 }} />
                )}
                <div style={{ width: 130, borderTop: '2px solid #1d4ed8', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#111827' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, textTransform: 'uppercase' }}>
          {data.organizer}
        </div>
      </div>
    </div>
  );
}
