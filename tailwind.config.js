/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          secondary: '#0B0B0B',
          card: '#0D0E11',
          cardBorder: 'rgba(0, 255, 220, 0.14)',
          cardBorderLight: 'rgba(255, 255, 255, 0.08)',
        },
        cyan: {
          accent: '#00E6D2',
          glow: '#00FFE5',
          dark: '#00BFA6',
          bright: '#00E8D0',
        },
        muted: '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 230, 210, 0.3)',
        'cyan-glow-lg': '0 0 50px -10px rgba(0, 255, 229, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(0, 255, 220, 0.1)',
      },
      backgroundImage: {
        'cyan-gradient': 'linear-gradient(135deg, #00E8D0 0%, #00BFA6 100%)',
        'cyan-gradient-hover': 'linear-gradient(135deg, #00FFE5 0%, #00E6D2 100%)',
      }
    },
  },
  plugins: [],
}
