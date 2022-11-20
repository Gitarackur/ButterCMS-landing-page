// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },

  css: ['~/assets/css/tailwind.css', "~/assets/css/style.css"],

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    // transpile: ["uuid", "@vuelidate/core", "@kyvg/vue3-notification"],
  },

  meta: {
    title: "ButterCMS Blog",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },

  buildModules: ["@pinia/nuxt"],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_READ_TOKEN: process.env.API_READ_TOKEN
    }
  },
})
