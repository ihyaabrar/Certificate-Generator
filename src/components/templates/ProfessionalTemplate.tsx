import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function ProfessionalTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f8fafc', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Left info panel */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 280,
        background: '#f1f5f9', borderRight: '1px solid #e2e8f0',
        display: 'flex', flexDirection: 'column',
        padding: '48px 28px', gap: 20,
      }}>
        <LogoImg data={data} height={48} />
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Penyelenggara</div>
          <div style={{ fontSize: 14, fontWeight: 'bold', color: '#334155' }}>{data.organizer}</div>
        </div>
        <div style={{ width: '100%', height: 1, background: '#e2e8f0' }} />
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Jenis</div>
          <div style={{ fontSize: 13, color: '#475569' }}>{data.eventType}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Tanggal</div>
          <div style={{ fontSize: 13, color: '#475569' }}>{data.date}</div>
        </div>
        {data.location && (
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>Lokasi</div>
            <div style={{ fontSize: 13, color: '#475569' }}>{data.location}</div>
          </div>
        )}
        <div style={{ marginTop: 'auto' }}>
          <CertNo data={data} color="#94a3b8" />
        </div>
      </div>

      {/* Right certificate content */}
      <div style={{
        position: 'absolute', top: 0, left: 280, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 56px',
      }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 16 }}>Certificate of Participation</div>
        <div style={{ fontSize: 38, fontWeight: 'bold', color: '#334155', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 }}>SERTIFIKAT</div>
        <div style={{ width: 48, height: 3, background: '#334155', marginBottom: 28 }} />
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>Diberikan kepada</div>
        <div style={{ fontSize: 46, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 }}>
          {data.recipientName}
        </div>
        <div style={{ width: '100%', height: 1, background: '#e2e8f0', marginBottom: 16 }} />
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#334155', marginBottom: 32 }}>{data.eventTitle}</div>
        <SignatureRow data={data} accentColor="#334155" textColor="#0f172a" subColor="#64748b" />
      </div>
    </div>
  );
}
