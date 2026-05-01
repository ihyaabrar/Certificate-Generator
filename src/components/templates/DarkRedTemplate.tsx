import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function DarkRedTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#450a0a', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #fca5a5', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(252,165,165,0.3)', pointerEvents: 'none' }} />

      {/* Dramatic glow */}
      <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 3, background: 'linear-gradient(to right, transparent, #fca5a5, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 3, background: 'linear-gradient(to right, transparent, #fca5a5, transparent)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#fca5a5', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#fca5a5', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#fca5a5', letterSpacing: 6, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#fecaca', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#fecaca' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #fca5a5', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#fecaca', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fca5a5' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#7f1d1d' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#7f1d1d' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#7f1d1d" />
          <SignatureRow data={data} accentColor="#fca5a5" textColor="#ffffff" subColor="#fecaca" />
        </div>
      </div>
    </div>
  );
}
