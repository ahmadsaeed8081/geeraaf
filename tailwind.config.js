/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'zen-dots': ['"Zen Dots"', 'cursive'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'syne': ['"Syne"', 'sans-serif'],
      },
      colors:{
        primary:'#FFE247',
        green:'#489f68',
        textColor:'#101010',
      },
      backgroundImage:{
        'button-gradient': 'linear-gradient(180deg,#FFE247 0%, #FFE247 100%)',
        'gradient': 'linear-gradient(90.37deg, rgba(255, 255, 255, 0.52) 10.97%, rgba(243, 243, 243, 0.29) 100%)'
        
      
      },
      borderImageSource: {
        'gradient': 'linear-gradient(86.91deg, #77D9FF 8.72%, #3091EE 94.71%)',
      },
      borderWidth: {
        'custom': '2.14px',
      },
    },
  },
  plugins: [],
}

