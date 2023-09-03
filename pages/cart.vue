<template>
  <div class="mx-4 md:mx-24">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <NuxtLink to="/" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </NuxtLink>
      <span class="text-xs text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">Cart</p>
    </div>
    <!-- breadcrumbs end -->

    <!-- cart table header start -->
    <div class="hidden md:grid grid-cols-12">
      <div class="col-span-9 p-4">
        <div
          class="h-8 flex items-center justify-around gap-6 p-4 bg-gray-200 border border-gray-200 rounded text-m font-medium font-poppins"
        >
          <p>Product</p>
          <p>Quantity</p>
          <p>Total Price</p>
        </div>
      </div>
    </div>
    <!-- cart table header end -->

    <!--cart content-->
    <div class="grid grid-cols-12 mb-8 gap-8">
      <!-- cart-list -->
      <div
        class="col-span-12 md:col-span-9 bg-white p-4 pb-6 shadow-xl rounded overflow-hidden"
      >
        <!-- single cart-list -->
        <div v-if="cart">
          <div
            class="flex flex-row md:items-center justify-between gap-6 p-4 border border-gray-200 rounded my-2"
            v-for="product in cart.products"
            :key="product.id"
          >
            <!-- cartlist-image -->
            <div
              class="w-20 flex-shrink-0 text-center"
              :class="[product.out_of_stock == 1 ? 'grayscale' : 'grayscale-0']"
            >
              <img :src="getProductImage(product.image)" class="w-full" alt="image" />
            </div>
            <!-- cartlist-image end -->
            <!-- cartlist-content -->
            <div class="w-96">
              <h2
                class="text-base font-medium uppercase"
                :class="[product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800']"
              >
                <span :class="resizeProductTitle(product.product_name)">{{
                  product.product_name
                }}</span>
              </h2>
              <h2
                class="text-sm font-medium"
                :class="[product.out_of_stock == 1 ? 'text-gray-400' : 'text-gray-800']"
              >
                <span class="text-sm" v-if="product.filter">{{ product.filter }} - </span>
                {{ product.price | currency }}
              </h2>
              <span
                class="text-xs md:text-sm font-medium text-green-600"
                v-if="product.out_of_stock == 0"
                >In Stock</span
              >
              <span class="text-xs md:text-sm font-medium text-red-600" v-else
                >Out Of Stock</span
              >

              <!-- mobile quantity and button start -->
              <div class="flex md:hidden w-full justify-between items-center">
                <div
                  class="flex border border-gray-300 divide-x divide-gray-300 w-max"
                  :class="[
                    product.out_of_stock == 1 ? 'text-gray-400 ' : 'text-gray-600',
                  ]"
                >
                  <div
                    class="h-6 w-6 text-sm md:text-xl flex items-center justify-center select-none"
                    :class="[
                      product.out_of_stock == 1
                        ? 'cursor-not-allowed '
                        : 'cursor-pointer',
                    ]"
                    @click="addToCart(product, -1)"
                  >
                    -
                  </div>
                  <div
                    class="h-6 w-6 text-xs md:text-base flex items-center justify-center"
                  >
                    {{ product.qty }}
                  </div>
                  <div
                    class="h-6 w-6 text-sm md:text-xl flex items-center justify-center cursor-pointer select-none"
                    :class="[
                      product.out_of_stock == 1
                        ? 'cursor-not-allowed '
                        : 'cursor-pointer',
                    ]"
                    @click="addToCart(product, 1)"
                  >
                    +
                  </div>
                </div>
                <!-- quantity end -->

                <div
                  class="text-sm md:text-lg font-medium"
                  :class="[product.out_of_stock == 1 ? 'text-gray-400' : 'text-primary']"
                >
                  {{ (product.price * product.qty) | currency }}
                </div>

                <div
                  class="text-gray-600 cursor-pointer hover:text-primary"
                  @click="removeItemFromCart(product)"
                >
                  <i class="fa fa-trash text-sm md:text-base"></i>
                </div>
              </div>
              <!-- mobile quantity and button end -->
            </div>
            <!-- cartlist-content end-->
            <!-- quantity start -->

            <div class="hidden md:flex w-full justify-between items-center">
              <div
                class="flex border border-gray-300 divide-x divide-gray-300 w-max"
                :class="[product.out_of_stock == 1 ? 'text-gray-400 ' : 'text-gray-600']"
              >
                <div
                  class="h-8 w-8 text-xl flex items-center justify-center select-none"
                  :class="[
                    product.out_of_stock == 1 ? 'cursor-not-allowed ' : 'cursor-pointer',
                  ]"
                  @click="addToCart(product, -1)"
                >
                  -
                </div>
                <div class="h-8 w-8 text-base flex items-center justify-center">
                  {{ product.qty }}
                </div>
                <div
                  class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                  :class="[
                    product.out_of_stock == 1 ? 'cursor-not-allowed ' : 'cursor-pointer',
                  ]"
                  @click="addToCart(product, 1)"
                >
                  +
                </div>
              </div>
              <!-- quantity end -->
              <div class="flex flex-col">
                <div
                  class="text-lg font-medium"
                  :class="[product.out_of_stock == 1 ? 'text-gray-400' : 'text-primary']"
                >
                  {{ (product.price * product.qty) | currency }}
                </div>
              </div>

              <div
                class="text-gray-600 cursor-pointer hover:text-primary"
                @click="removeItemFromCart(product)"
              >
                <i class="fa fa-trash"></i>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="flex md:items-center justify-center gap-6 p-4 my-2">
            <div class="flex flex-col gap-12 justify-center items-center">
              <span class="text-base text-gray-500">No products found!</span>
              <NuxtLink to="/shop">
                <a
                  href="#"
                  class="px-6 py-2 text-center text-sm text-primary bg-white border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >Shop Now</a
                ></NuxtLink
              >
            </div>
          </div>
        </div>

        <!-- single wish-list end-->
      </div>
      <!-- cart-list-end -->
      <!--order summery-->
      <div class="col-span-12 md:col-span-3 bg-white pb-6 rounded overflow-hidden mt-5">
        <div
          class="border border-gray-100 shadow-xl rounded mb-2 p-4 font-medium font-poppins"
        >
          <h1 class="text-base md:text-lg text-left text-gray-800 font-medium">
            ORDER SUMMARY
          </h1>
          <div class="mt-5 text-sm md:text-base">
            <div class="flex justify-between">
              <h3>Sub Total</h3>
              <h3 v-if="cart">{{ cart.total_amount | currency }}</h3>
              <h3 v-else>{{ 0 | currency }}</h3>
            </div>
            <div class="flex justify-between">
              <h3>No of items</h3>
              <h3>{{ cart.item_count }}</h3>
            </div>
            <div class="flex justify-between">
              <h3>Tax</h3>
              <h3>Free</h3>
            </div>
            <div class="mt-5 ml-5 mr-5">
              <hr class="grey-800" />
            </div>
          </div>

          <div class="flex justify-between text-base md:text-lg mt-5">
            <h3>Total</h3>
            <h3 v-if="cart">{{ cart.total_amount | currency }}</h3>
            <h3 v-else>{{ 0 | currency }}</h3>
          </div>
          <div class="mt-14 text-center mb-8">
            <NuxtLink to="/checkout" v-if="cart">
              <a
                href="#"
                class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >Proceed to checkout</a
              ></NuxtLink
            >
            <button
              v-else
              class="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              disabled
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
      <!--order summery end-->
    </div>
    <!--cart content end-->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  computed: {
    cart() {
      return this.$store.getters["cart/getCartData"];
    },
  },

  created() {
    this.loadCartData();
  },

  methods: {
    loadCartData() {
      this.$store.dispatch("cart/loadCartData");
    },

    async addToCart(product, qty) {
      if (product.qty + qty == 0) {
        return;
      }
      let products = this.cart ? [...this.cart.products] : [];

      let cart_item = {
        product_id: product.product_id,
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        qty: 1,
        image: product.thumbnail_path,
      };

      const index = products.findIndex((el) => el.product_id == cart_item.product_id);

      if (index != -1) {
        let $p_ = { ...products[index] };
        $p_.qty = $p_.qty + qty;
        products.splice(index, 1, $p_);
      }

      await this.$store.dispatch("cart/saveCart", products).then((res) => {
        this.$toast.show("Cart updated", {
          theme: "toasted-primary",
          position: "bottom-center",
          duration: 5000,
        });
      });
    },

    async removeItemFromCart(product) {
      await this.$store.dispatch("cart/removeItemFromCart", product.id);
    },

    resizeProductTitle(title) {
      if (title.length > 15) {
        return "text-xs md:text-sm";
      }
      return "text-base md:text-lg";
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>
