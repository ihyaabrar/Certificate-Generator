/**
 * ORNATE FRAME — Frame ornamen SVG yang sangat detail di semua sisi
 * Layout: Konten di tengah dikelilingi ornamen elaborate
 */
import type { CertificateData } from '@/src/types';
import { SignatureRow, CertNo } from '@/src/components/templates/TemplateBase';

interface Props { data: CertificateData; scale?: number; }

// Elaborate corner ornament
const CornerOrnament = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
    {/* Main corner lines */}
    <path d="M4 4 L50 4" stroke="#b45309" strokeWidth="2.5"/>
    <path d="M4 4 L4 50" stroke="#b45309" strokeWidth="2.5"/>
    {/* Decorative curves */}
    <path d="M4 4 Q30 4 30 30 Q30 4 4 4" stroke="#d97706" strokeWidth="1" fill="rgba(217,119,6,0.05)"/>
    {/* Scrollwork */}
    <path d="M10 10 Q20 10 20 20 Q20 30 30 30" stroke="#d97706" strokeWidth="1" fill="none"/>
    <path d="M10 10 Q10 20 20 20 Q30 20 30 30" stroke="#d97706" strokeWidth="1" fill="none"/>
    {/* Small circles at intersections */}
    <circle cx="4" cy="4" r="4" fill="#b45309"/>
    <circle cx="50" cy="4" r="2.5" fill="#d97706"/>
    <circle cx="4" cy="50" r="2.5" fill="#d97706"/>
    <circle cx="30" cy="30" r="3" fill="#d97706"/>
    {/* Fleur-de-lis style */}
    <path d="M50 4 Q55 10 50 16 Q45 10 50 4" fill="#d97706"/>
    <path d="M4 50 Q10 55 16 50 Q10 45 4 50" fill="#d97706"/>
    {/* Diamond accents */}
    <path d="M20 4 L23 7 L20 10 L17 7 Z" fill="#d97706"/>
    <path d="M4 20 L7 23 L4 26 L1 23 Z" fill="#d97706"/>
    {/* Vine-like decoration */}
    <path d="M30 30 Q50 40 60 60" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="none"/>
    <circle cx="45" cy="38" r="2" fill="rgba(217,119,6,0.3)"/>
    <circle cx="55" cy="50" r="2" fill="rgba(217,119,6,0.3)"/>
  </svg>
);

// Side ornament (horizontal)
const SideOrnament = () => (
  <svg width="200" height="30" viewBox="0 0 200 30" fill="none">
    <path d="M0 15 L80 15" stroke="#d97706" strokeWidth="1"/>
    <path d="M120 15 L200 15" stroke="#d97706" strokeWidth="1"/>
    <path d="M80 15 Q90 5 100 15 Q110 25 120 15" stroke="#d97706" strokeWidth="1.5" fill="none"/>
    <circle cx="100" cy="15" r="3" fill="#d97706"/>
    <circle cx="85" cy="15" r="2" fill="#d97706"/>
    <circle cx="115" cy="15" r="2" fill="#d97706"/>
    <path d="M90 15 L93 10 L96 15 L93 20 Z" fill="rgba(217,119,6,0.4)"/>
    <path d="M104 15 L107 10 L110 15 L107 20 Z" fill="rgba(217,119,6,0.4)"/>
  </svg>
);

export default function OrnateFrameTemplate({ data, scale = 1 }: Props) {
  return (
    <div className="certificate-page" style={{
      width: 1122, height: 794,
      transform: `scale(${scale})`, transformOrigin: 'top left',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fffbeb 100%)',
      position: 'relative',
      fontFamily: 'Georgia, serif',
      overflow: 'hidden', boxSizing: 'border-box',
    }}>
      {/* Outer border */}
      <div style={{ position: 'absolute', inset: 8, border: '3px solid #b45309', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 16, border: '1px solid #d97706', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 20, border: '1px solid rgba(217,119,6,0.3)', pointerEvents: 'none' }} />

      {/* Corner ornaments */}
      <div style={{ position: 'absolute', top: 8, left: 8 }}><CornerOrnament /></div>
      <div style={{ position: 'absolute', top: 8, right: 8, transform: 'scaleX(-1)' }}><CornerOrnament /></div>
      <div style={{ position: 'absolute', bottom: 8, left: 8, transform: 'scaleY(-1)' }}><CornerOrnament /></div>
      <div style={{ position: 'absolute', bottom: 8, right: 8, transform: 'scale(-1,-1)' }}><CornerOrnament /></div>

      {/* Side ornaments */}
      <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)' }}><SideOrnament /></div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%) scaleY(-1)' }}><SideOrnament /></div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 44,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 80px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          {data.logoDataURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoDataURL} alt="logo" style={{ height: 48, maxWidth: 130, objectFit: 'contain', marginBottom: 8 }} />
          )}
          <div style={{ fontSize: 11, letterSpacing: 6, color: '#92400e', textTransform: 'uppercase', marginBottom: 4 }}>
            {data.organizer}
          </div>
          {/* Ornate divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #d97706)' }} />
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 L18.5 10 L27 10 L20.5 15 L23 23 L16 18 L9 23 L11.5 15 L5 10 L13.5 10 Z" fill="#d97706"/>
              <circle cx="16" cy="16" r="4" fill="#b45309"/>
            </svg>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #d97706)' }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 'bold', color: '#78350f', letterSpacing: 8, textTransform: 'uppercase' }}>
            SERTIFIKAT
          </div>
          <div style={{ fontSize: 13, color: '#b45309', letterSpacing: 4, marginTop: 4, textTransform: 'uppercase' }}>
            {data.eventType}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, rgba(217,119,6,0.5))' }} />
            <div style={{ fontSize: 14, color: '#d97706' }}>✦ ✦ ✦</div>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, rgba(217,119,6,0.5))' }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#92400e', fontStyle: 'italic' }}>Dengan bangga diberikan kepada</div>
          <div style={{ fontSize: 46, fontWeight: 'bold', color: '#1c1917', borderBottom: '2px solid #d97706', paddingBottom: 8, minWidth: 360 }}>
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
