/**
 * SPLIT COLOR — Dua warna berbeda kiri-kanan, nama di garis tengah
 * Layout: Kiri gelap, kanan terang, nama melintasi keduanya
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function SplitColorTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#ffffff', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Left half — dark */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 561, background: '#0c4a6e' }} />
      {/* Right half — light (default white) */}

      {/* Vertical accent line at split */}
      <div style={{ position: 'absolute', top: 0, left: 557, bottom: 0, width: 8, background: '#0ea5e9' }} />

      {/* Left content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 557,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '60px 50px',
      }}>
        {/* Top */}
        <div>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 52, maxWidth: 140, objectFit: 'contain', marginBottom: 16, filter: 'brightness(0) invert(1)' }} />
          )}
          <div style={{ fontSize: 10, letterSpacing: 5, color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ fontSize: 44, fontWeight: '900', color: '#ffffff', lineHeight: 1, letterSpacing: -1 }}>SERTI<br/>FIKAT</div>
          <div style={{ width: 48, height: 3, background: '#0ea5e9', marginTop: 12 }} />
        </div>

        {/* Middle */}
        <div>
          <div style={{ fontSize: 12, color: '#7dd3fc', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>{data.eventType}</div>
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: 8 }}>{data.eventTitle}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Bottom */}
        <div>
          <CertNo data={data} color="rgba(255,255,255,0.3)" />
        </div>
      </div>

      {/* Right content */}
      <div style={{
        position: 'absolute', top: 0, left: 565, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 50px',
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 16 }}>
          Diberikan kepada
        </div>
        <div style={{
          fontSize: 48, fontWeight: '900', color: '#0c4a6e',
          lineHeight: 1.05, letterSpacing: -2, marginBottom: 24,
          wordBreak: 'break-word',
        }}>
          {data.recipientName}
        </div>
        <div style={{ width: 60, height: 3, background: '#0ea5e9', marginBottom: 32 }} />
        <div style={{ marginTop: 'auto', paddingTop: 40 }}>
          <SignatureRow data={data} accentColor="#0c4a6e" textColor="#0c4a6e" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
