import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function BootcampTemplate({ data, scale = 1 }: Props) {
  // Code-like decorative elements
  const codeLines = [
    '// Certificate of Completion',
    'const recipient = {',
    `  name: "${data.recipientName || 'Recipient'}",`,
    '  status: "COMPLETED",',
    '};',
  ];

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
      {/* Code decoration - left side */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 220,
        background: '#09090b', borderRight: '1px solid rgba(16,185,129,0.2)',
        padding: '40px 16px', overflow: 'hidden',
      }}>
        {codeLines.map((line, i) => (
          <div key={i} style={{ fontSize: 10, color: i === 0 ? '#6b7280' : i === 1 || i === 4 ? '#10b981' : '#d1fae5', marginBottom: 6, whiteSpace: 'nowrap' }}>
            <span style={{ color: '#374151', marginRight: 8 }}>{String(i+1).padStart(2,'0')}</span>
            {line}
          </div>
        ))}
        <div style={{ marginTop: 20 }}>
          {Array.from({length: 12}).map((_,i) => (
            <div key={i} style={{ fontSize: 10, color: '#27272a', marginBottom: 6 }}>
              {String(i+6).padStart(2,'0')} {'·'.repeat(Math.floor(Math.random()*20)+5)}
            </div>
          ))}
        </div>
      </div>

      {/* Emerald border */}
      <div style={{ position: 'absolute', top: 0, left: 220, right: 0, height: 2, background: 'linear-gradient(to right, #10b981, transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 220, right: 0, height: 2, background: 'linear-gradient(to right, #10b981, transparent)' }} />

      {/* Main content */}
      <div style={{
        position: 'absolute', top: 0, left: 220, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        padding: '36px 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <LogoImg data={data} height={44} filter="brightness(0) saturate(100%) invert(60%) sepia(100%) saturate(400%) hue-rotate(120deg)" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 'bold', color: '#10b981', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ fontSize: 10, color: '#6b7280', letterSpacing: 2 }}>{data.eventType}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: '#10b981', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 4 }}>{'> Certificate of Completion'}</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#10b981', letterSpacing: 3, textTransform: 'uppercase' }}>BOOTCAMP</div>
          <div style={{ width: 80, height: 2, background: '#10b981', marginTop: 6 }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{'// Diberikan kepada'}</div>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#ffffff', lineHeight: 1.1 }}>
            {data.recipientName}
          </div>
          <div style={{ width: 160, height: 2, background: 'rgba(16,185,129,0.5)' }} />
          <div style={{ fontSize: 12, color: '#6b7280' }}>{'// atas keikutsertaannya dalam'}</div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#10b981' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 11, color: '#3f3f46' }}>{data.location}</div>}
          <div style={{ fontSize: 11, color: '#3f3f46' }}>{data.date}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#3f3f46" />
          <SignatureRow data={data} accentColor="#10b981" textColor="#ffffff" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
