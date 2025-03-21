/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    colors: {
      'white': '#ffffff',
      'primary': '#0c0c0c',
      'black': '#000',
      'whiteAlt': '#eaeaeb',
      "red": "#d91223",
      'secondary': '#121314',
      'secondaryAlt': '#0d1717',
      'secondaryNew': '#21272a',
      'borderNew': '#5c5d5d'
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    }
  },
}