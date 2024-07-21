/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/*.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        'primary': '#A4C627',
        'primary-600': '#97ad45'
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
}

