import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function BohemianTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f7fee7', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Leaf corner decorations */}
      <svg style={{ position: 'absolute', top: 0, left: 0 }} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M10 10 Q40 10 40 40 Q40 10 70 10" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <path d="M10 10 Q10 40 40 40 Q10 40 10 70" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <ellipse cx="25" cy="25" rx="12" ry="8" fill="rgba(77,124,15,0.15)" transform="rotate(-45 25 25)"/>
        <ellipse cx="45" cy="15" rx="10" ry="6" fill="rgba(77,124,15,0.12)" transform="rotate(-20 45 15)"/>
        <ellipse cx="15" cy="45" rx="10" ry="6" fill="rgba(77,124,15,0.12)" transform="rotate(-70 15 45)"/>
      </svg>
      <svg style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M10 10 Q40 10 40 40 Q40 10 70 10" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <path d="M10 10 Q10 40 40 40 Q10 40 10 70" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <ellipse cx="25" cy="25" rx="12" ry="8" fill="rgba(77,124,15,0.15)" transform="rotate(-45 25 25)"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, transform: 'scaleY(-1)' }} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M10 10 Q40 10 40 40 Q40 10 70 10" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <path d="M10 10 Q10 40 40 40 Q10 40 10 70" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <ellipse cx="25" cy="25" rx="12" ry="8" fill="rgba(77,124,15,0.15)" transform="rotate(-45 25 25)"/>
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, right: 0, transform: 'scale(-1,-1)' }} width="120" height="120" viewBox="0 0 120 120" fill="none">
        <path d="M10 10 Q40 10 40 40 Q40 10 70 10" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <path d="M10 10 Q10 40 40 40 Q10 40 10 70" stroke="#4d7c0f" strokeWidth="1.5" fill="none"/>
        <ellipse cx="25" cy="25" rx="12" ry="8" fill="rgba(77,124,15,0.15)" transform="rotate(-45 25 25)"/>
      </svg>

      {/* Border */}
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(77,124,15,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 80px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 12, letterSpacing: 4, color: '#4d7c0f', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 40, height: 1, background: '#4d7c0f' }} />
            <svg width="16" height="16" viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="6" ry="4" fill="rgba(77,124,15,0.3)" transform="rotate(-45 8 8)"/></svg>
            <div style={{ width: 40, height: 1, background: '#4d7c0f' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#365314', letterSpacing: 3, fontStyle: 'italic' }}>Sertifikat</div>
          <div style={{ fontSize: 13, color: '#4d7c0f', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#4d7c0f', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #4d7c0f', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#4d7c0f', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#365314' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#4d7c0f' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#4d7c0f' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#86efac" />
          <SignatureRow data={data} accentColor="#4d7c0f" textColor="#1a202c" subColor="#4d7c0f" />
        </div>
      </div>
    </div>
  );
}
