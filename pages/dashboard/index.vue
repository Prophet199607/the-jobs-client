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

      <p class="text-gray-500 font-medium">Profile</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-base font-medium capitalize mb-4">Company Profile</h4>

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
            id="about-us-tab"
            data-tabs-target="#about-us"
            type="button"
            role="tab"
            aria-controls="about-us"
            aria-selected="false"
            @click="tabChange(3)"
          >
            About us
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="privacy-policy-tab"
            data-tabs-target="#privacy-policy"
            type="button"
            role="tab"
            aria-controls="privacy-policy"
            aria-selected="false"
            @click="tabChange(4)"
          >
            Privacy Policy
          </button>
        </li>
        <li class="mr-2" role="presentation">
          <button
            class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
            id="terms-and-conditions-tab"
            data-tabs-target="#terms-and-conditions"
            type="button"
            role="tab"
            aria-controls="terms-and-conditions"
            aria-selected="false"
            @click="tabChange(5)"
          >
            Terms & Conditions
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
          <merchant-profile></merchant-profile>
        </div>
      </div>
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 3 ? 'hidden' : 'block']"
        id="about-us"
        role="tabpanel"
        aria-labelledby="about-us-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <about-us></about-us>
        </div>
      </div>
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 4 ? 'hidden' : 'block']"
        id="privacy-policy"
        role="tabpanel"
        aria-labelledby="privacy-policy-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <privacy-policy></privacy-policy>
        </div>
      </div>
      <div
        class="p-4 rounded-lg"
        :class="[selected_tab != 5 ? 'hidden' : 'block']"
        id="terms-and-conditions"
        role="tabpanel"
        aria-labelledby="terms-and-conditions-tab"
      >
        <div class="space-y-4 text-sm md:text-sm">
          <terms-and-conditions></terms-and-conditions>
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
