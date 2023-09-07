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
        content:
          "Chandra Food City is a unique supermarket with a wide array of consumer products at affordable prices along with special discounts catering to the people in Pelmadulla and other areas in the vicinity. We are committed to offering a friendly and faster service always. Chandra Food City is located at Godakawela Main Street and also has a pharmacy. The supermarket is owned by Nalaka Aluthge.",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "online grocery shopping sri lanka, online grocery sri lanka, online supermarket, online supermarket sri lanka, buy groceries online, offers for groceries, grocery delivery, supermarket, fresh vegetables, foods, fresh foods, foods in Pelmadulla, buy groceries online sri lanka",
      },
      {
        property: "og:title",
        content:
          "Chandra Food City - Sri Lanka's Freshest Online Grocery Store",
      },
      {
        property: "og:description",
        content:
          "Chandra Food City is a unique supermarket with a wide array of consumer products at affordable prices along with special discounts catering to the people in Pelmadulla and other areas in the vicinity. We are committed to offering a friendly and faster service always. Chandra Food City is located at Godakawela Main Street and also has a pharmacy. The supermarket is owned by Nalaka Aluthge.",
      },
      // {
      //   property: "og:image",
      //   content:
      //     "https://api.chandrafoodcity.lk/storage/images/company/logo-1661243473.webp",
      // },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      // { rel: "icon", type: "image/x-icon", href: "/chandra-favicon.ico" },
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
    { src: "~/plugins/flowbite.js", ssr: false },
    { src: "~/plugins/vue-datetime.js", mode: "client" },
    { src: "~/plugins/v-rating.js", ssr: false },
    { src: "~/plugins/vue2-editor.js", ssr: false },

    // { src: "~/plugins/axios.js", ssr: true },
    // { src: "~/plugins/vue-loading.client.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxt/image",
    "@nuxtjs/toast",
    "cookie-universal-nuxt",
    "vue-social-sharing/nuxt",
    "vue2-editor/nuxt",
  ],

  // router: {
  //   middleware: ["auth"],
  // },

  // middleware: ["customer", "merchant"],

  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: "token",
  //         required: true,
  //         type: "Bearer",
  //       },
  //       endpoints: {
  //         login: { url: "/api/v1/auth/authenticate", method: "post" },
  //       },
  //     },
  //   },
  //   fullPathRedirect: true,
  //   plugins: ["~/plugins/auth.js"],
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_BASE_URL + "/api/v1",
    // baseURL: `http://139.59.83.223:8000/api`, // server
    // browserBaseURL: process.env.API_BASE_URL + "/api", // client / browser
    // proxy: true,
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.API_BASE_URL + "/api",
  //   },
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: `http://139.59.83.223:8000/api`,
  //   },
  // },

  loading: {
    color: "blue",
    height: "5px",
  },

  loadingIndicator: {
    name: "circle",
    color: "#3B8070",
    background: "white",
  },

  // image: {
  //   domains: ["res.cloudinary.com"],
  //   screens: {
  //     xs: 320,
  //     sm: 640,
  //     md: 768,
  //     lg: 1024,
  //     xl: 1280,
  //     xxl: 1536,
  //     "2xl": 1536,
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate", "vue-pagination-2"],
  },
};
