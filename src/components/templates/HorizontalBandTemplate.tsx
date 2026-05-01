/**
 * HORIZONTAL BAND — Nama sangat besar di tengah dengan band warna horizontal
 * Layout: Band atas tipis, nama RAKSASA di tengah, band bawah dengan info
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function HorizontalBandTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#fafafa', position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Top thick band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: '#0f172a' }} />

      {/* Bottom thick band */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: '#0f172a' }} />

      {/* Accent stripe on top band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(to right, #f59e0b, #ef4444, #8b5cf6, #3b82f6, #10b981)' }} />

      {/* Top band content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 120,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 48, maxWidth: 130, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          )}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ fontSize: 22, fontWeight: '800', color: '#ffffff', letterSpacing: 2, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' }}>{data.eventType}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>{data.date}</div>
        </div>
      </div>

      {/* Center — HUGE recipient name */}
      <div style={{
        position: 'absolute', top: 120, bottom: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px',
      }}>
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 6, textTransform: 'uppercase', marginBottom: 16 }}>
          Diberikan kepada
        </div>
        <div style={{
          fontSize: 72, fontWeight: '900', color: '#0f172a',
          lineHeight: 1, letterSpacing: -3, textAlign: 'center',
          maxWidth: '100%', wordBreak: 'break-word',
        }}>
          {data.recipientName}
        </div>
        <div style={{ width: 80, height: 4, background: '#f59e0b', margin: '20px auto' }} />
        <div style={{ fontSize: 16, color: '#374151', textAlign: 'center', maxWidth: 600 }}>
          {data.eventTitle}
        </div>
        {data.location && (
          <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6 }}>{data.location}</div>
        )}
      </div>

      {/* Bottom band content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 60px',
      }}>
        <CertNo data={data} color="rgba(255,255,255,0.3)" />
        <SignatureRow data={data} accentColor="rgba(255,255,255,0.4)" textColor="#ffffff" subColor="rgba(255,255,255,0.5)" />
      </div>
    </div>
  );
}
