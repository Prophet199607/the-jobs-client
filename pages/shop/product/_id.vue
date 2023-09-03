<template>
  <div class="mx-4 md:mx-24">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <NuxtLink to="/shop" class="text-primary font-medium">Shop</NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">{{ product.product_name }}</p>
    </div>
    <!-- breadcrumbs end -->

    <!-- product view start -->
    <div
      v-if="product.is_best_selling"
      class="bg-green-500 rounded-sm text-center relative top-8 left-1 px-3 py-1 w-28 z-100 text-white text-sm"
    >
      <span class="">Best Selling</span>
    </div>
    <div class="container grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- product image start -->
      <div v-if="product.related_images && product.related_images.length > 0">
        <div class="p-20 relative">
          <nuxt-img
            sizes="sm:200px md:400px lg:800px"
            loading="lazy"
            width="500"
            height="500"
            quality="50"
            :src="getProductImage(product.related_images[selected_image].image_path)"
            alt=""
            class="w-full"
          />
        </div>
        <VueSlickCarousel
          :arrows="true"
          :dots="false"
          :slidesToShow="5"
          :infinite="false"
          @beforeChange="beforeChange"
        >
          <div
            v-for="(image, index) in product.related_images"
            :key="index"
            class="px-1 md:px-3"
          >
            <nuxt-img
              :src="getProductImage(image.thumbnail_path)"
              alt=""
              class="w-full cursor-pointer border mt-2"
              :class="{ 'border-2 border-primary': selected_image == index }"
              @click="selected_image = index"
            />
          </div>
          <template #prevArrow="arrowOption">
            <div
              class="custom-arrow absolute top-7 md:top-10 z-10 -left-2 md:-left-1 bg-white drop-shadow-xl w-7 h-7 flex justify-center items-center text-xs rounded cursor-pointer"
            >
              <i class="fa fa-chevron-left" aria-hidden="true" :id="arrowOption"></i>
            </div>
          </template>
          <template #nextArrow="arrowOption">
            <div
              class="custom-arrow absolute top-7 md:top-10 -right-2 md:-right-1 bg-white drop-shadow-xl w-7 h-7 flex justify-center items-center text-xs rounded cursor-pointer"
            >
              <i class="fa fa-chevron-right" aria-hidden="true" :id="arrowOption"></i>
            </div>
          </template>
        </VueSlickCarousel>
      </div>
      <div v-else class="flex justify-center items-center">
        <!-- <div class="w-100 h-100" v-if="!product && !product.image_path"> -->
        <PuSkeleton class="w-100 h-100" width="375px" height="350px" v-if="!product" />
        <!-- <div
            class="loader ease-linear border-t-primary rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4"
          ></div>
          <h2 class="text-center text-gray-500 text-sm font-medium -ml-2">Loading...</h2> -->
        <!-- </div> -->
        <nuxt-img
          v-else
          :src="getProductImage(product.image_path)"
          alt=""
          class="w-full"
        />
      </div>
      <!-- product image end -->
      <!-- product content start -->
      <div>
        <div>
          <h2 class="text-xl md:text-2xl font-medium uppercase mb-2" v-if="product">
            {{ product.product_name }}
          </h2>
          <div class="w-full md:w-80" v-else>
            <PuSkeleton class="w-full" height="40px" />
          </div>
        </div>
        <div>
          <div class="flex items-center mb-4" v-if="product">
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
            <div class="text-xs text-gray-500 ml-3">({{ product.rating_count }})</div>
          </div>
          <div class="w-32 md:w-32" v-else>
            <PuSkeleton class="w-full" height="25px" />
          </div>
        </div>
        <div class="space-y-2">
          <div>
            <p class="text-gray-800 text-base font-semibold space-x-2" v-if="product">
              <span>Availablity:</span>
              <span class="text-green-600" v-if="product.out_of_stock == 0"
                >In Stock</span
              >
              <span class="text-red-600" v-else>Out Of Stock</span>
            </p>
            <div class="w-48 md:w-48" v-else>
              <PuSkeleton class="w-full" height="30px" />
            </div>
          </div>
          <!-- <p class="space-x-2">
            <span class="text-gray-800 font-semibold">Brand:</span>
            <span class="text-gray-600">Apex</span>
          </p> -->
          <div>
            <p class="space-x-2 text-base" v-if="product">
              <span class="text-gray-800 font-semibold">Category:</span>
              <span class="text-gray-600">{{
                product.category ? product.category.category_name : "N/A"
              }}</span>
            </p>
            <div class="w-36 md:w-36" v-else>
              <PuSkeleton class="w-full" height="30px" />
            </div>
          </div>
          <!-- <p class="space-x-2 text-base">
            <span class="text-gray-800 font-semibold">SKU:</span>
            <span class="text-gray-600">BF45VDFD</span>
          </p> -->
        </div>
        <div>
          <div class="flex items-baseline mb-1 space-x-2 mt-4" v-if="product">
            <p
              class="text-xl text-primary font-semibold"
              v-if="filtered_filters.length > 1 && !isFilterSelected"
            >
              {{ priceRange }}
            </p>
            <p class="text-xl text-primary font-semibold" v-else-if="product.price">
              {{ product.price | currency }}
            </p>
            <p
              class="text-base text-gray-400 line-through"
              v-if="
                product.marked_price &&
                product.marked_price != 0 &&
                filtered_filters.length == 0
              "
            >
              {{ product.marked_price | currency }}
            </p>
          </div>
          <div class="w-56 md:w-56" v-else>
            <PuSkeleton class="w-full" height="35px" />
          </div>
        </div>
        <div>
          <p
            class="text-gray-600 text-base font-normal"
            style="white-space: pre-wrap"
            v-if="product"
          >
            {{ product.product_description }}
          </p>
          <div class="w-full" v-else>
            <PuSkeleton class="w-full" height="100px" />
          </div>
        </div>
        <!-- filters start -->
        <div v-if="filtered_filters.length > 0">
          <!-- <label for="" class="text-gray-600 mb-0 block">Options</label> -->
          <select
            class="block w-56 border text-sm border-gray-300 px-4 py-2 text-gray-600 rounded placeholder-gray-400 focus:border-primary focus:border-2 focus:ring-0"
            v-model="filter_id"
            @change="changeProductDetailsAccordingToFilter"
          >
            <option value="0" disabled>Choose an option</option>
            <option
              v-for="filter in filtered_filters"
              :key="filter.id"
              :value="filter.id"
            >
              {{ filter.filter_name }}
            </option>
          </select>
          <span v-if="!isFilterSelected && optionSelectError" class="text-red-500 text-xs"
            >Please select one option</span
          >
        </div>
        <!-- filters end -->
        <!-- quantity start -->
        <div class="mt-4">
          <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
        </div>
        <div
          class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max"
        >
          <div
            class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            @click="changeQty(-1)"
          >
            -
          </div>
          <div class="h-8 w-8 text-base flex items-center justify-center">{{ qty }}</div>
          <div
            class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
            @click="changeQty(1)"
          >
            +
          </div>
        </div>
        <!-- quantity end -->

        <!-- cart button start -->
        <div class="flex gap-3 border-b border-gray-200 pb-5 mt-3">
          <button
            class="border text-white px-6 py-2 font-medium text-xs md:text-sm rounded uppercase flex items-center gap-2 transition"
            :class="[
              product.out_of_stock == 0 && getAvailablity()
                ? ' bg-green-500 border border-green-500 rounded hover:bg-transparent hover:text-green-500 '
                : 'cursor-not-allowed  bg-green-400   border-green-400 ',
            ]"
            @click="buyNow(product)"
          >
            Buy Now
          </button>
          <button
            class="border text-white px-6 py-2 font-medium text-xs md:text-sm rounded uppercase flex items-center gap-2 transition"
            :class="[
              product.out_of_stock == 0 && getAvailablity()
                ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                : 'cursor-not-allowed  bg-red-400   border-red-400 ',
            ]"
            @click="addToCart(product)"
          >
            <i class="fa fa-shopping-cart" aria-hidden="true"></i> Add to cart
          </button>
          <button
            class="border border-gray-300 px-3 font-medium text-xs md:text-sm rounded uppercase flex items-center gap-2 hover:text-primary transition"
            :class="getClassList(wishList)"
            @click="addToWishList"
          >
            <i class="fa fa-heart text-base" aria-hidden="true" v-if="isWishListItem"></i>
            <i class="far fa-heart text-base" aria-hidden="true" v-else></i>
          </button>
        </div>
        <!-- cart button end -->

        <!-- social share start -->
        <div class="flex gap-3 mt-4">
          <client-only>
            <ShareNetwork
              network="facebook"
              :url="shareUrl"
              :media="product.image_path"
              :title="product ? product.product_name : ''"
              :description="product.product_description"
              :quote="product ? product.product_name : ''"
              hashtags="vuejs,vite"
              class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i class="fab fa-facebook-f" aria-hidden="true"></i>
            </ShareNetwork>
            <ShareNetwork
              network="twitter"
              :url="shareUrl"
              :media="product.image_path"
              :title="product ? product.product_name : ''"
              :description="product.product_description"
              :quote="product ? product.product_name : ''"
              hashtags="vuejs,vite"
              class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i class="fab fa-twitter" aria-hidden="true"></i>
            </ShareNetwork>
            <ShareNetwork
              network="whatsApp"
              :url="shareUrl"
              :media="product.image_path"
              :title="product ? product.product_name : ''"
              :description="product.product_description"
              :quote="product ? product.product_name : ''"
              hashtags="vuejs,vite"
              class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i class="fab fa-whatsapp" aria-hidden="true"></i>
            </ShareNetwork>
          </client-only>
        </div>
        <!-- social share end -->
      </div>
      <!-- product content end -->
    </div>
    <!-- product view end -->

    <!-- product view details start -->
    <div class="mb-6">
      <div class="mb-2 mt-5 border-b border-gray-200 dark:border-gray-300">
        <ul
          class="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 rounded-t-lg border-b-2 font-inter font-md font-medium text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500"
              id="product-details-tab"
              data-tabs-target="#product-details"
              type="button"
              role="tab"
              aria-controls="product-details"
              aria-selected="true"
              @click="tabChange(1)"
            >
              More Details
            </button>
          </li>
          <li class="mr-2" role="presentation">
            <button
              class="inline-block p-4 rounded-t-lg border-b-2 font-inter font-md font-medium border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700"
              id="customer-reviews-tab"
              data-tabs-target="#customer-reviews"
              type="button"
              role="tab"
              aria-controls="customer-reviews"
              aria-selected="false"
              @click="tabChange(2)"
            >
              Reviews ({{ product.rating_count }})
            </button>
          </li>
        </ul>
      </div>
      <div id="myTabContent">
        <div
          class="p-4 rounded-lg"
          id="product-details"
          role="tabpanel"
          aria-labelledby="product-details-tab"
        >
          <div class="space-y-4 text-sm md:text-base font-medium">
            <div v-if="!product.more_details" class="flex justify-center my-16">
              <p class="text-base text-gray-400">No details found!</p>
            </div>
            <div class="w-full md:w-3/5" v-else>
              <div class="text-gray-600 space-y-3">
                <p>{{ product.more_details }}</p>
              </div>
              <!-- table start -->
              <!-- <table
                class="table-auto border border-collapse w-full text-left text-gray-600 text-sm mt-6"
              >
                <tbody>
                  <tr>
                    <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
                      Color
                    </th>
                    <th class="py-2 px-4 border border-gray-300">Black, Brown, Red</th>
                  </tr>
                  <tr>
                    <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
                      Material
                    </th>
                    <th class="py-2 px-4 border border-gray-300">Artificial Leather</th>
                  </tr>
                  <tr>
                    <th class="py-2 px-4 border border-gray-300 w-40 font-medium">
                      Weight
                    </th>
                    <th class="py-2 px-4 border border-gray-300">1 Kg</th>
                  </tr>
                </tbody>
              </table> -->
              <!-- table end -->
            </div>
          </div>
        </div>
        <div
          class="p-4 rounded-lg"
          id="customer-reviews"
          role="tabpanel"
          aria-labelledby="customer-reviews-tab"
        >
          <div class="space-y-4 text-sm md:text-sm">
            <div
              v-if="product.reviews && product.reviews.length == 0"
              class="flex justify-center my-16"
            >
              <p class="text-base text-gray-400">Be the first one to write a review :)</p>
            </div>
            <div
              v-else
              class="flex flex-col gap-y-1 mb-7 relative"
              v-for="review in product.reviews"
              :key="review.id"
            >
              <div class="flex justify-between md:justify-start gap-x-5">
                <div class="text-sm text-gray-400">
                  <span v-if="review.is_anonymous">*******</span>
                  <span v-else>{{ review.user.name }}</span>
                  - {{ review.created_at | formattedDate3 }}
                </div>
                <client-only>
                  <star-rating
                    :rating="review.rating"
                    :show-rating="false"
                    :padding="5"
                    :read-only="true"
                    :star-size="15"
                    active-color="#ffb303"
                    :rounded-corners="true"
                  ></star-rating>
                </client-only>
              </div>
              <p class="text-gray-700">
                {{ review.review }}
              </p>
            </div>
            <div class="flex justify-center relative" v-if="product.rating_count > 5">
              <span class="absolute top-5 border-b border-gray-300 w-60"></span>
              <div
                class="border z-10 bg-white border-gray-400 text-sm px-3 py-2 w-36 text-center cursor-pointer"
                @click="loadMoreReviews"
              >
                View all reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- product view details end -->

    <!-- featured products start -->
    <div class="relative flex items-top justify-center sm:items-center sm:pt-0 mt-32">
      <div class="container">
        <h2 class="text-xl font-medium text-gray-800 uppercase mb-6">Related Products</h2>
        <div class="container mb-10">
          <no-ssr>
            <div class="mx-2 md:mx-8 text-center mt-2" v-if="related_products.length > 0">
              <carousel
                :autoplay="true"
                :items="4"
                :dots="false"
                :nav="false"
                :responsive="{
                  0: { items: 1, nav: false },
                  600: { items: 3, nav: false },
                  1000: { items: 4, nav: false },
                }"
              >
                <div v-for="product in related_products" :key="product.id" class="px-5">
                  <div class="cursor-pointer" @click="showSingleProduct(product)">
                    <nuxt-img
                      class="px-5"
                      alt=""
                      :src="getProductImage(product.thumbnail_path)"
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
            <div v-else>
              <div class="text-center text-gray-300 my-10">
                No related products found!
              </div>
            </div>
          </no-ssr>
        </div>
      </div>
    </div>
    <!-- featured products end -->
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  components: { VueSlickCarousel },

  data() {
    return {
      isLoading: true,
      selected_tab: 1,
      selected_image: 0,
      isWishListItem: false,
      qty: 1,
      related_products: [],
      product: "",
      filter_id: 0,
      isFilterSelected: false,
      optionSelectError: false,
      filter_image: "",
    };
  },

  head() {
    return {
      title: this.product.product_name,
      meta: [
        {
          hid: `${this.product.product_name}-description`,
          name: `${this.product.product_name}-description`,
          content: this.product.product_description,
        },
      ],
    };
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartData"];
    },

    wishList() {
      return this.$store.getters["wish-list/getWishListData"];
    },

    filtered_filters() {
      return (
        this.product &&
        this.product.filters &&
        this.product.filters.filter((el) => el.status == 1)
      );
    },

    priceRange() {
      const prices = this.product.filters.map((el) => el.filter_price);
      let min = Math.min(...prices);
      let max = Math.max(...prices);
      if (min == max) {
        return `${this.formatToCurrency(min)}`;
      }
      return `${this.formatToCurrency(min)} - ${this.formatToCurrency(max)}`;
    },

    shareUrl() {
      return `${process.env.APP_FRONTEND_URL}${this.$route.path}`;
    },
  },

  created() {
    if (this.$route.params.id) {
      this.loadProductDetails(this.$route.params.id);
    }

    this.loadCartData();
    this.loadWishListData();
  },

  mounted() {
    const evt = new Event("DOMContentLoaded", { bubbles: true, cancelable: false });
    document.dispatchEvent(evt);
  },

  methods: {
    async loadProductDetails(product_code) {
      // this.$store.dispatch("settings/toggleLoadingState", true);
      this.$store.dispatch("products/getProductDetails", product_code).then((res) => {
        this.product = res.product;
        this.related_products = res.related_products;
        this.product.related_images.reverse();
        // this.$store.dispatch("settings/toggleLoadingState", false);
      });
    },

    loadCartData() {
      this.$store.dispatch("cart/loadCartData");
    },

    loadWishListData() {
      this.$store.dispatch("wish-list/loadWishListData");
    },

    showSingleProduct(product) {
      this.$router.push({ path: `/shop/product/${product.product_code}` });
    },

    changeQty(qty) {
      if (this.qty + qty < 1) {
        return;
      }
      this.qty = this.qty + qty;
    },

    tabChange(tab) {
      this.selected_tab = tab;
    },

    async addToCart(product) {
      // only users can add products to the cart
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) return;

      // if the product is out of stock user can't add the product to the cart
      if (product.out_of_stock == 1) return;

      // check whether options ara available or not, if available check user has select one of them
      if (this.filtered_filters.length > 0 && !this.isFilterSelected) {
        this.optionSelectError = true;
        return;
      } else {
        this.optionSelectError = false;
      }

      let products = this.cart ? [...this.cart.products] : [];

      let product_image = this.product.thumbnail_path;
      let filter_name = "";

      if (this.isFilterSelected) {
        let filter = this.filtered_filters.find((el) => el.id == this.filter_id);
        filter_name = filter.filter_name;
        product_image = this.filter_image;
      }

      let cart_item = {
        product_id: this.product.id,
        product_code: this.product.product_code,
        product_name: this.product.product_name,
        price: this.product.price,
        qty: this.qty,
        image: product_image,
        filter: filter_name,
      };

      if (products.length > 0) {
        const index = products.findIndex(
          (el) => el.product_id == cart_item.product_id && el.filter == filter_name
        );

        if (index != -1) {
          let $p_ = { ...products[index] };
          $p_.qty = $p_.qty + this.qty;
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

    async buyNow(product_) {
      // only users can buy products
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) return;

      // if the product is out of stock user can't add the product to the cart
      if (product_.out_of_stock == 1) return;

      // check whether options ara available or not, if available check user has select one of them
      if (this.filtered_filters.length > 0 && !this.isFilterSelected) {
        this.optionSelectError = true;
        return;
      } else {
        this.optionSelectError = false;
      }

      let buy_now = {};

      buy_now.item_count = 1;
      buy_now.total_amount = this.product.price * this.qty;

      let product = {
        product_id: this.product.id,
        product_code: this.product.product_code,
        product_name: this.product.product_name,
        price: this.product.price,
        qty: this.qty,
        image: this.product.thumbnail_path,
      };

      buy_now.products = [product];

      await this.$store.dispatch("cart/setBuyNowProduct", buy_now);
      this.$router.push({
        path: "/buy-now/checkout",
        query: { p_id: this.product.product_code, q: this.qty, f: this.filter_id },
      });
    },

    async addToWishList() {
      // only users can add products to the wish list
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) return;

      let wish_list_item = {
        product_id: this.product.id,
        product_code: this.product.product_code,
        product_name: this.product.product_name,
        price: this.product.price,
        image: this.product.thumbnail_path,
      };

      if (!this.isWishListItem) {
        await this.$store.dispatch("wish-list/saveWishList", wish_list_item);
      } else {
        await this.$store.dispatch("wish-list/removeItemFromWishList", this.product.id);
      }
    },

    changeProductDetailsAccordingToFilter() {
      this.isFilterSelected = true;
      let selected_filter = this.filtered_filters.find((el) => el.id == this.filter_id);
      if (selected_filter.filter_image) {
        let splitted_image_path = selected_filter.filter_image.split("/");
        let image_name = `products/related/${
          splitted_image_path[splitted_image_path.length - 1]
        }`;
        if (image_name != "products/related/default.webp") {
          console.log(image_name);
          this.filter_image = image_name;
          const index = this.product.related_images.findIndex(
            (el) => el.image_path == image_name
          );
          this.selected_image = index;
        }
      }
      this.product.price = selected_filter.filter_price;
    },

    getAvailablity() {
      if (this.$auth.loggedIn && this.$auth.user.user_type == 2) {
        return false;
      }
      return true;
    },

    loadMoreReviews() {
      this.$router.push({
        path: "/shop/product/reviews",
        query: { n_: this.product.product_name, pc_: this.product.product_code },
      });
    },

    getClassList(wishlist) {
      if (wishlist.length > 0) {
        const index = wishlist.findIndex((el) => el.product_id == this.product.id);
        if (index != -1) {
          this.isWishListItem = true;
          return "text-primary";
        }
        this.isWishListItem = false;
        return "text-gray-600";
      }
      this.isWishListItem = false;
      return "text-gray-600";
    },

    getProductImage(image_path) {
      // if (image_path === undefined) {
      //   return `${process.env.API_IMAGE_BASE_URL}products/default.webp`;
      // }
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    formatToCurrency(number) {
      return (
        "Rs. " +
        parseFloat(number)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    },

    beforeChange(oldSlideIndex, newSlideIndex) {
      this.selected_image = newSlideIndex;
    },
  },
};
</script>

<style>
.loader {
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
