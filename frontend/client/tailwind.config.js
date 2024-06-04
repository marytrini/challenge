/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins', 'sans-serif'],
        merienda: ['Merienda', 'cursive']
      },
      backgroundImage : {
        'custom-bg': "url('./assets/images/bgImage.png')",
      },
    },
    screens: {
      '2xl': {'max': '1920px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
      'xs': {'max': '479px'}
    }
  },
  plugins: [],
}

