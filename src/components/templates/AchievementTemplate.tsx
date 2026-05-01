import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function AchievementTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#312e81', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Gold borders */}
      <div style={{ position: 'absolute', inset: 14, border: '2px solid #fbbf24', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 22, border: '1px solid rgba(251,191,36,0.3)', pointerEvents: 'none' }} />

      {/* Star decorations */}
      {[
        {top:30,left:60,size:20},{top:30,right:60,size:20},
        {bottom:30,left:60,size:20},{bottom:30,right:60,size:20},
        {top:30,left:200,size:14},{top:30,right:200,size:14},
      ].map((s,i)=>(
        <svg key={i} width={s.size} height={s.size} style={{ position:'absolute', top:s.top, bottom:(s as {bottom?:number}).bottom, left:(s as {left?:number}).left, right:(s as {right?:number}).right }} viewBox="0 0 24 24" fill="#fbbf24" opacity="0.8">
          <path d="M12 2 L14.4 9.2 L22 9.2 L16 13.8 L18.4 21 L12 16.4 L5.6 21 L8 13.8 L2 9.2 L9.6 9.2 Z"/>
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
          <LogoImg data={data} height={44} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 6 }}>{data.organizer}</div>
          <div style={{ width: 60, height: 1, background: '#fbbf24', margin: '0 auto 10px' }} />
          <div style={{ fontSize: 38, fontWeight: 'bold', color: '#fbbf24', letterSpacing: 4, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 13, color: '#c7d2fe', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: '#c7d2fe' }}>Diberikan kepada</div>
          <div style={{ fontSize: 44, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #fbbf24', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 13, color: '#c7d2fe', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fbbf24' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 12, color: '#818cf8' }}>{data.location}</div>}
          <div style={{ fontSize: 12, color: '#818cf8' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#818cf8" />
          <SignatureRow data={data} accentColor="#fbbf24" textColor="#ffffff" subColor="#c7d2fe" />
        </div>
      </div>
    </div>
  );
}
