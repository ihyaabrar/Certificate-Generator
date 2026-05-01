import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function SeminarTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f8fafc', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Formal slate borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #1e293b', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(30,41,59,0.3)', pointerEvents: 'none' }} />

      {/* Top decorative band */}
      <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 40, background: '#1e293b' }} />

      {/* Top band content */}
      <div style={{
        position: 'absolute', top: 14, left: 14, right: 14, height: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ fontSize: 11, letterSpacing: 6, color: '#ffffff', textTransform: 'uppercase' }}>{data.organizer}</div>
        <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.4)' }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 54, left: 22, right: 22, bottom: 22,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#475569', textTransform: 'uppercase', marginBottom: 6 }}>Certificate of Seminar</div>
          <div style={{ width: 60, height: 2, background: '#1e293b', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#1e293b', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#475569', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#0f172a', borderBottom: '2px solid #1e293b', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1e293b' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#94a3b8" />
          <SignatureRow data={data} accentColor="#1e293b" textColor="#0f172a" subColor="#64748b" />
        </div>
      </div>
    </div>
  );
}
