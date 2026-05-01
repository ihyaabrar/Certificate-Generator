import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function DarkGreenTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#052e16', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #4ade80', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(74,222,128,0.3)', pointerEvents: 'none' }} />

      {/* Subtle glow */}
      <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: 2, background: 'linear-gradient(to right, transparent, #4ade80, transparent)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#4ade80', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#4ade80', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#4ade80', letterSpacing: 6, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#86efac', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#86efac' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #4ade80', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#86efac', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#4ade80' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#166534' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#166534' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#166534" />
          <SignatureRow data={data} accentColor="#4ade80" textColor="#ffffff" subColor="#86efac" />
        </div>
      </div>
    </div>
  );
}
