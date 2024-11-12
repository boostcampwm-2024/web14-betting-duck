import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "auto 1fr",
      },
      fontFamily: {
        "nanum-eb": ["ExtraBold", "sans-serif"],
        "nanum-b": ["Bold", "sans-serif"],
        "nanum-r": ["Regular", "sans-serif"],
      },
      backgroundColor: {
        blur: "color-mix(in oklch, oklch(37.92% 0.039 257.29) 30%,transparent)",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".fixed-center": {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "fit-content",
          zIndex: "1000",
        },
      });
    }),
  ],
};
