import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function CorporateOrangeTemplate({ data, scale = 1 }: Props) {
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
      {/* Orange diagonal stripe top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 0, height: 0,
        borderStyle: 'solid', borderWidth: '0 280px 280px 0',
        borderColor: 'transparent #c2410c transparent transparent',
      }} />
      {/* Lighter orange triangle behind */}
      <div style={{
        position: 'absolute', top: 0, right: 0, width: 0, height: 0,
        borderStyle: 'solid', borderWidth: '0 320px 320px 0',
        borderColor: 'transparent rgba(194,65,12,0.15) transparent transparent',
      }} />

      {/* Bottom orange bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: '#c2410c' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        padding: '44px 56px 28px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <LogoImg data={data} height={48} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 'bold', color: '#c2410c', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ width: 160, height: 2, background: '#c2410c', marginTop: 4 }} />
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#c2410c', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#9a3412', letterSpacing: 2, marginTop: 2 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', borderBottom: '3px solid #c2410c', paddingBottom: 6, display: 'inline-block' }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#c2410c' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#6b7280' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#6b7280' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#9ca3af" />
          <SignatureRow data={data} accentColor="#c2410c" textColor="#1c1917" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
