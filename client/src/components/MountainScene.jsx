// Drawn fallback used until real photography is added to src/assets/images.
export default function MountainScene({ className = '', tone = 'dark' }) {
  const d = tone === 'dark';
  return (
    <svg className={className} viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`sky-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={d ? '#082B49' : '#CFEBFB'} /><stop offset="1" stopColor={d ? '#159FE3' : '#EAF7FF'} />
        </linearGradient>
      </defs>
      <rect width="1440" height="640" fill={`url(#sky-${tone})`} />
      <circle cx="1120" cy="170" r="54" fill="#F7B928" opacity={d ? 0.95 : 0.85} />
      <path d="M0 470 190 250 300 350 470 150 660 380 780 290 960 430 1130 260 1290 380 1440 300V640H0z" fill={d ? '#0F5F8F' : '#9FD3F0'} />
      <path d="M0 520 150 380 280 470 470 300 640 470 820 360 1010 500 1200 380 1440 500V640H0z" fill={d ? '#0A3E63' : '#6FB6E0'} />
      <path d="M0 600 C300 540 520 610 820 560 S1250 520 1440 570V640H0z" fill="#071B2D" />
      <path d="M0 612 C300 552 520 622 820 572 S1250 532 1440 582" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="22 20" opacity=".6" />
    </svg>
  );
}
