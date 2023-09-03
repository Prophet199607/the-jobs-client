<template>
  <!-- wish-list -->
  <div class="col-span-9 y-4">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3 text-sm md:text-base">
      <a href="#" class="text-primary">
        <i class="fa fa-home" aria-hidden="true"></i>
      </a>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">My Wish List</p>
    </div>
    <!-- breadcrumbs end -->
    <!-- single wish-list start -->
    <div v-if="wishList">
      <div
        class="flex md:flex-row items-start md:items-center justify-between gap-6 p-4 my-2 border border-gray-200 rounded"
        v-for="item in wishList"
        :key="item.id"
      >
        <!-- wishlist-image start -->
        <div class="w-28 flex-shrink-0">
          <img :src="getProductImage(item.image)" class="w-full" alt="image" />
        </div>
        <!-- wishlist-image end -->

        <!-- wishlist content start -->
        <div class="w-full">
          <h2 class="text-gray-800 text-sm md:text-base font-medium uppercase">
            {{ item.product_name }}
          </h2>
          <p class="text-gray-600 text-sm">
            Availability:
            <span class="text-sm font-medium text-green-600" v-if="item.out_of_stock == 0"
              >In Stock</span
            >
            <span class="text-sm font-medium text-red-600" v-else>Out Of Stock</span>
          </p>

          <!-- mobile add to cart button start -->
          <div
            class="block md:hidden text-primary w-full text-sm md:text-base font-medium"
          >
            {{ item.price | currency }}
          </div>
          <div
            class="flex md:hidden w-full justify-between md:justify-end place-items-end items-center gap-5 mt-2"
          >
            <button
              v-if="!item.has_filters"
              class="rounded transition uppercase font-roboto font-medium px-3 md:px-6 md:py-2 text-center text-xs text-white border"
              style="padding-top: 7px; padding-bottom: 7px"
              :class="[
                item.out_of_stock == 0
                  ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                  : 'cursor-not-allowed  bg-red-400   border-red-400',
              ]"
              @click="addToCart(item)"
            >
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Add to cart
            </button>
            <button
              v-else
              class="rounded transition uppercase font-roboto font-medium px-3 md:px-6 md:py-2 text-center text-xs text-white border"
              style="padding-top: 7px; padding-bottom: 7px"
              :class="[
                item.out_of_stock == 0
                  ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                  : 'cursor-not-allowed  bg-red-400   border-red-400',
              ]"
              @click="showSingleProduct(item)"
            >
              View Product
            </button>
            <div
              class="text-gray-600 cursor-pointer hover:text-primary"
              @click="removeItemFromWishList(item)"
            >
              <i class="fa fa-trash"></i>
            </div>
          </div>
          <!-- mobile add to cart button end -->
        </div>
        <!-- wishlist content end-->

        <div class="hidden md:block text-primary w-full text-lg font-medium">
          {{ item.price | currency }}
        </div>
        <div
          class="hidden md:flex w-full justify-between md:justify-end place-items-end md:items-center gap-5"
        >
          <div class="flex justify-center">
            <button
              v-if="!item.has_filters"
              class="rounded transition uppercase font-roboto font-medium px-7 py-2 text-center text-sm text-white border"
              :class="[
                item.out_of_stock == 0
                  ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                  : 'cursor-not-allowed  bg-red-400   border-red-400',
              ]"
              @click="addToCart(item)"
            >
              Add to cart
            </button>
            <button
              v-else
              class="rounded transition uppercase font-roboto font-medium px-6 py-2 text-center text-sm text-white border"
              :class="[
                item.out_of_stock == 0
                  ? ' bg-primary border border-primary rounded hover:bg-transparent hover:text-primary '
                  : 'cursor-not-allowed  bg-red-400   border-red-400',
              ]"
              @click="showSingleProduct(item)"
            >
              View Product
            </button>
          </div>
          <div
            class="text-gray-600 cursor-pointer hover:text-primary"
            @click="removeItemFromWishList(item)"
          >
            <i class="fa fa-trash"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mt-24">
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
  <!-- wish-list-end -->
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

    wishList() {
      return this.$store.getters["wish-list/getWishListData"];
    },
  },

  mounted() {
    this.loadWishListData();
  },

  methods: {
    loadWishListData() {
      this.$store.dispatch("wish-list/loadWishListData");
    },

    async removeItemFromWishList(item) {
      await this.$store.dispatch("wish-list/removeItemFromWishList", item.product_id);
    },

    async addToCart(product) {
      // if the product is out of stock user can't add the product to the cart
      if (product.out_of_stock == 1) return;

      let products = this.cart ? [...this.cart.products] : [];

      let cart_item = {
        product_id: product.product_id,
        product_code: product.product_code,
        product_name: product.product_name,
        price: product.price,
        qty: 1,
        image: product.image,
        filter: null,
      };

      if (products.length > 0) {
        const index = products.findIndex((el) => el.product_id == cart_item.product_id);

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

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },
  },
};
</script>
