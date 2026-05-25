module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        f1: {
          dark: "#0b0b0b",
          red: "#e10600",
          green: "#22c55e",
          yellow: "#ffcc00",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(225, 6, 0, 0.8)",
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.8)",
      },
    },
  },
  plugins: [],
};
