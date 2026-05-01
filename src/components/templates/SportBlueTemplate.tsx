import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function SportBlueTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#2563eb', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Dynamic diagonal stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
      }} />
      {/* White diagonal accent */}
      <div style={{
        position: 'absolute', top: 0, left: '60%', width: 80, bottom: 0,
        background: 'rgba(255,255,255,0.08)',
        transform: 'skewX(-10deg)',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '65%', width: 30, bottom: 0,
        background: 'rgba(255,255,255,0.05)',
        transform: 'skewX(-10deg)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '40px 60px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <LogoImg data={data} height={52} filter="brightness(0) invert(1)" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff', letterSpacing: 3, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>{data.eventType}</div>
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', letterSpacing: 3, textTransform: 'uppercase', lineHeight: 1 }}>SERTIFIKAT</div>
          <div style={{ width: 80, height: 4, background: '#ffffff', marginTop: 8, borderRadius: 2 }} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Diberikan kepada</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', color: '#ffffff', lineHeight: 1.1 }}>
            {data.recipientName}
          </div>
          <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#bfdbfe' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="rgba(255,255,255,0.5)" />
          <SignatureRow data={data} accentColor="rgba(255,255,255,0.7)" textColor="#ffffff" subColor="rgba(255,255,255,0.7)" />
        </div>
      </div>
    </div>
  );
}
