/**
 * TRIANGLE ACCENT — Segitiga besar di sudut sebagai elemen dekoratif utama
 * Layout: Segitiga di kanan atas + kiri bawah, konten di tengah
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function TriangleAccentTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#ffffff', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Large triangle top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 400px 400px 0',
        borderColor: 'transparent #7c3aed transparent transparent',
      }} />
      {/* Smaller triangle top-right overlay */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '0 340px 340px 0',
        borderColor: 'transparent #6d28d9 transparent transparent',
      }} />

      {/* Large triangle bottom-left */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '300px 0 0 300px',
        borderColor: 'transparent transparent transparent #7c3aed',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 0, height: 0,
        borderStyle: 'solid',
        borderWidth: '240px 0 0 240px',
        borderColor: 'transparent transparent transparent #6d28d9',
      }} />

      {/* Top-right content (on triangle) */}
      <div style={{ position: 'absolute', top: 30, right: 30, textAlign: 'right', zIndex: 2 }}>
        {data.logoDataURL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.logoDataURL} alt="logo" style={{ height: 40, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1)', marginBottom: 6 }} />
        )}
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 3, textTransform: 'uppercase' }}>{data.organizer}</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{data.eventType}</div>
      </div>

      {/* Bottom-left content (on triangle) */}
      <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 2 }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>{data.date}</div>
        {data.location && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{data.location}</div>}
      </div>

      {/* Main content — center */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 120px',
        zIndex: 1,
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 5, textTransform: 'uppercase', marginBottom: 12 }}>
          Sertifikat {data.eventType}
        </div>
        <div style={{ fontSize: 52, fontWeight: '900', color: '#1f2937', lineHeight: 1, letterSpacing: -2, marginBottom: 8 }}>
          SERTIFIKAT
        </div>
        <div style={{ width: 80, height: 4, background: '#7c3aed', marginBottom: 24 }} />
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Diberikan kepada</div>
        <div style={{ fontSize: 50, fontWeight: '800', color: '#111827', lineHeight: 1.05, letterSpacing: -1, marginBottom: 16, maxWidth: 600, wordBreak: 'break-word' }}>
          {data.recipientName}
        </div>
        <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 18, fontWeight: '700', color: '#7c3aed', maxWidth: 500 }}>{data.eventTitle}</div>

        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d1d5db" />
          <SignatureRow data={data} accentColor="#7c3aed" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
