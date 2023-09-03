<template>
  <div class="col-span-12 md:col-span-12 shadow rounded px-6 pt-5 pb-7 w-full">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Banner Settings</p>
    </div>
    <!-- breadcrumbs end -->
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="banners"
        data-tabs-toggle="#bannerTabContent"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
            id="desktop-tab"
            data-tabs-target="#desktop"
            type="button"
            role="tab"
            aria-controls="desktop"
            aria-selected="true"
            @click="tabChange(1)"
          >
            Desktop
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="mobile-tab"
            data-tabs-target="#mobile"
            type="button"
            role="tab"
            aria-controls="mobile"
            aria-selected="false"
            @click="tabChange(2)"
          >
            Mobile
          </button>
        </li>
      </ul>
    </div>
    <div id="bannerTabContent">
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 1 ? 'hidden' : 'block']"
        id="desktop"
        role="tabpanel"
        aria-labelledby="desktop-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <desktop-banners></desktop-banners>
        </div>
      </div>
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 2 ? 'hidden' : 'block']"
        id="mobile"
        role="tabpanel"
        aria-labelledby="mobile-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <mobile-banners></mobile-banners>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected_tab: 1,
    };
  },

  mounted() {
    const evt = new Event("DOMContentLoaded", { bubbles: true, cancelable: false });
    document.dispatchEvent(evt);
  },

  methods: {
    tabChange(tab) {
      this.selected_tab = tab;
    },
  },
};
</script>

<style></style>
