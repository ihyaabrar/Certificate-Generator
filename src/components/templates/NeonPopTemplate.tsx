import type { CertificateData } from '@/src/types';
import { LogoImg, SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

export default function NeonPopTemplate({ data, scale = 1 }: Props) {
  return (
    <div
      className="certificate-page"
      style={{
        width: 1122, height: 794,
        transform: `scale(${scale})`, transformOrigin: 'top left',
        background: '#000000', position: 'relative',
        fontFamily: "'Helvetica Neue', Arial, sans-serif", overflow: 'hidden', boxSizing: 'border-box',
      }}
    >
      {/* Neon border */}
      <div style={{
        position: 'absolute', inset: 14,
        border: '2px solid #f0abfc',
        boxShadow: '0 0 10px rgba(240,171,252,0.5), inset 0 0 10px rgba(240,171,252,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 22,
        border: '1px solid rgba(103,232,249,0.4)',
        pointerEvents: 'none',
      }} />

      {/* Neon corner accents */}
      {[
        { top: 14, left: 14 }, { top: 14, right: 14 },
        { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: 'absolute', ...pos,
          width: 20, height: 20,
          borderTop: i < 2 ? '3px solid #67e8f9' : 'none',
          borderBottom: i >= 2 ? '3px solid #67e8f9' : 'none',
          borderLeft: (i === 0 || i === 2) ? '3px solid #67e8f9' : 'none',
          borderRight: (i === 1 || i === 3) ? '3px solid #67e8f9' : 'none',
          boxShadow: '0 0 8px rgba(103,232,249,0.8)',
        }} />
      ))}

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 36,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 60px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <LogoImg data={data} height={44} filter="brightness(0) invert(1)" />
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#f0abfc', textTransform: 'uppercase', marginBottom: 6, textShadow: '0 0 10px rgba(240,171,252,0.8)' }}>
            {data.organizer}
          </div>
          <div style={{ width: 60, height: 1, background: '#f0abfc', margin: '0 auto 10px', boxShadow: '0 0 8px rgba(240,171,252,0.8)' }} />
          <div style={{
            fontSize: 44, fontWeight: 'bold', color: '#f0abfc', letterSpacing: 6, textTransform: 'uppercase',
            textShadow: '0 0 20px rgba(240,171,252,0.9), 0 0 40px rgba(240,171,252,0.5), 0 0 60px rgba(240,171,252,0.3)',
          }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 13, color: '#67e8f9', letterSpacing: 4, marginTop: 4, textShadow: '0 0 8px rgba(103,232,249,0.8)' }}>
            {data.eventType}
          </div>
        </div>

        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: '#67e8f9', textShadow: '0 0 6px rgba(103,232,249,0.6)' }}>Diberikan kepada</div>
          <div style={{
            fontSize: 44, fontWeight: 'bold', color: '#ffffff',
            textShadow: '0 0 10px rgba(255,255,255,0.3)',
            borderBottom: '1px solid rgba(240,171,252,0.5)', paddingBottom: 8, minWidth: 360,
          }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 12, color: '#67e8f9', marginTop: 6, textShadow: '0 0 6px rgba(103,232,249,0.6)' }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 20, fontWeight: 'bold', color: '#f0abfc', textShadow: '0 0 10px rgba(240,171,252,0.6)' }}>{data.eventTitle}</div>
          {data.location && <div style={{ fontSize: 11, color: '#52525b' }}>{data.location}</div>}
          <div style={{ fontSize: 11, color: '#52525b' }}>{data.date}</div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#52525b" />
          <SignatureRow data={data} accentColor="#f0abfc" textColor="#ffffff" subColor="#67e8f9" />
        </div>
      </div>
    </div>
  );
}
