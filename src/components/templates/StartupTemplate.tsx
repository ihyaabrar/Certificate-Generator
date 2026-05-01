import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function StartupTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#ffffff', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Gradient background blobs */}
      <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />

      {/* Rounded card */}
      <div style={{
        position: 'absolute', inset: 40,
        borderRadius: 24, border: '1px solid rgba(124,58,237,0.2)',
        background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 4px 40px rgba(124,58,237,0.08)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '32px 60px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <LogoImg data={data} height={40} />
            <div style={{ fontSize: 14, fontWeight: 'bold', color: '#7c3aed', letterSpacing: 1 }}>{data.organizer}</div>
          </div>
          {/* Gradient pill badge */}
          <div style={{
            display: 'inline-block', padding: '6px 24px', borderRadius: 999,
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            fontSize: 11, fontWeight: 'bold', color: '#ffffff', letterSpacing: 3, textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            {data.eventType}
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#1e1b4b', letterSpacing: 2, textTransform: 'uppercase' }}>SERTIFIKAT</div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Diberikan kepada</div>
          <div style={{ fontSize: 46, fontWeight: 'bold', color: '#1e1b4b' }}>
            {data.recipientName}
          </div>
          {/* Gradient underline */}
          <div style={{ width: 200, height: 3, background: 'linear-gradient(to right, #7c3aed, #a855f7)', margin: '0 auto' }} />
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#7c3aed' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#9ca3af' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#9ca3af' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#9ca3af" />
          <SignatureRow data={data} accentColor="#7c3aed" textColor="#1e1b4b" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
