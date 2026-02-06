/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js",
  ],
  theme: {
    extend: {
      colors: {
        'nova': {
          'dark': '#0a0a0a',
          'charcoal': '#1a1a1a',
          'blood': '#8b0000',
          'blood-dark': '#5c0000',
          'gold': '#ffcc00',
          'gold-light': '#ffd700',
          'cyan': '#1ec8ff',
          'purple': '#7a5bff',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      },
      height: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-bottom, 0px))',
      }
    },
  },
  plugins: [],
}
