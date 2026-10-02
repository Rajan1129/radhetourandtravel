// Resolves photos dropped into src/assets/images/<group>/<name>.(webp|avif|jpg|png). Returns null if absent.
const files = import.meta.glob('/src/assets/images/**/*.{webp,avif,jpg,jpeg,png}', { eager: true, query: '?url', import: 'default' });
export const getImage = (key) => {
  const hit = Object.keys(files).find((p) => p.replace(/\.[^.]+$/, '').endsWith('/' + key));
  return hit ? files[hit] : null;
};
