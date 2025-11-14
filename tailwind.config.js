/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          dark: "#2b2d31",
          darker: "#1e1f22",
          secondary: "#313338",
          accent: "#5865f2",
          text: "#ffffff",
          "text-secondary": "#b5bac1",
          success: "#23a559",
          error: "#f23f42",
        },
      },
      borderRadius: {
        'discord': '8px',
        'discord-lg': '16px',
      },
      transitionDuration: {
        'discord': '200ms',
        'discord-slow': '300ms',
      },
    },
  },
  plugins: [],
}

