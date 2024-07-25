/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        'landscape':{'raw': '(orientation: landscape)'},
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'], // Används för sans-serif text.
        'lora': ['Lora', 'serif'] // Används för serif text.
      },
      colors: {
        // Primary colors
        'rich-black': '#15120F', // Very dark (mostly black) color.
        'deep-taupe': '#685C4F', // Dark grayish orange.
        'almond': '#D4C5B4', // Pale, light grayish orange.
        'platinum': '#EFEAE5', // Very pale (mostly white) gray.
        'baby-powder': '#FDFAF7', // White color.
        'midnight-blue': '#2C3460', // Dark blue.
        'liberty': '#434D81', // Dark grayish blue.
        'wild-blue-yonder': '#616CAC', // Moderate blue.
        'wilder-blue': '#565D80', //blue for the footer
        'cool-blue': '#8992C3', // Soft blue.
        'periwinkle': '#DDE5F4', // Very pale blue.

        // Natural colors
        'charcoal': '#43413F', // Dark gray.
        'taupe-gray': '#72716F', // Gray.
        'gray-web': '#A1A09F', // Gray.
        'gainsboro': '#D0D0CF', // Light gray.
        'isabelline': '#EBEBEA', // Very pale (mostly white) gray.
      },
    },
  },
  plugins: [],
}

