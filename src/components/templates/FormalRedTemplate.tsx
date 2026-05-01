import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function FormalRedTemplate({ data, scale = 1 }: Props) {
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
      {/* Thick red top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#991b1b' }} />
      {/* Thin red bottom bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: '#991b1b' }} />
      {/* Left red sidebar */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, background: '#991b1b' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', top: 8, left: 12, right: 0, bottom: 4,
        display: 'flex', flexDirection: 'column',
        padding: '32px 56px 28px 44px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <LogoImg data={data} height={52} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 'bold', color: '#991b1b', letterSpacing: 2, textTransform: 'uppercase' }}>
              {data.organizer}
            </div>
            <div style={{ width: 200, height: 2, background: '#991b1b', marginTop: 4 }} />
          </div>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#1a202c', letterSpacing: 4, textTransform: 'uppercase' }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 15, color: '#991b1b', letterSpacing: 2, marginTop: 2 }}>{data.eventType}</div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#718096' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '3px solid #991b1b', paddingBottom: 6, display: 'inline-block' }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#718096', marginTop: 8 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 22, fontWeight: 'bold', color: '#991b1b' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#718096' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#718096' }}>{data.date}</div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #fecaca', paddingTop: 16 }}>
          <CertNo data={data} color="#a0aec0" />
          <SignatureRow data={data} accentColor="#991b1b" textColor="#1a202c" subColor="#718096" />
        </div>
      </div>
    </div>
  );
}
