<template>
  <div>
    <section
      class="bg-cover bg-top relative py-52 text-white"
      style="
        background-image: url(https://img.freepik.com/free-photo/business-meeting-office_23-2147626525.jpg);
      "
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <!-- Overlay -->
      <div class="container mx-auto text-center relative z-10">
        <h1 class="text-4xl font-bold mb-4">Your Path to a Better Career</h1>
        <p class="text-lg mb-8">We help you find the perfect job.</p>
        <a
          href="#"
          class="bg-white text-blue-500 hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out"
          >Get Started</a
        >
      </div>
    </section>

    <!-- Features Section -->
    <!-- Features Section -->
    <section class="py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-semibold mb-20">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white shadow-lg rounded-lg p-6 relative">
            <div
              class="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <i class="fas fa-search text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mt-8">Job Search</h3>
            <p class="text-gray-600">
              We provide you with access to a wide range of job opportunities.
            </p>
          </div>
          <!-- Feature 2 -->
          <div class="bg-white shadow-lg rounded-lg p-6 relative">
            <div
              class="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <i class="fas fa-file-alt text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mt-8">Resume Building</h3>
            <p class="text-gray-600">
              Craft an impressive resume to stand out to potential employers.
            </p>
          </div>
          <!-- Feature 3 -->
          <div class="bg-white shadow-lg rounded-lg p-6 relative">
            <div
              class="rounded-full bg-blue-500 text-white w-16 h-16 flex items-center justify-center absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <i class="fas fa-users text-2xl"></i>
            </div>
            <h3 class="text-xl font-semibold mt-8">Interview Preparation</h3>
            <p class="text-gray-600">
              Ace your interviews with our expert guidance and practice.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- SVG and Customer Review Section -->
    <section class="bg-gray-100 py-16">
      <div class="container mx-auto flex flex-col items-center md:flex-row">
        <!-- SVG Image (Left Side) -->
        <div class="md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/man-having-online-job-interview_52683-43379.jpg"
            alt="SVG Image"
            class="w-full md:max-w-md mx-auto"
          />
        </div>
        <!-- Customer Review (Right Side) -->
        <div class="md:w-1/2 px-4">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="flex items-center gap-x-3">
              <img
                src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg"
                alt="Customer 2"
                class="w-12 h-12 rounded-full"
              />
              <h2 class="text-2xl font-semibold">Good Service</h2>
            </div>
            <p class="text-gray-600 mb-4">
              "Insert customer review here. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Integer eget urna sed neque efficitur finibus. Nam in justo
              a urna varius tristique. Sed efficitur justo sit amet eros viverra, at
              sollicitudin nisi tincidunt."
            </p>

            <p class="text-gray-800 font-semibold">- John Doe, Satisfied Customer</p>
          </div>
        </div>
      </div>
    </section>
    <section class="container mx-auto p-8">
      <h1 class="text-3xl font-semibold text-center mb-8">Image Gallery</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Gallery Item 1 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1653669486779-671f54d26c13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Image 1"
            class="w-full h-48 object-cover"
          />
        </div>
        <!-- Gallery Item 2 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1653669485641-8582ad808121?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
            alt="Image 2"
            class="w-full h-48 object-cover"
          />
        </div>
        <!-- Gallery Item 3 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1653669487066-550c97ebea48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Image 3"
            class="w-full h-48 object-cover"
          />
        </div>
        <!-- Gallery Item 4 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1653669486775-75ddc200933c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Image 4"
            class="w-full h-48 object-cover"
          />
        </div>
        <!-- Gallery Item 5 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://img.freepik.com/free-photo/legal-expert-explaining-document-specifics-customer_74855-2034.jpg"
            alt="Image 5"
            class="w-full h-48 object-cover"
          />
        </div>
        <!-- Gallery Item 6 -->
        <div class="bg-white rounded-lg overflow-hidden shadow-md">
          <img
            src="https://img.freepik.com/free-photo/two-sitting-business-people-looking-documents_23-2147626354.jpg"
            alt="Image 6"
            class="w-full h-48 object-cover"
          />
        </div>
      </div>
    </section>

    <section class="bg-gray-200 py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-semibold mb-8">Contact Us</h2>
        <p class="text-gray-600 mb-8">
          Have questions or need assistance? Feel free to contact us.
        </p>
        <a
          href="#"
          class="bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out"
          >Contact Us</a
        >
      </div>
    </section>
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto text-center">
        <p>&copy; 2023 Job Consultation Company. All rights reserved.</p>
      </div>
    </footer>
    <!-- banner start -->
    <!-- <no-ssr>
      <div
        class="hidden md:block -z-10"
        style="z-index: -500"
        v-if="sliderImages.length > 0"
      >
        <carousel
          :autoplay="true"
          :items="4"
          :nav="false"
          :dots="false"
          :responsive="{
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
          }"
        >
          <div v-for="(image, index) in sliderImages" :key="index">
            <div>
              <nuxt-img
                quality="100"
                :src="image.image_path"
                class="w-100 h-100 transition"
                alt="carousel image"
                for="product_image"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </carousel>
      </div>
      <div class="block md:hidden" v-if="mobileSliderImages.length > 0">
        <carousel
          :autoplay="true"
          :items="4"
          :nav="false"
          :dots="false"
          :responsive="{
            0: { items: 1, nav: false },
            600: { items: 1, nav: false },
          }"
        >
          <div v-for="(image, index) in mobileSliderImages" :key="index">
            <div>
              <nuxt-img
                quality="100"
                :src="getImageUrl(image.image_path)"
                class="w-100 h-100 transition"
                width="100%"
                height="100%"
                alt="carousel image"
                for="product_image"
              />
            </div>
          </div>
        </carousel>
      </div>
    </no-ssr> -->
    <!-- banner end -->

    <!-- featured products start -->
    <div
      class="relative flex items-top justify-center sm:items-center sm:pt-0"
      v-if="featuredProducts.length > 0"
    >
      <div class="container">
        <div
          class="text-xl z-10 section-title font-medium text-gray-800 text-center my-10 px-5"
        >
          <span class="z-50 px-5">Featured Products</span>
        </div>
        <div class="container mb-10">
          <no-ssr>
            <div class="mx-2 md:mx-8 text-center mt-2" v-if="featuredProducts.length > 0">
              <carousel
                :autoplay="true"
                :items="4"
                :nav="false"
                :dots="false"
                :responsive="{
                  0: { items: 1, nav: false },
                  600: { items: 3, nav: false },
                  1000: { items: 4, nav: false },
                }"
              >
                <div v-for="product in featuredProducts" :key="product.id" class="px-5">
                  <div class="cursor-pointer" @click="showSingleProduct(product)">
                    <div
                      v-if="product.is_best_selling"
                      class="bg-green-500 rounded-sm absolute top-0 left-0 px-3 py-1 w-24 z-100 text-white text-xs"
                    >
                      <span class="">Best Selling</span>
                    </div>
                    <nuxt-img
                      class="px-7 md:px-5"
                      alt=""
                      :src="generateImagePath(product.thumbnail_path)"
                      style=""
                    />
                    <div class="">
                      <div class="text-sm md:text-base font-medium py-2">
                        {{ product.product_name }}
                      </div>
                      <div>
                        <span class="text-sm md:text-base font-medium text-gray-800 mr-2">
                          {{ product.price | currency }}
                        </span>
                        <span
                          class="text-sm md:text-base font-medium text-red-500 line-through"
                          v-if="product.marked_price != 0"
                        >
                          {{ product.marked_price | currency }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </carousel>
            </div>
          </no-ssr>
        </div>
      </div>
    </div>
    <!-- featured products end -->

    <!-- banner 1 start -->
    <!-- desktop banner start -->
    <div class="hidden md:flex justify-center mt-5" v-if="banners.banner_image_1">
      <nuxt-img
        loading="lazy"
        quality="100"
        class="text-center"
        :src="getImageUrl(banners.banner_image_1)"
        alt=""
      />
    </div>
    <!-- desktop banner end -->
    <!-- mobile banner start -->
    <div class="flex md:hidden justify-center mt-5" v-if="mobile_banners.banner_image_1">
      <nuxt-img
        loading="lazy"
        quality="100"
        class="text-center"
        :src="getImageUrl(mobile_banners.banner_image_1)"
        alt=""
      />
    </div>
    <!-- mobile banner end -->
    <!-- banner 1 start -->
  </div>
</template>

<script src="https://kit.fontawesome.com/e310e5e03d.js" crossorigin="anonymous"></script>
<script>
export default {
  name: "HomePage",
  auth: false,
  data() {
    return {
      featuredProducts: [],
      newArrivals: [],
      sliderImages: [
        {
          image_path:
            "https://img.freepik.com/free-photo/business-meeting-office_23-2147626525.jpg",
        },
      ],
      mobileSliderImages: [],
      banners: {},
      mobile_banners: {},
      departments: [],
    };
  },

  head() {
    return {
      title: "Home",
      meta: [
        {
          hid: "home",
          name: "home",
          content: process.env.META_HOME,
        },
      ],
    };
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartData"];
    },
  },

  mounted() {
    // this.loadHomeData();
  },

  methods: {
    async loadHomeData() {
      const data = await this.$store.dispatch("home/getHomeData");
      this.featuredProducts = data.featured_products;
      this.newArrivals = data.new_arrivals;
      this.sliderImages = data.slides;
      this.mobileSliderImages = data.mobile_slides;
      this.banners = data.banners;
      this.mobile_banners = data.mobile_banners;
      this.departments = data.departments;
    },

    async addToCart(product) {
      // only users can add products to the cart
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) return;

      // if the product is out of stock user can't add the product to the cart
      if (product.out_of_stock == 1) return;

      let products = this.cart ? [...this.cart.products] : [];

      let cart_item = {
        product_id: product.id,
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        qty: 1,
        image: product.thumbnail_path,
        filter: null,
      };

      if (products.length > 0) {
        const index = products.findIndex((el) => el.product_id == cart_item.product_id);
        console.log(index);
        if (index != -1) {
          let $p_ = { ...products[index] };
          $p_.qty = $p_.qty + 1;
          products.splice(index, 1, $p_);
        } else {
          products.push(cart_item);
        }
      } else {
        products.push(cart_item);
      }

      await this.$store.dispatch("cart/saveCart", products).then((res) => {
        this.$toast.show("Cart updated", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 5000,
        });
      });
    },

    showSingleProduct(product) {
      this.$router.push({ path: `/shop/product/${product.product_code}` });
    },

    getImage(url) {
      return `url(${url})`;
    },

    navigateToShopPage(department_id) {
      this.$store.dispatch("departments/setSelectedDepartment", department_id);
      this.$router.push({ path: "/shop", query: { d_: department_id, c_: "" } });
    },

    generateImagePath(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    getImageUrl(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    getAvailablity() {
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) {
        return false;
      }
      return true;
    },

    resizeProductTitleMobile(title) {
      if (title.length > 25) {
        return "text-xs";
      } else if (title.length > 15) {
        return "text-sm";
      }
      return "text-sm";
    },

    resizeProductTitle(title) {
      if (title.length > 15) {
        return "text-xs md:text-sm";
      }
      return "text-sm md:text-base";
    },
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif !important;
  background-color: #fff !important;
}
.section-title {
  position: relative;
  z-index: 1;
}
.section-title::before {
  content: "";
  border-top: 2px solid #a1a0a09a;
  margin: 0 auto; /* this centers the line to the full width specified */
  position: absolute; /* positioning must be absolute here, and relative positioning must be applied to the parent */
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 95%;
  z-index: -1;
}
.section-title > span {
  background: #ffffff;
  padding: 0 15px;
  z-index: 999 !important;
}
</style>
