<template>
  <div class="w-full px-2 md:px-24">
    <div class="grid grid-cols-12 gap-5 my-8">
      <div class="col-span-12 md:col-span-12 shadow-xl p-6 md:p-8">
        <h4 class="text-xl md:text-2xl font-medium uppercase">Leave us a message</h4>
        <p class="mb-8 mt-2 text-sm md:text-base text-gray-500">
          Use the form below to get in touch with the sales team
        </p>
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between">
              <label for="first_name"
                >First Name <span class="text-primary">*</span></label
              >
              <input
                type="text"
                id="first_name"
                class="border-gray-300 focus:border-primary focus:border-2 focus:ring-0"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between">
              <label for="last_name">Last Name <span class="text-primary">*</span></label>
              <input
                type="text"
                id="last_name"
                class="border-gray-300 focus:border-primary focus:border-2 focus:ring-0"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between">
              <label for="email_addr"
                >Email Address <span class="text-primary">*</span></label
              >
              <input
                type="text"
                id="email_addr"
                class="border-gray-300 focus:border-primary focus:border-2 focus:ring-0"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between">
              <label for="company_name">Subject</label>
              <input
                type="text"
                id="company_name"
                class="border-gray-300 focus:border-primary focus:border-2 focus:ring-0"
              />
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <div class="flex flex-col justify-between">
              <label for="county_region"
                >Your message <span class="text-primary">*</span></label
              >
              <textarea
                type="text"
                id="county_region"
                class="border-gray-300 focus:border-primary focus:border-2 focus:ring-0"
              ></textarea>
            </div>
          </div>
          <br />
          <div class="col-span-12 md:col-span-6 mt-4">
            <button
              type="submit"
              class="bg-primary border uppercase py-2 px-6 rounded text-base font-medium text-white hover:bg-white hover:text-primary hover:border-primary transition duration-700"
            >
              <i class="fa fa-paper-plane mr-1" aria-hidden="true"></i> send message
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Contact Us",
      meta: [
        {
          hid: "contact-us",
          name: "contact-us",
          content: process.env.META_CONTACT_US,
        },
      ],
    };
  },

  computed: {
    locations() {
      return this.$store.getters["company/getActiveLocations"];
    },
  },

  created() {},

  mounted() {
    this.loadActiveLocationData();
  },

  methods: {
    loadActiveLocationData() {
      this.$store.dispatch("company/loadActiveLocationData");
    },
  },
};
</script>

<style></style>
