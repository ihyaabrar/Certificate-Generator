/**
 * FULL BACKGROUND — Latar penuh gradien radial, konten di card putih transparan tengah
 * Layout: Card melayang di tengah dengan backdrop blur effect
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function FullBgTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      position: 'relative',
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Radial glow effects */}
      <div style={{ position: 'absolute', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Floating particles */}
      {[{x:100,y:100},{x:900,y:150},{x:200,y:600},{x:950,y:650},{x:500,y:50},{x:600,y:720}].map((p,i) => (
        <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
      ))}

      {/* Main card */}
      <div style={{
        position: 'absolute', top: 60, left: 80, right: 80, bottom: 60,
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 16,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '40px 80px',
      }}>
        {/* Top section */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 16 }}>
            {data.logoDataURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            )}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 4, textTransform: 'uppercase' }}>{data.organizer}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, marginTop: 2 }}>{data.eventType}</div>
            </div>
          </div>
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Center — recipient */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: 6, textTransform: 'uppercase' }}>
            Certificate of {data.eventType}
          </div>
          <div style={{
            fontSize: 56, fontWeight: '800', color: '#ffffff',
            lineHeight: 1.1, letterSpacing: -1,
            textShadow: '0 0 40px rgba(139,92,246,0.5)',
          }}>
            {data.recipientName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ fontSize: 18, color: 'rgba(139,92,246,0.8)' }}>✦</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            {[data.location, data.date].filter(Boolean).join(' · ')}
          </div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%' }}>
          <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 16 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <CertNo data={data} color="rgba(255,255,255,0.2)" />
            <SignatureRow data={data} accentColor="rgba(255,255,255,0.4)" textColor="#ffffff" subColor="rgba(255,255,255,0.5)" />
          </div>
        </div>
      </div>
    </div>
  );
}
