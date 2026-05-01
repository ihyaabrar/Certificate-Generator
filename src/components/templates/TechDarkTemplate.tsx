import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function TechDarkTemplate({ data, scale = 1 }: Props) {
  // Generate dot grid pattern
  const dots = [];
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 30; c++) {
      dots.push({ x: c * 38 + 10, y: r * 40 + 10 });
    }
  }

  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#18181b', position: 'relative',
        fontFamily: "'Courier New', Courier, monospace", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Dot grid background */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.12 }} width="1122" height="794">
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="1.5" fill="#22d3ee"/>)}
      </svg>

      {/* Cyan border */}
      <div style={{ position: 'absolute', inset: 16, border: '1px solid rgba(34,211,238,0.4)', pointerEvents: 'none' }} />
      {/* Corner brackets */}
      {[
        { top: 16, left: 16 }, { top: 16, right: 16 },
        { bottom: 16, left: 16 }, { bottom: 16, right: 16 },
      ].map((pos, i) => (
        <svg key={i} width="20" height="20" style={{ position: 'absolute', ...pos }} viewBox="0 0 20 20" fill="none">
          <path d={i===0?"M0 12 L0 0 L12 0":i===1?"M8 0 L20 0 L20 12":i===2?"M0 8 L0 20 L12 20":"M8 20 L20 20 L20 8"} stroke="#22d3ee" strokeWidth="2"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} filter="brightness(0) saturate(100%) invert(80%) sepia(100%) saturate(500%) hue-rotate(160deg)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#22d3ee', textTransform: 'uppercase', marginBottom: 4 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#22d3ee', margin: '0 auto 10px', boxShadow: '0 0 8px #22d3ee' }} />
          <div style={{
            fontSize: 38, fontWeight: 'bold', color: '#22d3ee', letterSpacing: 6, textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.4)',
          }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 12, color: '#67e8f9', letterSpacing: 4, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: '#67e8f9' }}>{'// recipient'}</div>
          <div style={{
            fontSize: 42, fontWeight: 'bold', color: '#ffffff',
            textShadow: '0 0 10px rgba(34,211,238,0.3)',
            borderBottom: '1px solid rgba(34,211,238,0.5)', paddingBottom: 8, minWidth: 360,
          }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 12, color: '#67e8f9' }}>{'// event'}</div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#22d3ee' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 11, color: '#52525b' }}>{data.location}</div>}
          <div style={{ fontSize: 11, color: '#52525b' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#52525b" />
          <SignatureRow data={data} accentColor="#22d3ee" textColor="#ffffff" subColor="#67e8f9" />
        </div>
      </div>
    </div>
  );
}
