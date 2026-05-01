import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function Retro70sTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fed7aa', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* 70s groovy shapes */}
      <div style={{ position: 'absolute', top: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(234,88,12,0.2)' }} />
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(161,98,7,0.15)' }} />
      <div style={{ position: 'absolute', top: 100, right: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(234,88,12,0.1)' }} />

      {/* Thick retro border */}
      <div style={{ position: 'absolute', inset: 14, border: '4px solid #c2410c', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 24, border: '2px solid rgba(194,65,12,0.4)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#c2410c', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 30, height: 3, background: '#c2410c', borderRadius: 2 }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c2410c' }} />
            <div style={{ width: 30, height: 3, background: '#c2410c', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#7c2d12', letterSpacing: 4, textTransform: 'uppercase', fontStyle: 'italic' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#c2410c', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#c2410c', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', borderBottom: '3px solid #c2410c', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#c2410c', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#7c2d12' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#c2410c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#c2410c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#c2410c" />
          <SignatureRow data={data} accentColor="#c2410c" textColor="#1c1917" subColor="#7c2d12" />
        </div>
      </div>
    </div>
  );
}
