import { Helmet } from 'react-helmet-async';
import { CONFIG } from '../config.js';
export default function SEOHead({ title, description, keywords, path = '/', schemas = [] }) {
  const url = `${CONFIG.siteUrl}${path === '/' ? '/' : path}`;
  const img = `${CONFIG.siteUrl}/og-image.jpg`;
  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Radhe Una Taxi Service" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Radhe Una Taxi Service - Una, Himachal Pradesh" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {schemas.map((s, i) => <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>)}
    </Helmet>
  );
}
