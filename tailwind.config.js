module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}',
    './utils/**.{js,ts,jsx,tsx}',
    './templates/**.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        display: 'Futura PT',
        body: 'Avenir Next',
      },
      colors: {
        brand: {
          red: '#E21C1F',
          darkgray: '#808080',
          gray: '#F0F0F0',
          teal: '#83C7AC',
          darkblue: '#15354B',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
