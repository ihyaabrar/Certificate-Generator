import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function CorporateGrayTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#f9fafb', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Left dark sidebar */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 200, background: '#1f2937' }} />

      {/* Sidebar content */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 200,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px', gap: 16,
      }}>
        <LogoImg data={data} height={52} filter="brightness(0) invert(1)" />
        <div style={{ width: 40, height: 2, background: '#9ca3af' }} />
        <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.6 }}>
          {data.organizer}
        </div>
        <div style={{ width: 40, height: 1, background: '#374151' }} />
        <div style={{ fontSize: 10, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
          {data.eventType}
        </div>
        <div style={{ marginTop: 'auto', fontSize: 10, color: '#6b7280', textAlign: 'center' }}>
          {data.date}
        </div>
        {data.location && (
          <div style={{ fontSize: 10, color: '#6b7280', textAlign: 'center' }}>{data.location}</div>
        )}
      </div>

      {/* Right content area */}
      <div style={{
        position: 'absolute', top: 0, left: 200, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '40px 56px',
      }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#6b7280', textTransform: 'uppercase', marginBottom: 12 }}>Certificate of Participation</div>
        <div style={{ fontSize: 40, fontWeight: 'bold', color: '#1f2937', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24 }}>
          SERTIFIKAT
        </div>
        <div style={{ width: 60, height: 3, background: '#1f2937', marginBottom: 24 }} />
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>Diberikan kepada</div>
        <div style={{ fontSize: 44, fontWeight: 'bold', color: '#111827', marginBottom: 8 }}>
          {data.recipientName}
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>atas keikutsertaannya dalam</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', color: '#374151', marginBottom: 32 }}>{data.eventTitle}</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#9ca3af" />
          <SignatureRow data={data} accentColor="#1f2937" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
