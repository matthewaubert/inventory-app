/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.ejs'],
  theme: {
    extend: {
      fontFamily: {
        serif: '"Lora", Georgia, Cambria, "Times New Roman", Times, serif',
        sans: '"Roboto", Helvetica, sans-serif'
      },
    },
    screens: {
      'sm': '475px', // default: 640px
      'md': '768px', // default: 768px
      'lg': '900px', // default: 1024px
      'xl': '1280px', // default: 1280px
      '2xl': '1536px', // default: 1536px
    }
  },
  plugins: [],
};
