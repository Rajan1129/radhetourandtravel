import { getImage } from '../utils/images.js';
import MountainScene from './MountainScene.jsx';
// Renders a real photo if present in assets/images, with optional fallback photo, otherwise the drawn scene.
export default function Photo({ name, fallback, alt, className = '', eager = false, tone = 'dark', width, height }) {
  const src = getImage(name) || (fallback ? getImage(fallback) : null);
  if (!src) return <div role="img" aria-label={alt} className={className}><MountainScene className="h-full w-full" tone={tone} /></div>;
  return <img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" className={`object-cover ${className}`} />;
}
