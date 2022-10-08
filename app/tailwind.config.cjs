const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: {
          100: '#facce4',
          200: '#f499c9',
          300: '#ef66ae',
          400: '#e93393',
          500: '#e40078',
          600: '#b60060',
          700: '#890048',
          800: '#5b0030',
          900: '#2e0018',
        },
        primary: {
          100: '#ddf1fb',
          200: '#bae3f7',
          300: '#98d5f2',
          400: '#75c7ee',
          500: '#53b9ea',
          600: '#4294bb',
          700: '#326f8c',
          800: '#214a5e',
          900: '#11252f',
        },
        yankees: {
          100: '#d1d0d8',
          200: '#a2a1b0',
          300: '#747389',
          400: '#454461',
          500: '#17153a',
          600: '#12112e',
          700: '#0e0d23',
          800: '#090817',
          900: '#05040c',
        },
      },
      fontFamily: {
        sans: ["'InterVariable'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
