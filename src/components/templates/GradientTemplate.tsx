import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function GradientTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      position: 'relative',
      fontFamily: 'Arial, sans-serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* White card overlay */}
      <div style={{
        position: 'absolute', inset: 24,
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 16,
        backdropFilter: 'blur(10px)',
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 200, height: 200,
        borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60, width: 250, height: 250,
        borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 24,
        display: 'flex', flexDirection: 'column',
        padding: '36px 56px',
        justifyContent: 'space-between',
        borderRadius: 16,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 8 }} />
            )}
            <div style={{ fontSize: 10, letterSpacing: 4, color: '#764ba2', textTransform: 'uppercase', marginBottom: 4 }}>
              {data.organizer}
            </div>
            <div style={{
              fontSize: 42, fontWeight: '900', letterSpacing: -1,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              SERTIFIKAT
            </div>
            <div style={{ fontSize: 14, color: '#764ba2', fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' }}>
              {data.eventType}
            </div>
          </div>
          {/* Gradient badge */}
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: 'white', fontWeight: 'bold',
            boxShadow: '0 8px 24px rgba(118,75,162,0.4)',
          }}>
            ✦
          </div>
        </div>

        {/* Gradient divider */}
        <div style={{ height: 3, background: 'linear-gradient(to right, #667eea, #764ba2, #f093fb)', borderRadius: 2 }} />

        {/* Recipient */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 3 }}>Diberikan kepada</div>
          <div style={{
            fontSize: 52, fontWeight: '800', lineHeight: 1.1, letterSpacing: -1,
            background: 'linear-gradient(135deg, #1f2937, #374151)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {data.recipientName}
          </div>
          <div style={{ height: 3, width: 80, background: 'linear-gradient(to right, #667eea, #f093fb)', borderRadius: 2, marginTop: 4 }} />
          <div style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{
            fontSize: 20, fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            {data.eventTitle}
          </div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, rgba(102,126,234,0.3), rgba(240,147,251,0.3))' }} />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>{data.certificateNumber ? `No: ${data.certificateNumber}` : ''}</div>
          <div style={{ display: 'flex', gap: 48 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #764ba2', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1f2937' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #764ba2', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1f2937' }}>{data.signer2Name}</div>
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
