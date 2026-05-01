/**
 * DIAGONAL SPLIT — Background terpotong diagonal, nama sangat besar di kanan
 * Layout: Kiri = info kegiatan di atas warna solid, Kanan = nama besar di putih
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function DiagonalSplitTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#ffffff', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Diagonal colored left panel via clip-path */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 100%)',
        clipPath: 'polygon(0 0, 55% 0, 40% 100%, 0 100%)',
      }} />

      {/* Diagonal accent line */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#f59e0b',
        clipPath: 'polygon(55% 0, 58% 0, 43% 100%, 40% 100%)',
      }} />

      {/* Left panel content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 480,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 40px 60px 60px',
        zIndex: 2,
      }}>
        {data.logoDataURL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.logoDataURL} alt="logo" style={{ height: 56, maxWidth: 140, objectFit: 'contain', marginBottom: 24, filter: 'brightness(0) invert(1)' }} />
        )}
        <div style={{ fontSize: 10, letterSpacing: 5, color: '#f59e0b', textTransform: 'uppercase', marginBottom: 8 }}>
          {data.organizer}
        </div>
        <div style={{ fontSize: 48, fontWeight: '900', color: '#ffffff', lineHeight: 1, letterSpacing: -1, marginBottom: 16 }}>
          SERTI<br />FIKAT
        </div>
        <div style={{ width: 48, height: 3, background: '#f59e0b', marginBottom: 16 }} />
        <div style={{ fontSize: 14, color: '#f59e0b', fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
          {data.eventType}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>{data.eventTitle}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          {[data.location, data.date].filter(Boolean).join(' · ')}
        </div>
      </div>

      {/* Right panel — recipient name HUGE */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, left: 460,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 60px 60px 80px',
        zIndex: 2,
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 12 }}>
          Diberikan kepada
        </div>
        <div style={{
          fontSize: 52, fontWeight: '900', color: '#111827',
          lineHeight: 1.05, letterSpacing: -2, marginBottom: 20,
          wordBreak: 'break-word',
        }}>
          {data.recipientName}
        </div>
        <div style={{ width: 60, height: 3, background: '#1e3a5f', marginBottom: 32 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d1d5db" />
          <SignatureRow data={data} accentColor="#1e3a5f" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
