<template>
  <div class="mx-4 md:mx-24" v-show="orderCompleted">
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
    <div class="text-center my-12 md:my-16 md:mx-28">
      <i class="mt-4 text-7xl text-green-500 text-white-500 fas fa-check-circle"></i>
      <h1 class="text-xl md:text-3xl text-gray-700 mt-4 font-medium">
        YOUR ORDER IS COMPLETED!
      </h1>
      <p class="text-base font-normal md:text-lg mx-8 md:mx-40 mt-3 text-gray-900">
        Thank you for your order! <br />
        Your order is being processed and will be completed within 3-6 hours. You will
        receive an email confirmation when your order is completed.
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
    <!--order complete content end-->
  </div>
</template>

<script>
export default {
  computed: {
    orderCompleted() {
      return this.$store.getters["order/getOrderCompleteStatus"];
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.orderCompleted) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },
};
</script>
