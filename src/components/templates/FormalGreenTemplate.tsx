import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function FormalGreenTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#14532d', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Border */}
      <div style={{ position: 'absolute', inset: 16, border: '2px solid #d1fae5', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(209,250,229,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[['0','0','rotate(0)'],['auto','0','rotate(90deg)'],['0','auto','rotate(-90deg)'],['auto','auto','rotate(180deg)']].map(([t,r,rot],i) => (
        <svg key={i} width="56" height="56" style={{ position:'absolute', top: t==='0'?16:'auto', bottom: t==='auto'?16:'auto', left: r==='0'?16:'auto', right: r==='auto'?16:'auto', transform: rot }} viewBox="0 0 56 56" fill="none">
          <path d="M4 4 L22 4 L4 22 Z" fill="none" stroke="#d1fae5" strokeWidth="1.5"/>
          <line x1="4" y1="4" x2="16" y2="4" stroke="#d1fae5" strokeWidth="2"/>
          <line x1="4" y1="4" x2="4" y2="16" stroke="#d1fae5" strokeWidth="2"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 38,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 56px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 12, letterSpacing: 5, color: '#d1fae5', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#d1fae5', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#ffffff', letterSpacing: 6, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#d1fae5', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#a7f3d0' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#d1fae5', borderBottom: '1px solid #d1fae5', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#a7f3d0', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#ffffff' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#d1fae5' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#d1fae5' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d1fae5" />
          <SignatureRow data={data} accentColor="#d1fae5" textColor="#ffffff" subColor="#a7f3d0" />
        </div>
      </div>
    </div>
  );
}
