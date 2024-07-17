/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        'dark-light': '#F9F9F9',
        'dark-1': '#F8F8F8',
        'dark-2': '#F5F6F8',
        'dark-3': '#E6E6E6',
        'dark-4': '#D2D5DB',
        'dark-5': '#BFC3CA',
        'dark-6': '#A8A8A8',
        'dark-7': '#666666',
        'dark-8': '#444444',
        'dark-9': '#3E3F3C',
        'dark-10': '#B2BDC6',
        primary: '#3B82F6',
        'primary-light': '#F8FAFB',
        danger: '#F84C6C',
        success: '#439775',
        'success-dark': '#1C9561',
        warning: '#D09A2E',
        'warning-dark': '#C98B11',
      },
    },
  },
  plugins: [],
};
