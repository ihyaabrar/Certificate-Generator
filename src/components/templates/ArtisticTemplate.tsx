import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function ArtisticTemplate({ data, scale = 1 }: Props) {
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
      {/* Abstract brush stroke shapes */}
      <div style={{
        position: 'absolute', top: -30, left: -20, width: 400, height: 200,
        background: 'rgba(162,28,175,0.08)',
        clipPath: 'polygon(0 30%, 20% 0%, 80% 10%, 100% 40%, 85% 100%, 10% 90%)',
      }} />
      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 380, height: 220,
        background: 'rgba(162,28,175,0.07)',
        clipPath: 'polygon(15% 0%, 100% 10%, 90% 70%, 100% 100%, 0% 90%, 5% 30%)',
      }} />
      <div style={{
        position: 'absolute', top: 200, right: -40, width: 200, height: 300,
        background: 'rgba(162,28,175,0.05)',
        clipPath: 'polygon(20% 0%, 100% 20%, 80% 100%, 0% 80%)',
      }} />

      {/* Thin fuchsia border */}
      <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(162,28,175,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        padding: '28px 60px',
      }}>
        {/* Asymmetric header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <LogoImg data={data} height={48} />
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#a21caf', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#86198f', letterSpacing: 3, textTransform: 'uppercase' }}>{data.eventType}</div>
            <div style={{ fontSize: 11, color: '#86198f' }}>{data.date}</div>
          </div>
        </div>

        {/* Title - slightly off-center */}
        <div style={{ marginBottom: 20, paddingLeft: 20 }}>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#a21caf', letterSpacing: 3, textTransform: 'uppercase', fontStyle: 'italic' }}>SERTIFIKAT</div>
          <div style={{ width: 120, height: 3, background: 'linear-gradient(to right, #a21caf, transparent)', marginTop: 4 }} />
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10, paddingLeft: 20 }}>
          <div style={{ fontSize: 13, color: '#86198f', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 46, fontWeight: 'bold', color: '#1a202c' }}>
            {data.recipientName}
          </div>
          <div style={{ width: 200, height: 2, background: '#a21caf' }} />
          <div style={{ fontSize: 13, color: '#86198f', fontStyle: 'italic' }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#a21caf' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#86198f' }}>{data.location}</div>}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d8b4fe" />
          <SignatureRow data={data} accentColor="#a21caf" textColor="#1a202c" subColor="#86198f" />
        </div>
      </div>
    </div>
  );
}
