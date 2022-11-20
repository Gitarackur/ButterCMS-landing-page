<template>
  <div>
    <div v-if="loading">
      <div class="h-screen flex items-center justify-center">
        <h1 style="font-size: 8rem"> loading.... </h1>
      </div>
    </div>

    <div v-if="!loading && error">
      <div class="h-screen flex items-center justify-center">
        <h1 style="font-size: 8rem"> There was an error fetching contents from Butter </h1>
      </div>
    </div>

    <div v-if="!loading && !error">
      <div class="bg-white">
        <Navbar :content="menu" />
        <Hero :content="hero" />
        <Features :content="features" />
        <Testimonials :content="testimonials" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
  const { $butter } = useNuxtApp();

  const contents = ref<any>();
  const hero = ref<any>();
  const features = ref<any>();
  const testimonials = ref<any>();
  const menu = ref<any>();
  const loading = ref<boolean>(false);
  const error = ref<boolean>(false);
  


  onMounted(async () => {
    console.log('------request starts-------');

    try {
      loading.value = true;
      const params = {
        "page": "1",
        "page_size": "10"
      };

      const contents = await $butter.page.retrieve("*", "landing-page-test");
      const navItems = await $butter.content.retrieve(['landing-page-menu'], params);

      // get the hero, features, testimonial values
      hero.value = contents.data.data.fields['body-component'][0];
      features.value = contents.data.data.fields['body-component'][1];
      testimonials.value = contents.data.data.fields['body-component'][2];
      console.log('response page', contents.data.data, hero.value, features.value, testimonials.value);
      
      // get the landing-page-menu
      menu.value = navItems.data.data["landing-page-menu"][0]["landing-page-menu-items"];
      console.log('resp menu', navItems.data.data["landing-page-menu"][0]["landing-page-menu-items"])

    } catch(err: any) {
      error.value = true;
      throw new Error(`caught api error menu--- ${err?.response?.data}`);
    } finally {
      loading.value = false;
    }
  });
</script>

<style>

</style>