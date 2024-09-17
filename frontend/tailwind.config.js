module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'light-color': '#6ee7b7', // Light violate color for border
        'light-red': '#FA8072', // Red color for cross
        'text-dark-color': '#059669', // Dark violate color for headings
        'medium-dark-color': '#10b981', // Medium dark violate for cross initial color
      },
    },
  },
  plugins: [],
};
