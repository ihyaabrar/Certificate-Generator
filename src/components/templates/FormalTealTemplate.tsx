import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function FormalTealTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#ffffff', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Teal top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: '#0f766e' }} />
      {/* Teal left border */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 6, background: '#0f766e' }} />
      {/* Subtle bottom line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: '#0f766e' }} />

      {/* Decorative teal accent block top-right */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 4, background: 'linear-gradient(to left, #0f766e, transparent)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 4, left: 6, right: 0, bottom: 2,
        display: 'flex', flexDirection: 'column',
        padding: '36px 60px 28px 50px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
          <LogoImg data={data} height={52} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#0f766e', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ width: 180, height: 2, background: '#0f766e', marginTop: 6 }} />
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#0f766e', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#134e4a', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#718096' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #0f766e', paddingBottom: 6, display: 'inline-block' }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#718096', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#0f766e' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#718096' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#718096' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#a0aec0" />
          <SignatureRow data={data} accentColor="#0f766e" textColor="#1a202c" subColor="#718096" />
        </div>
      </div>
    </div>
  );
}
