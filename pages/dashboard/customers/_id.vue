<template>
  <div class="col-span-12 md:col-span-9 shadow rounded w-full p-5">
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>

      <p class="text-gray-500 font-medium">Customers</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-lg font-medium capitalize mb-4">Customer List</h4>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul
        class="flex flex-wrap -mb-px text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="true"
            @click="tabChange(1)"
          >
            Profile
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="address-tab"
            data-tabs-target="#address"
            type="button"
            role="tab"
            aria-controls="address"
            aria-selected="false"
            @click="tabChange(2)"
          >
            Order History
          </button>
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 1 ? 'hidden' : 'block']"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <customer-profile></customer-profile>
        </div>
      </div>
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 2 ? 'hidden' : 'block']"
        id="address"
        role="tabpanel"
        aria-labelledby="address-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <location-addresses></location-addresses>
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
