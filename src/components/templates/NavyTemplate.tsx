import type { CertificateData } from '@/src/types';

interface Props { data: CertificateData; scale?: number; }

export default function NavyTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#0f172a', position: 'relative',
      fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Gold border */}
      <div style={{ position: 'absolute', inset: 16, border: '2px solid #f59e0b', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(245,158,11,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[{top:10,left:10},{top:10,right:10},{bottom:10,left:10},{bottom:10,right:10}].map((pos,i) => (
        <div key={i} style={{ position:'absolute', ...pos, color:'#f59e0b', fontSize:20, lineHeight:1 }}>✦</div>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 56px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 48, maxWidth: 130, objectFit: 'contain', marginBottom: 8, filter: 'brightness(0) invert(1)' }} />
          )}
          <div style={{ color: '#f59e0b', fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', marginBottom: 8 }}>
            {data.organizer}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,158,11,0.4)' }} />
            <div style={{ color: '#f59e0b', fontSize: 16 }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(245,158,11,0.4)' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#f8fafc', letterSpacing: 5, textTransform: 'uppercase' }}>
            Sertifikat
          </div>
          <div style={{ fontSize: 14, color: '#f59e0b', letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' }}>
            {data.eventType}
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>Dengan bangga diberikan kepada</div>
          <div style={{ fontSize: 50, fontWeight: 'bold', color: '#f8fafc', borderBottom: '1px solid #f59e0b', paddingBottom: 8 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f59e0b' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 10, color: '#334155' }}>{data.certificateNumber ? `No: ${data.certificateNumber}` : ''}</div>
          <div style={{ display: 'flex', gap: 56 }}>
            {data.signer1Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #f59e0b', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#f8fafc' }}>{data.signer1Name}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{data.signer1Title}</div>
                </div>
              </div>
            )}
            {data.signer2Name && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 120, borderTop: '1px solid #f59e0b', paddingTop: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#f8fafc' }}>{data.signer2Name}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>{data.signer2Title}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
