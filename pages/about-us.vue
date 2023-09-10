<template>
  <div class="w-full px-2 md:px-24">
    <section class="bg-white py-16">
      <div class="container mx-auto flex flex-col items-center justify-center">
        <h1 class="text-4xl font-semibold mb-6">About Us</h1>
        <div class="md:flex md:space-x-6">
          <div class="md:w-1/2">
            <img
              src="https://img.freepik.com/free-photo/legal-expert-explaining-document-specifics-customer_74855-2034.jpg"
              alt="Company Office"
              class="rounded-lg shadow-lg"
            />
          </div>
          <div class="md:w-1/2 mt-6 md:mt-0">
            <p class="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum,
              urna vel tempor interdum, nisl erat sollicitudin ligula, nec facilisis odio
              sapien eget nunc. Integer euismod viverra commodo. Fusce hendrerit tincidunt
              metus, nec volutpat justo venenatis eu. Suspendisse potenti. Phasellus
              consectetur luctus tortor in ultricies. Aenean id nunc sit amet libero
              viverra ultrices vel sed purus. Vivamus bibendum enim id dui fermentum, ac
              aliquam tortor varius. Nullam eget mi sit amet lectus dictum lacinia. Proin
              varius lorem eget quam fermentum, non varius dolor dictum. Sed rhoncus
              sapien non libero placerat tincidunt.
            </p>
            <p class="text-gray-700 leading-relaxed mt-4">
              Aliquam erat volutpat. Vivamus in venenatis sapien, non laoreet nisl. Nullam
              feugiat bibendum purus ac fringilla. Vivamus tincidunt nunc ut urna
              vehicula, eu condimentum justo laoreet. Integer auctor justo sit amet dolor
              ultrices, eget laoreet felis eleifend. Donec efficitur ullamcorper metus,
              non lacinia ex tempus et. Etiam in turpis euismod, ullamcorper lectus eu,
              bibendum turpis. Quisque a ipsum in ex commodo interdum.
            </p>
          </div>
        </div>
      </div>
    </section>
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
