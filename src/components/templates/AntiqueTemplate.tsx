import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function AntiqueTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#d6d3d1', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Stone texture overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.06) 0%, transparent 60%)' }} />

      {/* Borders */}
      <div style={{ position: 'absolute', inset: 12, border: '3px solid #57534e', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(87,83,78,0.5)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} filter="grayscale(100%)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#57534e', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 2, background: '#57534e', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#292524', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#57534e', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#57534e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #57534e', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#57534e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#292524' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#78716c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#78716c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#78716c" />
          <SignatureRow data={data} accentColor="#57534e" textColor="#1c1917" subColor="#78716c" />
        </div>
      </div>
    </div>
  );
}
