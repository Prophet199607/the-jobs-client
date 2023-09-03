<template>
  <div class="mx-4 md:mx-24">
    <!-- breadcrumbs start -->
    <div class="container py-4 flex items-center gap-3">
      <NuxtLink to="/" class="text-primary text-base">
        <i class="fa fa-home" aria-hidden="true"></i>
      </NuxtLink>
      <span class="text-sm text-gray-400">
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </span>
      <p class="text-gray-600 font-medium">Order Complete</p>
    </div>
    <!-- breadcrumbs end -->
    <!--order complete content-->
    <div class="text-center my-12 md:my-16 md:mx-28" v-if="order_complete_status">
      <i class="mt-4 text-7xl text-green-500 text-white-500 fas fa-check-circle"></i>
      <h1 class="text-xl md:text-3xl text-gray-700 mt-4 font-medium">
        YOUR ORDER IS COMPLETED!
      </h1>
      <p class="text-base font-normal md:text-lg mx-8 md:mx-40 mt-3 text-gray-900">
        Thank you for your order! <br />
        Your order is being processed and will be completed <br />
        within 3-6 hours. You will receive an email confirmation when your order is
        completed.
      </p>
      <div class="mt-10 mx-10 mb-8">
        <NuxtLink to="/shop">
          <a
            href="#"
            class="px-6 py-2 text-center text-sm md:text-base text-white bg-green-500 border border-green-500 rounded hover:bg-transparent hover:text-green-500 transition uppercase font-roboto font-medium"
            >Continue Shopping</a
          ></NuxtLink
        >
      </div>
    </div>
    <div class="text-center my-12 md:my-16 md:mx-28" v-else>
      <i class="mt-4 text-7xl text-red-500 text-white-500 fas fa-times-circle"></i>
      <h1 class="text-xl md:text-3xl text-gray-700 mt-4 font-medium">ERROR OCCURED!</h1>
      <p class="text-base font-normal md:text-lg mx-8 md:mx-40 mt-3 text-gray-900">
        Payment process failed! <br />
        There was an error when procesessing your transaction. Please check your card
        details and try again
      </p>
      <div class="mt-10 mx-10 mb-8">
        <NuxtLink to="/checkout">
          <a
            href="#"
            class="px-6 py-2 text-center text-sm md:text-base text-white bg-red-500 border border-red-500 rounded hover:bg-transparent hover:text-red-500 transition uppercase font-roboto font-medium"
            >Go To Checkout</a
          ></NuxtLink
        >
      </div>
    </div>
    <!--order complete content end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      order_complete_status: true,
    };
  },
  created() {
    if (this.$route.query.success) {
      if (this.$route.query.success == "true") {
        this.order_complete_status = true;
        // clear cart data if not buy now
        if (this.$route.query.b_ == "false") {
          this.clearCartData();
        }
      } else {
        this.order_complete_status = false;
      }
    }
  },

  computed: {
    orderCompleted() {
      return this.$store.getters["order/getOrderCompleteStatus"];
    },
  },

  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     if (!vm.orderCompleted) {
  //       vm.$router.push({ path: "/" });
  //     } else {
  //       return true;
  //     }
  //   });
  // },

  methods: {
    clearCartData() {
      this.$store.dispatch("cart/clearCartData").then((res) => {});
    },
  },
};
</script>
