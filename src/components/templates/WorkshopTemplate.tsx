import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function WorkshopTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f5f3ff', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Violet accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(to right, #6d28d9, #7c3aed)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#6d28d9' }} />

      {/* Decorative violet blob */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 6, left: 0, right: 0, bottom: 3,
        display: 'flex', flexDirection: 'column',
        padding: '36px 60px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <LogoImg data={data} height={48} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 'bold', color: '#6d28d9', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ width: 160, height: 2, background: '#6d28d9', marginTop: 4 }} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#6d28d9', textTransform: 'uppercase', marginBottom: 6 }}>Certificate of Workshop</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#4c1d95', letterSpacing: 3, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#6d28d9', letterSpacing: 2, marginTop: 2 }}>{data.eventType}</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#4c1d95', borderBottom: '2px solid #6d28d9', paddingBottom: 6, display: 'inline-block' }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#6d28d9' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#94a3b8" />
          <SignatureRow data={data} accentColor="#6d28d9" textColor="#4c1d95" subColor="#64748b" />
        </div>
      </div>
    </div>
  );
}
