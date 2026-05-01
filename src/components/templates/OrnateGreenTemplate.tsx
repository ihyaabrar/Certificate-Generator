import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function OrnateGreenTemplate({ data, scale = 1 }: Props) {
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
      <div style={{ position: 'absolute', inset: 10, border: '3px solid #065f46', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '1px solid #065f46', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(6,95,70,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      {[
        { top: 10, left: 10, rot: 'rotate(0deg)' },
        { top: 10, right: 10, rot: 'rotate(90deg)' },
        { bottom: 10, left: 10, rot: 'rotate(-90deg)' },
        { bottom: 10, right: 10, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="80" height="80" style={{ position: 'absolute', top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, transform: pos.rot }} viewBox="0 0 80 80" fill="none">
          <path d="M4 4 L30 4 L4 30 Z" fill="rgba(6,95,70,0.08)" stroke="#065f46" strokeWidth="1"/>
          <path d="M4 4 L20 4" stroke="#065f46" strokeWidth="2.5"/>
          <path d="M4 4 L4 20" stroke="#065f46" strokeWidth="2.5"/>
          <path d="M8 8 Q20 8 20 20" stroke="#065f46" strokeWidth="1" fill="none"/>
          <path d="M8 8 Q8 20 20 20" stroke="#065f46" strokeWidth="1" fill="none"/>
          <circle cx="4" cy="4" r="3" fill="#065f46"/>
        </svg>
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 40,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#065f46', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ flex: 1, height: 1, background: '#065f46' }} />
            <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" fill="#065f46"/></svg>
            <div style={{ flex: 1, height: 1, background: '#065f46' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#065f46', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#047857', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#065f46', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #065f46', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#065f46', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#065f46' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#047857' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#047857' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#6ee7b7" />
          <SignatureRow data={data} accentColor="#065f46" textColor="#1a202c" subColor="#047857" />
        </div>
      </div>
    </div>
  );
}
