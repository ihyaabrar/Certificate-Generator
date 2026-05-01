import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function CelticTemplate({ data, scale = 1 }: Props) {
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
      {/* Celtic borders */}
      <div style={{ position: 'absolute', inset: 10, border: '3px solid #166534', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(22,101,52,0.4)', pointerEvents: 'none' }} />

      {/* Celtic knot corners */}
      {[
        { top: 10, left: 10, rot: 'rotate(0deg)' },
        { top: 10, right: 10, rot: 'rotate(90deg)' },
        { bottom: 10, left: 10, rot: 'rotate(-90deg)' },
        { bottom: 10, right: 10, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="70" height="70" style={{ position: 'absolute', top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, transform: pos.rot }} viewBox="0 0 70 70" fill="none">
          {/* Simplified Celtic knot */}
          <path d="M4 4 L22 4 L4 22 Z" fill="rgba(22,101,52,0.1)" stroke="#166534" strokeWidth="1"/>
          <path d="M4 4 L16 4" stroke="#166534" strokeWidth="2.5"/>
          <path d="M4 4 L4 16" stroke="#166534" strokeWidth="2.5"/>
          <path d="M10 4 C10 10 16 10 16 4" stroke="#166534" strokeWidth="1.5" fill="none"/>
          <path d="M4 10 C10 10 10 16 4 16" stroke="#166534" strokeWidth="1.5" fill="none"/>
          <path d="M10 10 C10 16 16 16 16 10" stroke="#166534" strokeWidth="1" fill="none"/>
          <circle cx="4" cy="4" r="2.5" fill="#166534"/>
          <circle cx="16" cy="4" r="1.5" fill="#166534"/>
          <circle cx="4" cy="16" r="1.5" fill="#166534"/>
          <circle cx="10" cy="10" r="2" fill="rgba(22,101,52,0.3)"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#166534', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: '#166534' }} />
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 C10 2 14 6 14 10 C14 14 10 18 10 18 C10 18 6 14 6 10 C6 6 10 2 10 2 Z" fill="rgba(22,101,52,0.3)" stroke="#166534" strokeWidth="1"/></svg>
            <div style={{ flex: 1, height: 1, background: '#166534' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#14532d', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#166534', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#166534', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #166534', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#166534', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#14532d' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#166534' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#166534' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#86efac" />
          <SignatureRow data={data} accentColor="#166534" textColor="#1a202c" subColor="#166534" />
        </div>
      </div>
    </div>
  );
}
