/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "600",
              fontFamily: "var(--font-headings)",
            },
            h2: {
              fontWeight: "600",
              fontFamily: "var(--font-headings)",
            },
            h3: {
              fontWeight: "500",
              fontFamily: "var(--font-base)",
            },
            p: {
              fontSize: "1rem",
              lineHeight: "1.625",
              fontFamily: "var(--font-base)",
            },
            a: {
              color: "var(--color-primary)",
              fontSize: "3rem",
              lineHeight: "1.625",
              fontFamily: "var(--font-base)",
              "&:hover": {
                color: "var(--color-primary-content)",
              },
            },
          },
        },
      },
    },
  },
  daisyui: {
    themes: true,
  },
  plugins: [typography, daisyui],
};
