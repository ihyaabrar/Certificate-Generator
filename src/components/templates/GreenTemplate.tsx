import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function GreenTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#f0fdf4', position: 'relative',
      fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top green bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: '#059669' }} />
      {/* Bottom green bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: '#059669' }} />
      {/* Left accent */}
      <div style={{ position: 'absolute', top: 10, bottom: 10, left: 0, width: 6, background: '#34d399' }} />

      {/* Decorative leaf pattern top-right */}
      <div style={{ position: 'absolute', top: 20, right: 20, fontSize: 60, opacity: 0.08, color: '#059669', lineHeight: 1 }}>
        🌿
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 40, fontSize: 50, opacity: 0.06, color: '#059669', lineHeight: 1 }}>
        🌿
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', left: 6, right: 0, top: 10, bottom: 10,
        display: 'flex', flexDirection: 'column',
        padding: '36px 64px',
        justifyContent: 'space-between',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 40, maxWidth: 120, objectFit: 'contain', marginBottom: 8 }} />
            )}
            <div style={{ fontSize: 11, letterSpacing: 4, color: '#059669', textTransform: 'uppercase', marginBottom: 4 }}>
              {data.organizer}
            </div>
            <div style={{ fontSize: 40, fontWeight: 'bold', color: '#064e3b', letterSpacing: 2 }}>
              SERTIFIKAT
            </div>
            <div style={{ fontSize: 15, color: '#10b981', fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>
              {data.eventType}
            </div>
          </div>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: '#059669',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, color: 'white',
          }}>
            ✓
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 2, background: 'linear-gradient(to right, #059669, #34d399, transparent)' }} />

        {/* Recipient */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Diberikan kepada</div>
          <div style={{ fontSize: 52, fontWeight: 'bold', color: '#064e3b', lineHeight: 1.1 }}>
            {data.recipientName}
          </div>
          <div style={{ height: 3, width: 80, background: '#059669', marginTop: 4 }} />
          <div style={{ fontSize: 14, color: '#374151', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: '700', color: '#059669' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#d1fae5' }} />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 12 }}>
          <div style={{ fontSize: 10, color: '#d1d5db' }}>{data.certificateNumber ? `No: ${data.certificateNumber}` : ''}</div>
          <div style={{ display: 'flex', gap: 48 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #059669', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#064e3b' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '2px solid #059669', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#064e3b' }}>{data.signer2Name}</div>
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
