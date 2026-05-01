/**
 * TYPOGRAPHY FIRST — Tipografi sebagai elemen desain utama
 * Layout: Nama sangat besar sebagai background text, konten di atas
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function TypographyTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#fafafa', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Giant background text — recipient name as watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 160, fontWeight: '900', color: 'rgba(0,0,0,0.04)',
        whiteSpace: 'nowrap', letterSpacing: -8, lineHeight: 1,
        userSelect: 'none', pointerEvents: 'none',
        maxWidth: '120%', overflow: 'hidden',
      }}>
        {data.recipientName}
      </div>

      {/* Left accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 8, background: 'linear-gradient(to bottom, #dc2626, #f97316, #eab308)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, left: 8,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 70px',
      }}>
        {/* Top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 120, objectFit: 'contain', marginBottom: 8 }} />
            )}
            <div style={{ fontSize: 10, letterSpacing: 5, color: '#9ca3af', textTransform: 'uppercase' }}>{data.organizer}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: 3, textTransform: 'uppercase' }}>{data.eventType}</div>
            <div style={{ fontSize: 10, color: '#d1d5db', marginTop: 4 }}>{data.date}</div>
          </div>
        </div>

        {/* Center */}
        <div>
          <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 8 }}>
            Sertifikat diberikan kepada
          </div>
          <div style={{ fontSize: 64, fontWeight: '900', color: '#111827', lineHeight: 1, letterSpacing: -3, marginBottom: 12, wordBreak: 'break-word' }}>
            {data.recipientName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ width: 48, height: 4, background: '#dc2626' }} />
            <div style={{ width: 24, height: 4, background: '#f97316' }} />
            <div style={{ width: 12, height: 4, background: '#eab308' }} />
          </div>
          <div style={{ fontSize: 16, color: '#374151', maxWidth: 600 }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{data.location}</div>}
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d1d5db" />
          <SignatureRow data={data} accentColor="#dc2626" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
