/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FFFFFF', // Fondo (White)
          secondary: '#000000', // Textos (Black)
          accent: '#E63946', // Red (Detalles/Botones)
          bg: '#FFFFFF',
          text: '#111827', // Gray-900 like
          muted: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'], // Keeping Playfair just in case
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '800': '800ms',
      },
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 15px rgba(230, 57, 70, 0.3)', // Red glow
      },
    },
  },
  plugins: [],
}
