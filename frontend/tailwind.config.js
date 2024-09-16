module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'light-color': '#CECFFC', // Light violate color for border
        'light-red': '#FA8072', // Red color for cross
        'text-dark-color': '#6563E4', // Dark violate color for headings
        'medium-dark-color': '#7A7DF3', // Medium dark violate for cross initial color
      },
    },
  },
  plugins: [],
};
