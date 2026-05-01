/**
 * WAVE — Gelombang SVG sebagai elemen dekoratif utama
 * Layout: Wave di atas dan bawah, konten di tengah
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function WaveTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#ffffff', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top wave */}
      <svg style={{ position: 'absolute', top: 0, left: 0, right: 0 }} width="1122" height="180" viewBox="0 0 1122 180" preserveAspectRatio="none">
        <path d="M0 0 L1122 0 L1122 120 Q900 180 700 140 Q500 100 300 150 Q150 180 0 140 Z" fill="#0f766e"/>
        <path d="M0 0 L1122 0 L1122 90 Q900 140 700 110 Q500 80 300 120 Q150 140 0 110 Z" fill="#0d9488"/>
        <path d="M0 0 L1122 0 L1122 60 Q900 100 700 80 Q500 60 300 90 Q150 100 0 80 Z" fill="#14b8a6"/>
      </svg>

      {/* Bottom wave */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} width="1122" height="140" viewBox="0 0 1122 140" preserveAspectRatio="none">
        <path d="M0 140 L1122 140 L1122 60 Q900 0 700 40 Q500 80 300 30 Q150 0 0 50 Z" fill="#0f766e"/>
        <path d="M0 140 L1122 140 L1122 80 Q900 30 700 60 Q500 90 300 50 Q150 20 0 70 Z" fill="#0d9488"/>
        <path d="M0 140 L1122 140 L1122 100 Q900 60 700 80 Q500 100 300 70 Q150 50 0 90 Z" fill="#14b8a6"/>
      </svg>

      {/* Top content on wave */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          )}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 4, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ fontSize: 24, fontWeight: '800', color: '#ffffff', letterSpacing: 2 }}>SERTIFIKAT</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, textTransform: 'uppercase' }}>{data.eventType}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{data.date}</div>
        </div>
      </div>

      {/* Center content */}
      <div style={{
        position: 'absolute', top: 160, bottom: 140, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 100px',
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 12 }}>
          Diberikan kepada
        </div>
        <div style={{ fontSize: 56, fontWeight: '900', color: '#0f766e', lineHeight: 1, letterSpacing: -2, textAlign: 'center', marginBottom: 16 }}>
          {data.recipientName}
        </div>
        <div style={{ width: 80, height: 3, background: '#14b8a6', marginBottom: 16 }} />
        <div style={{ fontSize: 16, color: '#374151', textAlign: 'center', maxWidth: 600 }}>{data.eventTitle}</div>
        {data.location && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>{data.location}</div>}
      </div>

      {/* Bottom content on wave */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px', zIndex: 2,
      }}>
        <CertNo data={data} color="rgba(255,255,255,0.5)" />
        <SignatureRow data={data} accentColor="rgba(255,255,255,0.6)" textColor="#ffffff" subColor="rgba(255,255,255,0.6)" />
      </div>
    </div>
  );
}
