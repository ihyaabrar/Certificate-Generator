import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function MandalaTemplate({ data, scale = 1 }: Props) {
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
      {/* Mandala-inspired circular decoration - center background */}
      <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04 }} width="600" height="600" viewBox="0 0 600 600">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 300 300)`}>
            <ellipse cx="300" cy="160" rx="20" ry="60" fill="#6d28d9"/>
            <ellipse cx="300" cy="200" rx="12" ry="40" fill="#6d28d9"/>
          </g>
        ))}
        <circle cx="300" cy="300" r="80" fill="none" stroke="#6d28d9" strokeWidth="2"/>
        <circle cx="300" cy="300" r="120" fill="none" stroke="#6d28d9" strokeWidth="1"/>
        <circle cx="300" cy="300" r="160" fill="none" stroke="#6d28d9" strokeWidth="1"/>
      </svg>

      {/* Border */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid rgba(109,40,217,0.4)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(109,40,217,0.2)', pointerEvents: 'none' }} />

      {/* Corner mandala elements */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 },
        { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <svg key={i} width="50" height="50" style={{ position: 'absolute', ...pos }} viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(109,40,217,0.3)" strokeWidth="1"/>
          <circle cx="25" cy="25" r="12" fill="none" stroke="rgba(109,40,217,0.2)" strokeWidth="1"/>
          {[0,45,90,135,180,225,270,315].map((a, j) => (
            <line key={j} x1="25" y1="25" x2={25 + 20*Math.cos(a*Math.PI/180)} y2={25 + 20*Math.sin(a*Math.PI/180)} stroke="rgba(109,40,217,0.2)" strokeWidth="0.5"/>
          ))}
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#6d28d9', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#6d28d9', margin: '0 auto 12px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#4c1d95', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#6d28d9', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#7c3aed', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #6d28d9', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#7c3aed', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#4c1d95' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#7c3aed' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#7c3aed' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#c4b5fd" />
          <SignatureRow data={data} accentColor="#6d28d9" textColor="#1a202c" subColor="#7c3aed" />
        </div>
      </div>
    </div>
  );
}
