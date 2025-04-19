// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  image: {
    dir: "public/images",
  },
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'collusion'
      }
    }
  },
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/image"],
  googleFonts: {
    families: {
      Montserrat: [600], // Peso 600
      Poppins: [400, 500, 600], // Pesos 400, 500, 600
    },
    display: "swap",
    preconnect: true,
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css"],
});
