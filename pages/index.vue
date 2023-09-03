<template>
  <div>
    <!-- banner start -->
    <no-ssr>
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
                :src="getImageUrl(image.image_path)"
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
    </no-ssr>
    <!-- banner end -->

    <!-- departments shortcut card start -->
    <div style="margin: 0 auto">
      <div class="grid grid-cols-3 md:grid-cols-8 gap-2 my-5 mx-5 md:mx-24 mt-10">
        <div
          class="shadow-md relative p-1 flex flex-col gap-y-2 items-center rounded-md cursor-pointer hover:scale-105 transition"
          v-for="(department, index) in departments.slice(0, 8)"
          :key="department.id"
          @click="navigateToShopPage(department.id)"
        >
          <nuxt-img
            :src="generateImagePath(department.department_image)"
            class="w-20 h-20"
            loading="lazy"
            sizes="sm:200px md:200px lg:400px"
            alt=""
          />
          <div class="text-sm text-center">
            {{ department.department_display_name }}
          </div>
          <div
            v-if="index == 7"
            class="absolute text-sm top-0 bottom-0 left-0 right-0 bg-gray-400 opacity-90 text-white flex items-center justify-center rounded-md cursor-pointer hover:scale-105 transition"
          >
            Load more..
          </div>
        </div>
      </div>
    </div>
    <!-- departments shortcut card end -->

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

    <!-- new arrival products start -->
    <div class="relative flex items-top justify-center sm:items-center sm:pt-0">
      <div class="container pb-16 px-5 mx-auto">
        <div
          class="text-xl z-10 section-title font-medium text-gray-800 text-center my-10 px-5"
        >
          <span class="z-50 px-5">New Arrivals</span>
        </div>
        <!-- product grid start -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6">
          <!-- single product start -->
          <div
            v-for="product in newArrivals"
            :key="product.id"
            class="bg-white shadow-xl rounded overflow-hidden relative h-76 md:h-auto"
          >
            <!-- product image start -->
            <div
              class="relative group cursor-pointer"
              @click="showSingleProduct(product)"
            >
              <div
                v-if="product.is_best_selling"
                class="bg-green-500 rounded-sm absolute top-0 left-0 px-3 py-1 w-24 z-100 text-white text-xs"
              >
                <span class="">Best Selling</span>
              </div>
              <div class="flex justify-center">
                <nuxt-img
                  :src="generateImagePath(product.thumbnail_path)"
                  quality="10"
                  sizes="xs:350px sm:100vw md:50vw xl:80vw"
                  class="w-40 md:w-full transition duration-500"
                />
              </div>
            </div>
            <!-- product image end -->

            <!-- product content start -->
            <div class="pt-0 pb-3 px-4 bg-white">
              <h4
                class="block md:hidden uppercase font-medium mb-2 text-gray-800 hover:text-primary transition cursor-pointer"
                @click="showSingleProduct(product)"
                :class="resizeProductTitleMobile(product.product_name)"
              >
                {{ product.product_name | limitText(36) }}
              </h4>
              <h4
                class="hidden md:block h-10 uppercase font-medium mb-2 text-gray-800 hover:text-primary transition cursor-pointer"
                @click="showSingleProduct(product)"
                :class="resizeProductTitle(product.product_name)"
              >
                {{ product.product_name }}
              </h4>
              <div class="flex flex-col md:flex-row items-baseline mb-1 md:space-x-2">
                <p class="text-base text-primary font-medium">
                  {{ product.price | currency }}
                </p>
                <p
                  class="text-xs text-gray-400 line-through -mt-1 md:mt-0"
                  v-if="product.marked_price != 0"
                >
                  {{ product.marked_price | currency }}
                </p>
              </div>
              <div
                class="w-auto md:w-full left-2 md:left-0 right-2 md:right-0 absolute md:relative bottom-3 md:bottom-0"
              >
                <div class="flex items-center">
                  <client-only>
                    <star-rating
                      :rating="product.rating"
                      :show-rating="false"
                      :padding="5"
                      :read-only="true"
                      :star-size="16"
                      active-color="#ffb303"
                      :rounded-corners="true"
                    ></star-rating>
                  </client-only>
                  <div class="text-xs text-gray-500 ml-3">
                    ({{ product.rating_count }})
                  </div>
                </div>
                <button
                  v-if="!product.has_filters"
                  class="rounded w-full transition font-roboto font-medium px-6 py-1 text-center text-sm text-white border"
                  :class="[
                    product.out_of_stock == 0 && getAvailablity()
                      ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                      : 'cursor-not-allowed  bg-red-400   border-red-400',
                  ]"
                  @click="addToCart(product)"
                >
                  Add to cart
                </button>
                <button
                  v-else
                  class="rounded w-full transition font-roboto font-medium px-6 py-1 text-center text-sm text-white border"
                  :class="[
                    product.out_of_stock == 0
                      ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                      : 'cursor-not-allowed  bg-red-400   border-red-400',
                  ]"
                  @click="showSingleProduct(product)"
                >
                  View Product
                </button>
              </div>
            </div>
            <!-- <div class="pt-4 pb-3 px-4 bg-white">
              <h4
                class="uppercase font-medium mb-2 max-h-8 md:max-h-8 h-10 text-gray-800 hover:text-primary transition cursor-pointer"
                :class="resizeProductTitle(product.product_name)"
                @click="showSingleProduct(product)"
              >
                {{ product.product_name }}
              </h4>

              <div class="flex flex-col flex-wrap items-baseline mb-1">
                <p class="text-base md:text-lg text-primary font-medium">
                  {{ product.price | currency }}
                </p>
                <span
                  class="text-xs md:text-sm font-medium text-red-500 line-through"
                  v-if="product.marked_price != 0"
                >
                  {{ product.marked_price | currencyWithoutRs }}
                </span>
              </div>
              <div
                class="w-auto md:w-full left-2 md:left-0 right-2 md:right-0 absolute md:relative bottom-5 md:bottom-0"
              >
                <div class="flex items-center mb-2">
                  <client-only>
                    <star-rating
                      :rating="product.rating"
                      :show-rating="false"
                      :padding="5"
                      :read-only="true"
                      :star-size="15"
                      active-color="#ffb303"
                      :rounded-corners="true"
                    ></star-rating>
                  </client-only>
                  <div class="text-xs text-gray-500 ml-3">
                    ({{ product.rating_count }})
                  </div>
                </div>
                <button
                  v-if="!product.has_filters"
                  class="block w-full text-sm md:text-base mt-1 py-1 text-center text-white border rounded-b transition"
                  :class="[
                    product.out_of_stock == 0 && getAvailablity()
                      ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                      : 'cursor-not-allowed  bg-red-400   border-red-400 ',
                  ]"
                  @click="addToCart(product)"
                >
                  Add to cart
                </button>
                <button
                  v-else
                  class="rounded w-full transition font-roboto font-medium px-6 py-2 text-center text-sm text-white border"
                  :class="[
                    product.out_of_stock == 0
                      ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                      : 'cursor-not-allowed  bg-red-400   border-red-400',
                  ]"
                  @click="showSingleProduct(product)"
                >
                  View Product
                </button>
              </div>
            </div> -->
            <!-- product content end -->
          </div>
          <!-- single product end -->
        </div>
        <!-- product grid end -->
      </div>
    </div>
    <!-- new arrival products end -->

    <!-- banner 2 start -->
    <!-- desktop banner start -->
    <div class="hidden md:flex justify-center" v-if="banners.banner_image_2">
      <nuxt-img
        loading="lazy"
        quality="100"
        :src="getImageUrl(banners.banner_image_2)"
        sizes="sm:100vw md:50vw lg:1500px"
      />
    </div>
    <!-- desktop banner end -->
    <!-- mobile banner start -->
    <div class="flex md:hidden justify-center mt-2" v-if="mobile_banners.banner_image_2">
      <nuxt-img
        loading="lazy"
        quality="100"
        class="text-center"
        :src="getImageUrl(mobile_banners.banner_image_2)"
        alt=""
      />
    </div>
    <!-- mobile banner end -->
    <!-- banner 2 end -->
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
      sliderImages: [],
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
    this.loadHomeData();
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
