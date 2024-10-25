// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }
      ],
      title: "Simple Weather App",
    },
  },
  compatibilityDate: "2024-04-03",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  googleFonts: {
    download: true,
    families: {
      Nunito: "400..700",
    },
    fontsDir: "",
    outputDir: "assets/fonts",
    overwriting: true,
    stylePath: "nunito.css",
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
})