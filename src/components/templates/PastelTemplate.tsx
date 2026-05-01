import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function PastelTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #fdf2f8 100%)',
        position: 'relative', fontFamily: 'Georgia, serif',
        overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Soft decorative circles */}
      <div style={{ position: 'absolute', top: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(244,63,94,0.06)' }} />
      <div style={{ position: 'absolute', bottom: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(167,139,250,0.08)' }} />

      {/* Rounded content card */}
      <div style={{
        position: 'absolute', inset: 32,
        borderRadius: 20, border: '2px solid rgba(244,63,94,0.2)',
        background: 'rgba(255,255,255,0.7)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '28px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} />
          <div style={{ fontSize: 12, letterSpacing: 4, color: '#f43f5e', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: 10 }}>
            <div style={{ width: 30, height: 1, background: 'rgba(244,63,94,0.4)' }} />
            <div style={{ fontSize: 16, color: '#f43f5e' }}>✿</div>
            <div style={{ width: 30, height: 1, background: 'rgba(244,63,94,0.4)' }} />
          </div>
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#be123c', letterSpacing: 3, fontStyle: 'italic' }}>Sertifikat</div>
          <div style={{ fontSize: 13, color: '#f43f5e', letterSpacing: 2, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#1a202c', borderBottom: '2px solid rgba(244,63,94,0.4)', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#9d174d', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#be123c' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#9d174d' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#9d174d' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#fda4af" />
          <SignatureRow data={data} accentColor="#f43f5e" textColor="#1a202c" subColor="#9d174d" />
        </div>
      </div>
    </div>
  );
}
