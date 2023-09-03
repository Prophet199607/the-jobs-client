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
      <p class="text-gray-600 font-medium">e-mail verification</p>
    </div>
    <!-- breadcrumbs end -->
    <!--order complete content-->
    <div
      class="text-center flex flex-col items-center my-28 md:my-20"
      v-if="verificationStatus"
    >
      <div class="flex items-center gap-3">
        <i class="mt-4 text-5xl text-green-500 text-white-500 fas fa-check-circle"></i>
        <h1 class="text-xl md:text-3xl text-gray-700 mt-4 font-medium">
          Verification Successfull!
        </h1>
      </div>
      <p class="text-base font-normal md:text-lg mx-8 md:mx-40 text-gray-900">
        Enjoy shopping!<br />
      </p>
    </div>
    <div
      class="text-center flex flex-col items-center my-28 md:my-20"
      v-else-if="!verificationStatus"
    >
      <div class="flex items-center justify-center gap-3">
        <i
          class="mt-4 text-5xl text-red-500 text-white-500 fas fa-exclamation-circle"
        ></i>
        <h1 class="text-xl md:text-3xl text-gray-700 mt-4 font-medium">
          Verification Failed!
        </h1>
      </div>
      <div class="text-sm font-normal md:text-base mx-8 my-4 md:mx-40 text-gray-900">
        Invalid verification code or link has been expired. <br class="hidden md:block" />
        <a href="#" class="underline" @click.prevent="resendVerificationEmail">click </a
        >here to resend.
      </div>
    </div>
    <!--order complete content end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      verificationStatus: null,
    };
  },

  computed: {
    orderCompleted() {
      return this.$store.getters["order/getOrderCompleteStatus"];
    },
  },

  created() {
    this.verifyEmail();
  },

  methods: {
    verifyEmail() {
      const user_id = this.$route.query.id_;
      const code = this.$route.query.code;
      this.$store.dispatch("customer/verifyEmail", { user_id, code }).then((res) => {
        this.verificationStatus = res.is_verified;
      });
    },

    resendVerificationEmail() {
      const user_id = this.$route.query.id_;
      this.$store.dispatch("customer/resendVerificationEmail", user_id).then((res) => {
        this.$router.push({ path: "/" });
      });
    },
  },

  //   beforeRouteEnter(to, from, next) {
  //     next((vm) => {
  //       if (!vm.orderCompleted) {
  //         vm.$router.push({ path: "/" });
  //       } else {
  //         return true;
  //       }
  //     });
  //   },
};
</script>
