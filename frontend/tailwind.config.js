import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        layout: "520px",
      },
      maxHeight: {
        layout: "780px",
      },
      fontFamily: {
        sans: ["NanumSquare", "sans-serif"],
      },
      fontSize: {
        "2xl": "32px",
        xl: "24px",
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontWeight: {
        regular: 400,
        bold: 700,
        extrabold: 800,
      },
      boxShadow: {
        far: "0 16px 32px -8px rgba(12, 12, 13, 0.4)",
        middle:
          "0 4px 4px -4px rgba(12, 12, 13, 0.05), 0 16px 16px -8px rgba(12, 12, 13, 0.1)",
        close:
          "0 4px 4px -4px rgba(12, 12, 13, 0.05), 0 16px 32px -4px rgba(12, 12, 13, 0.1)",
        inner: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
      },
      colors: {
        layout: {
          sidebar: "#E6EDF8",
          main: "#F0F4FA",
          background: "#D9E3F3",
        },
        primary: {
          DEFAULT: "#6E29DA",
          hover: "#4B0AAF",
          disabled: "#D3B7FF",
        },
        secondary: {
          DEFAULT: "#E4E9F5",
          hover: "#4A5D78",
          disabled: "#939BA5",
        },
        default: {
          DEFAULT: "#354357",
          hover: "#4A5D78",
          disabled: "#939BA5",
        },
        bettingBlue: {
          DEFAULT: "#4C79F8",
          disabled: "#C7D5F9",
        },
        bettingPink: {
          DEFAULT: "#DF3491",
          disabled: "#EAB2D6",
        },
        border: {
          DEFAULT: "#34425633",
        },
      },
      colors: {
        primary: {
          default: "#6E29DA",
          hover: "#4B0AAF",
          disabled: "#D3B7FF",
          container: "#E3E8F4",
        },
        secondary: {
          default: "#E4E9F5",
          hover: "#4A5D78",
          disabled: "#939BA5",
          container: "#e6edf8",
        },
        default: {
          default: "#354357",
          hover: "#4A5D78",
          disabled: "#939BA5",
        },
      },
      boxShadow: {
        short: `0px 0.5px 0.5px hsl(217deg 20% 62% / 0.42),
          0px 0.7px 0.7px -1.9px hsl(217deg 20% 62% / 0.33),
          0px 1.8px 1.7px -3.7px hsl(217deg 20% 62% / 0.23);`,
        medium: `0px 0.5px 0.5px hsl(217deg 20% 62% / 0.35),
          0px 0.9px 0.8px -0.9px hsl(217deg 20% 62% / 0.31),
          0px 2px 1.9px -1.9px hsl(217deg 20% 62% / 0.26),
          -0.1px 4.4px 4.1px -2.8px hsl(217deg 20% 62% / 0.21),
          -0.1px 9.1px 8.5px -3.7px hsl(217deg 20% 62% / 0.16);`,
        long: `0px 0.5px 0.5px hsl(217deg 20% 62% / 0.33),
          0px 1.3px 1.2px -0.4px hsl(217deg 20% 62% / 0.31),
          0px 2.3px 2.2px -0.8px hsl(217deg 20% 62% / 0.28),
          -0.1px 3.7px 3.5px -1.2px hsl(217deg 20% 62% / 0.26),
          -0.1px 5.9px 5.5px -1.7px hsl(217deg 20% 62% / 0.24),
          -0.1px 9.3px 8.7px -2.1px hsl(217deg 20% 62% / 0.22),
          -0.2px 14.2px 13.3px -2.5px hsl(217deg 20% 62% / 0.2),
          -0.3px 20.9px 19.6px -2.9px hsl(217deg 20% 62% / 0.17),
          -0.4px 29.7px 27.8px -3.3px hsl(217deg 20% 62% / 0.15),
          -0.6px 41px 38.4px -3.7px hsl(217deg 20% 62% / 0.13);`,
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
