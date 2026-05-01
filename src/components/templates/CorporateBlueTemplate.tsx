import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function CorporateBlueTemplate({ data, scale = 1 }: Props) {
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
      {/* Top header bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, background: '#1e40af' }} />
      {/* Thin accent line below header */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 3, background: '#3b82f6' }} />

      {/* Header content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LogoImg data={data} height={36} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
        </div>
        <div style={{ fontSize: 11, color: '#bfdbfe', letterSpacing: 2 }}>{data.eventType}</div>
      </div>

      {/* Main content */}
      <div style={{
        position: 'absolute', top: 63, left: 0, right: 0, bottom: 80,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 80px', gap: 12,
      }}>
        <div style={{ fontSize: 38, fontWeight: 'bold', color: '#1e40af', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
        <div style={{ width: 80, height: 2, background: '#1e40af' }} />
        <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
        <div style={{ fontSize: 46, fontWeight: 'bold', color: '#1e293b', borderBottom: '2px solid #1e40af', paddingBottom: 6, minWidth: 360, textAlign: 'center' }}>
          {data.recipientName}
        </div>
        <div style={{ fontSize: 13, color: '#64748b' }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 22, fontWeight: 'bold', color: '#1e40af' }}>{data.eventTitle}</div>
        {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
        <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
        borderTop: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px',
      }}>
        <CertNo data={data} color="#94a3b8" />
        <SignatureRow data={data} accentColor="#1e40af" textColor="#1e293b" subColor="#64748b" />
      </div>
    </div>
  );
}
