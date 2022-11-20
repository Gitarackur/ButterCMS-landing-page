import Butter from "buttercms";
export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  const butter = Butter(config.API_READ_TOKEN);
  nuxtApp.provide('butter', butter)
})