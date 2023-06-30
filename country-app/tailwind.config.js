/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'search-icon': "url('../images/search-icon.svg')", //#858585
        'search-icon-dark': "url('../images/search-icon-dark.svg')", //'white'
      }),

      colors: {
        'elementPrimary': 
        {
          DEFAULT: 'white',
          dark: '#2B3945'
        },

        'textPrimary': {
          DEFAULT: '#111517',
          dark: 'white'
        },

        'backgroundPrimary': {
          DEFAULT: '#FAFAFA',
          dark: '#202C37'
        },
        
        'textInput': {
          DEFAULT: '#858585',
          dark: 'white'
        }
      }
    },
  },

  variants: {
    extend: {
      backgroundImage: ['dark']
    }
  },

  plugins: [],
}

