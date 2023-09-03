<template>
  <div class="w-full px-2 md:px-24">
    <div class="grid grid-cols-12 gap-5 my-8">
      <div class="col-span-12 md:col-span-12 p-6 md:p-8">
        <div class="text-xl uppercase font-semibold relative">
          <span>{{ about_us.title == "" ? "About Us" : about_us.title }}</span>
          <span class="about-us-title border-primary"></span>
        </div>
        <div class="my-8 text-gray-700 text-sm md:text-base">
          <div>
            <img
              :src="getImageUrl(about_us.about_us_image)"
              class="hidden md:block transition relative float-right ml-5 mb-5"
              style="max-width: 550px"
              alt=""
              for="product_image"
            />
            <p class="my-2 indent-16">{{ about_us.paragraph_1 }}</p>
            <img
              :src="getImageUrl(about_us.about_us_image)"
              class="block md:hidden transition relative p-5"
              alt=""
              for="product_image"
            />
            <p class="my-2 indent-10">{{ about_us.paragraph_2 }}</p>
            <p class="my-2 indent-10">{{ about_us.paragraph_3 }}</p>
          </div>
          <div class="col-span-12 md:col-span-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "About Us",
      meta: [
        {
          hid: "about-us",
          name: "about-us",
          content: process.env.META_ABOUT_US,
        },
      ],
    };
  },

  computed: {
    about_us() {
      return this.$store.getters["company/getAboutUsData"];
    },
  },

  created() {},

  mounted() {
    this.loadCompanyAboutUs();
  },

  methods: {
    loadCompanyAboutUs() {
      this.$store.dispatch("company/loadCompanyAboutUs");
    },

    getImageUrl(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>

<style scoped>
.about-us-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100px;
  height: 2px;
  background-color: darkorange;
}
</style>
