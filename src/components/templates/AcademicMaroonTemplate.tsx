import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function AcademicMaroonTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#881337', position: 'relative',
        fontFamily: 'Georgia, serif', overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Top maroon band */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: '#9f1239' }} />
      {/* Bottom maroon band */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, background: '#9f1239' }} />
      {/* White content area */}
      <div style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 50, background: '#ffffff' }} />

      {/* Top band content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        <LogoImg data={data} height={44} filter="brightness(0) invert(1)" />
        <div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff', letterSpacing: 3, textTransform: 'uppercase' }}>{data.organizer}</div>
          <div style={{ fontSize: 11, color: '#fecdd3', letterSpacing: 2 }}>{data.eventType}</div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        position: 'absolute', top: 80, left: 0, right: 0, bottom: 50,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px 80px', gap: 12,
      }}>
        <div style={{ fontSize: 36, fontWeight: 'bold', color: '#881337', letterSpacing: 5, textTransform: 'uppercase' }}>SERTIFIKAT</div>
        <div style={{ width: 80, height: 2, background: '#881337' }} />
        <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
        <div style={{ fontSize: 44, fontWeight: 'bold', color: '#881337', borderBottom: '2px solid #881337', paddingBottom: 6, minWidth: 360, textAlign: 'center' }}>
          {data.recipientName}
        </div>
        <div style={{ fontSize: 13, color: '#64748b' }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#9f1239' }}>{data.eventTitle}</div>
        {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
        <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
      </div>

      {/* Bottom band content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px',
      }}>
        <CertNo data={data} color="#fecdd3" />
        <SignatureRow data={data} accentColor="#fecdd3" textColor="#ffffff" subColor="#fda4af" />
      </div>
    </div>
  );
}
