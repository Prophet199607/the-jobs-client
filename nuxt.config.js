export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 7000, // default: 3000
  },
  head: {
    title: "The Jobs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "The Jobs",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "The Jobs",
      },
      {
        property: "og:title",
        content: "The Jobs - Job Consultation Company",
      },
      {
        property: "og:description",
        content: "The Jobs is a job consultation company",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://cdnjs.cloudflare.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Poppins:wght@100;200;300;400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
      },
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/typed.js@2.0.12",
        async: true,
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/css/main.css", "~assets/scss/_variables.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/sweet-alert.js",
    { src: "~/plugins/owl-carousel.js", ssr: false },
    "~/plugins/vue-numeric.js",
    "~/plugins/vee-validate.js",
    "~/plugins/filters.js",
    "~/plugins/laravel-vue-pagination.js",
    "~/plugins/vue-pagination-2.js",
    "~/plugins/vue-search-select.js",
    "~/plugins/vue-loading-skeleton.js",
    "~/plugins/jsPdf.js",
    "~/plugins/vue-toast.js",
    { src: "~/plugins/flowbite.js", ssr: false },
    { src: "~/plugins/vue-datetime.js", mode: "client" },
    { src: "~/plugins/v-rating.js", ssr: false },
    { src: "~/plugins/vue2-editor.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/dotenv", "@nuxtjs/moment"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxt/image",
    "@nuxtjs/toast",
    "cookie-universal-nuxt",
    "vue-social-sharing/nuxt",
    "vue2-editor/nuxt",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL + "/api/v1",
  },

  loading: {
    color: "blue",
    height: "5px",
  },

  loadingIndicator: {
    name: "circle",
    color: "#3B8070",
    background: "white",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate", "vue-pagination-2"],
  },
};
