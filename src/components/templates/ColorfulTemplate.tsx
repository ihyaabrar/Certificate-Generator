import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function ColorfulTemplate({ data, scale = 1 }: Props) {
  const rainbowColors = ['#ef4444','#f97316','#eab308','#22c55e','#3b82f6','#8b5cf6'];
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#ffffff', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Rainbow top stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, display: 'flex' }}>
        {rainbowColors.map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>
      {/* Rainbow bottom stripe */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, display: 'flex' }}>
        {rainbowColors.map((c, i) => (
          <div key={i} style={{ flex: 1, background: c }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', top: 10, left: 0, right: 0, bottom: 6,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={48} />
          <div style={{ fontSize: 12, letterSpacing: 4, color: '#374151', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          {/* Colorful dots divider */}
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 10 }}>
            {rainbowColors.map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#111827', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 14, color: '#6b7280', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#6b7280' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#111827', borderBottom: '3px solid #eab308', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#6b7280', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#3b82f6' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#6b7280' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#6b7280' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#9ca3af" />
          <SignatureRow data={data} accentColor="#3b82f6" textColor="#111827" subColor="#6b7280" />
        </div>
      </div>
    </div>
  );
}
