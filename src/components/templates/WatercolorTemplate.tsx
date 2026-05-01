import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function WatercolorTemplate({ data, scale = 1 }: Props) {
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
      {/* Watercolor blobs */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 320, height: 320, borderRadius: '60% 40% 70% 30%', background: 'radial-gradient(ellipse, rgba(219,39,119,0.12) 0%, transparent 70%)', transform: 'rotate(-20deg)' }} />
      <div style={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, borderRadius: '40% 60% 30% 70%', background: 'radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, transparent 70%)', transform: 'rotate(15deg)' }} />
      <div style={{ position: 'absolute', bottom: -50, left: 100, width: 300, height: 260, borderRadius: '50% 50% 40% 60%', background: 'radial-gradient(ellipse, rgba(219,39,119,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -40, right: 80, width: 260, height: 240, borderRadius: '40% 60% 50% 50%', background: 'radial-gradient(ellipse, rgba(168,85,247,0.09) 0%, transparent 70%)', transform: 'rotate(-10deg)' }} />

      {/* Thin pink border */}
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(219,39,119,0.25)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 12, letterSpacing: 4, color: '#db2777', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: 'rgba(219,39,119,0.4)', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#831843', letterSpacing: 3, fontStyle: 'italic' }}>Sertifikat</div>
          <div style={{ fontSize: 14, color: '#db2777', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid rgba(219,39,119,0.5)', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#831843' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#9d174d' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#9d174d' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#f9a8d4" />
          <SignatureRow data={data} accentColor="#db2777" textColor="#1a202c" subColor="#9d174d" />
        </div>
      </div>
    </div>
  );
}
