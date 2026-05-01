/**
 * ISLAMIC GEOMETRIC — Pola geometris islami dengan ornamen arabesque
 * Layout: Border ornamen geometris, konten formal di tengah
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

// Islamic geometric pattern tile
const GeometricPattern = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <rect width="60" height="60" fill="transparent"/>
    {/* 8-pointed star */}
    <path d="M30 5 L33 22 L48 15 L37 27 L55 30 L37 33 L48 45 L33 38 L30 55 L27 38 L12 45 L23 33 L5 30 L23 27 L12 15 L27 22 Z" fill="rgba(180,83,9,0.15)" stroke="rgba(180,83,9,0.3)" strokeWidth="0.5"/>
    {/* Inner octagon */}
    <path d="M30 18 L36 24 L36 36 L30 42 L24 36 L24 24 Z" fill="none" stroke="rgba(180,83,9,0.2)" strokeWidth="0.5"/>
    <circle cx="30" cy="30" r="3" fill="rgba(180,83,9,0.2)"/>
  </svg>
);

export default function IslamicTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: '#fffbf0', position: 'relative',
      fontFamily: 'Georgia, serif',
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Geometric pattern border - top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, display: 'flex', overflow: 'hidden' }}>
        {Array.from({length: 20}).map((_,i) => <GeometricPattern key={i} />)}
      </div>
      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, display: 'flex', overflow: 'hidden', transform: 'scaleY(-1)' }}>
        {Array.from({length: 20}).map((_,i) => <GeometricPattern key={i} />)}
      </div>
      {/* Left */}
      <div style={{ position: 'absolute', top: 60, left: 0, bottom: 60, width: 60, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {Array.from({length: 12}).map((_,i) => <GeometricPattern key={i} />)}
      </div>
      {/* Right */}
      <div style={{ position: 'absolute', top: 60, right: 0, bottom: 60, width: 60, display: 'flex', flexDirection: 'column', overflow: 'hidden', transform: 'scaleX(-1)' }}>
        {Array.from({length: 12}).map((_,i) => <GeometricPattern key={i} />)}
      </div>

      {/* Gold border lines */}
      <div style={{ position: 'absolute', inset: 60, border: '2px solid #b45309', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 66, border: '1px solid rgba(180,83,9,0.3)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 72,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 60px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 44, maxWidth: 120, objectFit: 'contain', marginBottom: 8 }} />
          )}
          {/* Arabic-style decorative header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 6 }}>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <path d="M0 10 Q10 0 20 10 Q30 20 40 10" stroke="#b45309" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="10" r="3" fill="#b45309"/>
            </svg>
            <div style={{ fontSize: 11, letterSpacing: 5, color: '#92400e', textTransform: 'uppercase' }}>{data.organizer}</div>
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <path d="M0 10 Q10 20 20 10 Q30 0 40 10" stroke="#b45309" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="10" r="3" fill="#b45309"/>
            </svg>
          </div>
          <div style={{ fontSize: 36, fontWeight: 'bold', color: '#78350f', letterSpacing: 6, textTransform: 'uppercase' }}>SERTIFIKAT</div>
          <div style={{ fontSize: 12, color: '#b45309', letterSpacing: 3, marginTop: 4 }}>{data.eventType}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginTop: 8 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(180,83,9,0.4)' }} />
            <div style={{ fontSize: 18, color: '#b45309' }}>❋</div>
            <div style={{ flex: 1, height: 1, background: 'rgba(180,83,9,0.4)' }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>Diberikan kepada</div>
          <div style={{ fontSize: 42, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #b45309', paddingBottom: 8, minWidth: 360 }}>
            {data.recipientName}
          </div>
          <div style={{ fontSize: 12, color: '#92400e', fontStyle: 'italic', marginTop: 6 }}>atas keikutsertaannya dalam</div>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#78350f' }}>{data.eventTitle}</div>
          <div style={{ fontSize: 11, color: '#a16207' }}>{[data.location, data.date].filter(Boolean).join(' · ')}</div>
        </div>

        {/* Footer */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <CertNo data={data} color="#d97706" />
          <SignatureRow data={data} accentColor="#b45309" textColor="#1c1917" subColor="#92400e" />
        </div>
      </div>
    </div>
  );
}
