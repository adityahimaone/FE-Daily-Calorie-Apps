module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bluewhite: "#F2F4F8",
        mainpurple: {
          100: "#50429B",
        },
        mainorange: {
          100: "#F96E41",
        },
      },
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      boxShadow: {
        primary: "0px 9.9px 21.6px rgba(136, 202, 41, 0.41)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: "corporate",
  },
};
