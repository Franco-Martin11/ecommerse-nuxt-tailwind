/** @type {import('tailwindcss').Config} */
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
      colors: {
        base: {
          100: 'oklch(98% 0 0)',
          200: 'oklch(95% 0 0)',
          300: 'oklch(91% 0 0)',
          content: 'oklch(0% 0 0)',
        },
        primary: {
          DEFAULT: 'oklch(71.9% 0.357 330.759)',
          content: 'oklch(14.38% 0.071 330.759)',
        },
        secondary: {
          DEFAULT: 'oklch(73.37% 0.224 48.25)',
          content: 'oklch(14.674% 0.044 48.25)',
        },
        accent: {
          DEFAULT: 'oklch(92.78% 0.264 122.962)',
          content: 'oklch(18.556% 0.052 122.962)',
        },
        neutral: {
          DEFAULT: 'oklch(21.31% 0.128 278.68)',
          content: 'oklch(84.262% 0.025 278.68)',
        },
        info: {
          DEFAULT: 'oklch(60.72% 0.227 252.05)',
          content: 'oklch(12.144% 0.045 252.05)',
        },
        success: {
          DEFAULT: 'oklch(85.72% 0.266 158.53)',
          content: 'oklch(17.144% 0.053 158.53)',
        },
        warning: {
          DEFAULT: 'oklch(91.01% 0.212 100.5)',
          content: 'oklch(18.202% 0.042 100.5)',
        },
        error: {
          DEFAULT: 'oklch(64.84% 0.293 29.349)',
          content: 'oklch(12.968% 0.058 29.349)',
        },
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
    },
  },
};
