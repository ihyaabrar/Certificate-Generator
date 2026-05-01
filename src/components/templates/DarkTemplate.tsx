import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function DarkTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#0f0f1a', position: 'relative',
      fontFamily: 'Arial, sans-serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: -100, left: -100, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: -100, width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Purple accent line left */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(to bottom, #a855f7, #3b82f6)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', left: 4, right: 0, top: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        padding: '44px 64px',
        justifyContent: 'space-between',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 8, filter: 'brightness(0) invert(1)' }} />
            )}
            <div style={{ fontSize: 10, letterSpacing: 5, color: '#a855f7', textTransform: 'uppercase', marginBottom: 6 }}>
              {data.organizer}
            </div>
            <div style={{ fontSize: 44, fontWeight: '900', color: '#f8fafc', letterSpacing: -1 }}>
              SERTIFIKAT
            </div>
            <div style={{ fontSize: 14, color: '#a855f7', fontWeight: '600', letterSpacing: 3, textTransform: 'uppercase' }}>
              {data.eventType}
            </div>
          </div>
          {/* Hexagon badge */}
          <div style={{
            width: 80, height: 80,
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: 'white',
          }}>
            ★
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, #a855f7, #3b82f6, transparent)' }} />

        {/* Recipient */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 3 }}>Diberikan kepada</div>
          <div style={{ fontSize: 54, fontWeight: '800', color: '#f8fafc', lineHeight: 1, letterSpacing: -2 }}>
            {data.recipientName}
          </div>
          <div style={{ height: 2, width: 80, background: 'linear-gradient(to right, #a855f7, #3b82f6)', marginTop: 4 }} />
          <div style={{ fontSize: 14, color: '#9ca3af', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: '700', color: '#c084fc' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: '#4b5563' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(168,85,247,0.2)' }} />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: '#374151' }}>{data.certificateNumber ? `No: ${data.certificateNumber}` : ''}</div>
          <div style={{ display: 'flex', gap: 48 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #a855f7', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#f8fafc' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #a855f7', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#f8fafc' }}>{data.signer2Name}</div>
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
