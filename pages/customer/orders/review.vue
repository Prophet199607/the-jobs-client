<template>
  <div>
    <!-- breadcrumbs start -->
    <div class="container py-4 mb-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <NuxtLink to="/customer/orders" class="text-primary font-medium">Orders</NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">{{ this.$route.query.no }}</p>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-500 font-medium">Review</p>
    </div>
    <!-- breadcrumbs end -->
    <h4 class="text-lg font-medium mt-5 mb-2 mx-3 md:mx-5">Write Review</h4>
    <!--cart content-->
    <div class="grid grid-cols-12 mb-8 gap-8 mt-3">
      <!-- cart-list -->
      <div
        class="col-span-12 md:col-span-12 bg-white p-4 pb-6 shadow-xl rounded overflow-hidden"
      >
        <!-- single cart-list -->
        <div v-if="order">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 border border-gray-200 rounded my-2"
            v-for="product in order.details"
            :key="product.product_id"
          >
            <!-- cartlist-image -->
            <div class="w-20 flex-shrink-0 text-center">
              <img :src="getProductImage(product.image)" class="w-full" alt="image" />
            </div>
            <!-- cartlist-image end -->
            <!-- cartlist-content -->
            <div class="w-60">
              <h2 class="text-base font-medium uppercase text-gray-800">
                {{ product.product_name }}
              </h2>
              <h2 class="text-sm font-medium text-gray-800">
                {{ product.price | currency }}
              </h2>
            </div>
            <!-- cartlist-content end-->
            <!-- quantity start -->

            <div class="flex w-full justify-between items-center">
              <div class="text-base font-medium text-gray-800">
                Qty: {{ product.qty }}
              </div>
              <!-- quantity end -->

              <div class="text-lg font-medium text-primary">
                {{ (product.price * product.qty) | currency }}
              </div>
            </div>
          </div>
        </div>
        <!-- single wish-list end-->
      </div>
    </div>
    <!--cart content end-->
    <div class="grid grid-cols-12 gap-5">
      <!-- single card start -->
      <div
        class="col-span-12 md:col-span-12 shadow rounded bg-white px-4 pt-6 pb-8 text-sm md:text-base"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-gray-800 text-lg">Product Quality</h3>
        </div>
        <div class="space-y-5">
          <client-only>
            <star-rating
              v-model="form.rating"
              :show-rating="false"
              :padding="15"
              :star-size="30"
              active-color="#ffb303"
            ></star-rating>
          </client-only>
          <textarea
            type="text"
            placeholder="Tell us about product quality!"
            rows="5"
            v-model="form.review"
            class="border-gray-300 w-full w- focus:border-primary focus:border-2 focus:ring-0"
          ></textarea>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="form.is_anonymous"
              class="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <label for="Dominik" class="text-gray-600 ml-3 cursor-pointer"
              >Anonymous</label
            >
          </div>
        </div>
      </div>
      <!-- single card end -->
      <div class="col-span-12 p-4 text-sm md:text-base text-right">
        <button class="bg-red-500 text-white rounded-md px-3 py-2" @click="storeReview">
          Share Review
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      form: {
        rating: 0,
        review: "",
        is_anonymous: false,
      },
    };
  },

  created() {
    const order_code = this.$route.query.no;
    const product_id = this.$route.query.p_id;

    if (order_code) {
      this.loadSelectedProductOrderDetails(order_code, product_id);
    }
  },

  methods: {
    loadSelectedProductOrderDetails(order_code, product_id) {
      this.$store
        .dispatch("order/loadSelectedProductOrderDetails", { order_code, product_id })
        .then((res) => {
          this.order = res;
          if (res.review) {
            this.form = res.review;
          }
        })
        .catch((err) => {});
    },

    storeReview() {
      const product_id = this.$route.query.p_id;
      if (product_id) {
        this.form.product_id = this.$route.query.p_id;
        this.$store
          .dispatch("products/storeReview", { order: this.order, review_data: this.form })
          .then((res) => {
            swal("Success!", "Thank you for your review", "success");
            this.$router.push({
              path: "/customer/orders/order-details",
              query: { no: this.$route.query.no },
            });
          })
          .catch((err) => {});
      }
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>

<style></style>
