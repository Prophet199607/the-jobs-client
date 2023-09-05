<template>
  <!-- <div class="col-span-9 hidden md:grid grid-cols-3 gap-4"> -->
    <div class="col-span-12 md:col-span-12 shadow rounded px-2 md:px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Products</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="flex col-span-12 gap-2">
      <div>
        <button
          @click="navigateToPage('/merchant/products', 1)"
          class="border border-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
          :class="loadButtonClasses(1)"
        >
          Product List
        </button>
      </div>
      <div>
        <button
          @click="navigateToPage('/merchant/products/create-product', 2)"
          class="border border-primary hover:bg-primary hover:text-white px-8 py-2 font-medium text-sm md:text-sm rounded uppercase flex items-center gap-2 hover:bg-transparent transition"
          :class="loadButtonClasses(2)"
        >
          Manage Product
        </button>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    navigateToPage(path, menu_no) {
      this.$store.dispatch("settings/changeSelectedMenu", menu_no);
      this.$router.push({ path });
    },

    loadButtonClasses(menu_no) {
      if (menu_no == this.$store.getters["settings/getSelectedProductMenu"]) {
        return "bg-primary text-white";
      } else {
        return "bg-white text-primary";
      }
    },
  },
};
</script>

<style></style>
