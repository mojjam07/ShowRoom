/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 7vw, 4rem)',
        'fluid-5xl': 'clamp(3rem, 8vw, 5rem)',
        'fluid-6xl': 'clamp(3.75rem, 10vw, 6rem)',
      },
      spacing: {
        'fluid-xs': 'clamp(0.5rem, 1.5vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 2vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2.5vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 3rem)',
        'fluid-2xl': 'clamp(2.5rem, 5vw, 4rem)',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
}
