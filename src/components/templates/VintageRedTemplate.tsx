import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function VintageRedTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#fef2f2', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Vintage red borders */}
      <div style={{ position: 'absolute', inset: 12, border: '3px solid #991b1b', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(153,27,27,0.4)', pointerEvents: 'none' }} />

      {/* Vintage corner ornaments */}
      {[
        { top: 12, left: 12, rot: 'rotate(0deg)' },
        { top: 12, right: 12, rot: 'rotate(90deg)' },
        { bottom: 12, left: 12, rot: 'rotate(-90deg)' },
        { bottom: 12, right: 12, rot: 'rotate(180deg)' },
      ].map((pos, i) => (
        <svg key={i} width="50" height="50" style={{ position: 'absolute', top: pos.top, bottom: pos.bottom, left: pos.left, right: pos.right, transform: pos.rot }} viewBox="0 0 50 50" fill="none">
          <path d="M4 4 L18 4 L4 18 Z" fill="rgba(153,27,27,0.1)" stroke="#991b1b" strokeWidth="1"/>
          <line x1="4" y1="4" x2="14" y2="4" stroke="#991b1b" strokeWidth="2"/>
          <line x1="4" y1="4" x2="4" y2="14" stroke="#991b1b" strokeWidth="2"/>
          <circle cx="4" cy="4" r="2" fill="#991b1b"/>
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
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#991b1b', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 80, height: 2, background: '#991b1b', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#7f1d1d', letterSpacing: 4, textTransform: 'uppercase', fontStyle: 'italic' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#991b1b', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#991b1b', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid #991b1b', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#991b1b', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#7f1d1d' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#b91c1c' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#b91c1c' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#fca5a5" />
          <SignatureRow data={data} accentColor="#991b1b" textColor="#1a202c" subColor="#991b1b" />
        </div>
      </div>
    </div>
  );
}
