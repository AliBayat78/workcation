/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      silver: '#718096',
      lightSilver: '#a0aec0',
      lightGray: '#2d3748',
      darkGray: '#1a202c',
      purple: '#667eea',
      cyan: '#b2f5ea',
      darkCyan: '#285e61',
      mainBg: '#edf2f7',
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      graphik: ['Graphik'],
    },
  },
  plugins: [],
}
