import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function GeometricTemplate({ data, scale = 1 }: Props) {
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
      {/* Geometric corner decorations */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width="200" height="200" viewBox="0 0 200 200" fill="none">
        <polygon points="0,0 120,0 0,120" fill="rgba(8,145,178,0.08)"/>
        <polygon points="0,0 80,0 0,80" fill="rgba(8,145,178,0.12)"/>
        <polygon points="0,0 40,0 0,40" fill="rgba(8,145,178,0.2)"/>
      </svg>
      <svg style={{ position: 'absolute', top: 0, right: 0 }} width="200" height="200" viewBox="0 0 200 200" fill="none">
        <polygon points="200,0 80,0 200,120" fill="rgba(8,145,178,0.08)"/>
        <polygon points="200,0 120,0 200,80" fill="rgba(8,145,178,0.12)"/>
        <polygon points="200,0 160,0 200,40" fill="rgba(8,145,178,0.2)"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0 }} width="200" height="200" viewBox="0 0 200 200" fill="none">
        <polygon points="0,200 120,200 0,80" fill="rgba(8,145,178,0.08)"/>
        <polygon points="0,200 80,200 0,120" fill="rgba(8,145,178,0.12)"/>
        <polygon points="0,200 40,200 0,160" fill="rgba(8,145,178,0.2)"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0 }} width="200" height="200" viewBox="0 0 200 200" fill="none">
        <polygon points="200,200 80,200 200,80" fill="rgba(8,145,178,0.08)"/>
        <polygon points="200,200 120,200 200,120" fill="rgba(8,145,178,0.12)"/>
        <polygon points="200,200 160,200 200,160" fill="rgba(8,145,178,0.2)"/>
      </svg>

      {/* Thin border */}
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(8,145,178,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 80px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#0891b2', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 40, height: 2, background: '#0891b2' }} />
            <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="6,0 12,6 6,12 0,6" fill="#0891b2"/></svg>
            <div style={{ width: 40, height: 2, background: '#0891b2' }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#0e7490', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#0891b2', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#0e7490', borderBottom: '2px solid #0891b2', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#0891b2' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#94a3b8" />
          <SignatureRow data={data} accentColor="#0891b2" textColor="#0e7490" subColor="#64748b" />
        </div>
      </div>
    </div>
  );
}
