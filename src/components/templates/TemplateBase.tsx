/**
 * Shared helper untuk render logo dan tanda tangan di semua template.
 */
import type { CertificateData } from '@/src/types';

export function LogoImg({ data, height = 44, filter }: { data: CertificateData; height?: number; filter?: string }) {
  if (!data.logoDataURL) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={data.logoDataURL}
      alt="logo"
      style={{ height, maxWidth: height * 3, objectFit: 'contain', marginBottom: 8, filter }}
    />
  );
}

export function SignatureBlock({
  name, title, signatureURL, accentColor, textColor = '#1a202c', subColor = '#718096',
}: {
  name?: string; title?: string; signatureURL?: string;
  accentColor: string; textColor?: string; subColor?: string;
}) {
  if (!name) return null;
  return (
    <div style={{ textAlign: 'center' }}>
      {signatureURL && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={signatureURL} alt="ttd" style={{ height: 36, maxWidth: 110, objectFit: 'contain', marginBottom: 4 }} />
      )}
      <div style={{ width: 120, borderTop: `1px solid ${accentColor}`, paddingTop: 6 }}>
        <div style={{ fontSize: 12, fontWeight: 'bold', color: textColor }}>{name}</div>
        <div style={{ fontSize: 10, color: subColor }}>{title}</div>
      </div>
    </div>
  );
}

export function SignatureRow({
  data, accentColor, textColor, subColor, gap = 56,
}: {
  data: CertificateData; accentColor: string; textColor?: string; subColor?: string; gap?: number;
}) {
  if (!data.signer1Name && !data.signer2Name) return null;
  return (
    <div style={{ display: 'flex', gap }}>
      <SignatureBlock name={data.signer1Name} title={data.signer1Title} signatureURL={data.signer1SignatureURL} accentColor={accentColor} textColor={textColor} subColor={subColor} />
      <SignatureBlock name={data.signer2Name} title={data.signer2Title} signatureURL={data.signer2SignatureURL} accentColor={accentColor} textColor={textColor} subColor={subColor} />
    </div>
  );
}

export function CertNo({ data, color = '#a0aec0' }: { data: CertificateData; color?: string }) {
  if (!data.certificateNumber) return null;
  return <div style={{ fontSize: 10, color }}>No: {data.certificateNumber}</div>;
}
