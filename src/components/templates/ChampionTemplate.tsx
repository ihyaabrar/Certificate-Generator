import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function ChampionTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fbbf24', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Dark borders */}
      <div style={{ position: 'absolute', inset: 12, border: '3px solid #1c1917', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(28,25,23,0.3)', pointerEvents: 'none' }} />

      {/* Star decorations */}
      {[{top:20,left:80},{top:20,right:80},{bottom:20,left:80},{bottom:20,right:80}].map((pos,i)=>(
        <svg key={i} width="28" height="28" style={{ position:'absolute', ...pos }} viewBox="0 0 28 28" fill="#1c1917">
          <path d="M14 2 L16.8 10.2 L25.6 10.2 L18.8 15.4 L21.6 23.6 L14 18.4 L6.4 23.6 L9.2 15.4 L2.4 10.2 L11.2 10.2 Z"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 32,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#1c1917', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 3, background: '#1c1917', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1c1917', letterSpacing: 5, textTransform: 'uppercase' }}>CHAMPION</div>
          <div style={{ fontSize: 14, color: '#44403c', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#44403c' }}>Diberikan kepada</div>
          <div style={{ fontSize: 46, fontWeight: 'bold', color: '#1c1917', borderBottom: '3px solid #1c1917', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#44403c', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#1c1917' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#44403c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#44403c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#44403c" />
          <SignatureRow data={data} accentColor="#1c1917" textColor="#1c1917" subColor="#44403c" />
        </div>
      </div>
    </div>
  );
}
