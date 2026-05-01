import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function GraduationTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#1e1b4b', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Gold borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #fbbf24', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(251,191,36,0.4)', pointerEvents: 'none' }} />

      {/* Gold star decorations */}
      {[{top:30,left:60},{top:30,right:60},{bottom:30,left:60},{bottom:30,right:60}].map((pos,i)=>(
        <svg key={i} width="24" height="24" style={{ position:'absolute', ...pos }} viewBox="0 0 24 24" fill="#fbbf24">
          <path d="M12 2 L14.4 9.2 L22 9.2 L16 13.8 L18.4 21 L12 16.4 L5.6 21 L8 13.8 L2 9.2 L9.6 9.2 Z"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        {/* Graduation cap icon */}
        <div style={{ textAlign: 'center' }}>
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 8 }}>
            <path d="M28 8 L52 20 L28 32 L4 20 Z" fill="#fbbf24"/>
            <path d="M14 26 L14 40 C14 40 20 46 28 46 C36 46 42 40 42 40 L42 26" stroke="#fbbf24" strokeWidth="2.5" fill="none"/>
            <line x1="52" y1="20" x2="52" y2="34" stroke="#fbbf24" strokeWidth="2.5"/>
            <circle cx="52" cy="36" r="3" fill="#fbbf24"/>
          </svg>
          <LogoImg data={data} height={36} filter="brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(5deg)" />
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#fbbf24', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#fbbf24', letterSpacing: 4, textTransform: 'uppercase' }}>
            CERTIFICATE OF GRADUATION
          </div>
          <div style={{ fontSize: 13, color: '#c7d2fe', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#c7d2fe' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #fbbf24', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#c7d2fe', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fbbf24' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#c7d2fe' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#c7d2fe' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#fbbf24" />
          <SignatureRow data={data} accentColor="#fbbf24" textColor="#ffffff" subColor="#c7d2fe" />
        </div>
      </div>
    </div>
  );
}
