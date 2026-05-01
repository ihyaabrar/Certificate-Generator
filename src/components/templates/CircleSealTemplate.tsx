/**
 * CIRCLE SEAL — Seal besar di kiri, konten di kanan
 * Layout: Lingkaran besar dekoratif di kiri sebagai focal point
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function CircleSealTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#f8fafc', position: 'relative',
      fontFamily: 'Georgia, serif',
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Background accent */}
      <div style={{ position: 'absolute', top: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'rgba(30,58,138,0.04)', pointerEvents: 'none' }} />

      {/* Left seal area */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 380,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Outer ring */}
        <div style={{
          width: 280, height: 280, borderRadius: '50%',
          border: '3px solid #1e3a8a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Middle ring */}
          <div style={{
            width: 256, height: 256, borderRadius: '50%',
            border: '1px solid rgba(30,58,138,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'absolute',
          }} />
          {/* Inner ring */}
          <div style={{
            width: 220, height: 220, borderRadius: '50%',
            border: '2px solid #1e3a8a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'absolute',
          }} />

          {/* Seal content */}
          <div style={{ textAlign: 'center', zIndex: 1, padding: 20 }}>
            {data.logoDataURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: '50%' }} />
            ) : (
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="36" stroke="#1e3a8a" strokeWidth="2" fill="rgba(30,58,138,0.05)"/>
                <path d="M40 10 L44 26 L60 26 L47 36 L51 52 L40 42 L29 52 L33 36 L20 26 L36 26 Z" fill="#1e3a8a"/>
              </svg>
            )}
            <div style={{ fontSize: 9, color: '#1e3a8a', letterSpacing: 3, textTransform: 'uppercase', marginTop: 8, lineHeight: 1.4 }}>
              {data.organizer}
            </div>
          </div>

          {/* Circular text around seal */}
          <svg style={{ position: 'absolute', top: 0, left: 0 }} width="280" height="280" viewBox="0 0 280 280">
            <defs>
              <path id="circle-path" d="M 140,140 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"/>
            </defs>
            <text fontSize="9" fill="#1e3a8a" letterSpacing="3">
              <textPath href="#circle-path">
                {`✦ ${data.eventType.toUpperCase()} ✦ ${data.organizer.toUpperCase()} ✦ `}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Vertical divider */}
      <div style={{ position: 'absolute', top: 60, left: 380, bottom: 60, width: 1, background: 'rgba(30,58,138,0.15)' }} />

      {/* Right content */}
      <div style={{
        position: 'absolute', top: 0, left: 400, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 60px 60px 40px',
      }}>
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>
          Certificate of {data.eventType}
        </div>
        <div style={{ fontSize: 38, fontWeight: 'bold', color: '#1e3a8a', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 20 }}>
          SERTIFIKAT
        </div>
        <div style={{ width: 50, height: 3, background: '#1e3a8a', marginBottom: 20 }} />
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>Diberikan kepada</div>
        <div style={{ fontSize: 44, fontWeight: 'bold', color: '#111827', lineHeight: 1.1, marginBottom: 16, wordBreak: 'break-word' }}>
          {data.recipientName}
        </div>
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 18, fontWeight: 'bold', color: '#1e3a8a', marginBottom: 4 }}>{data.eventTitle}</div>
        <div style={{ fontSize: 12, color: '#9ca3af' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>

        <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d1d5db" />
          <SignatureRow data={data} accentColor="#1e3a8a" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
