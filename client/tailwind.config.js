export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { sky: { DEFAULT: '#159FE3', dark: '#0F7FB8' }, deep: '#082B49', navy: '#071B2D', mist: '#EAF7FF', slate: { DEFAULT: '#64748B', dark: '#475569' }, sun: '#F7B928' },
      fontFamily: { sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'] },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
