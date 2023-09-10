<template>
  <div>
    <Spinner v-if="isLoading"></Spinner>
    <div v-else>
      <Navbar />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.getters["settings/getLoadingState"];
    },
  },
};
</script>
