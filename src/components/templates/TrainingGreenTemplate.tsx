import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function TrainingGreenTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f0fdfa', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Teal accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: '#0f766e' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 5, background: '#0f766e' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: '#0f766e' }} />

      <div style={{ position: 'absolute', top: 5, right: 0, width: 300, bottom: 3, background: 'linear-gradient(to left, rgba(15,118,110,0.04), transparent)' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 5, left: 5, right: 0, bottom: 3,
        display: 'flex', flexDirection: 'column',
        padding: '36px 56px 28px 48px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <LogoImg data={data} height={48} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 'bold', color: '#0f766e', letterSpacing: 2, textTransform: 'uppercase' }}>{data.organizer}</div>
            <div style={{ width: 160, height: 2, background: '#0f766e', marginTop: 4 }} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#0f766e', textTransform: 'uppercase', marginBottom: 6 }}>Certificate of Training</div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#134e4a', letterSpacing: 3, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#0f766e', letterSpacing: 2, marginTop: 2 }}>{data.eventType}</div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#134e4a', borderBottom: '2px solid #0f766e', paddingBottom: 6, display: 'inline-block' }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#0f766e' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#64748b' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#64748b' }}>{data.date}</div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#94a3b8" />
          <SignatureRow data={data} accentColor="#0f766e" textColor="#134e4a" subColor="#64748b" />
        </div>
      </div>
    </div>
  );
}
