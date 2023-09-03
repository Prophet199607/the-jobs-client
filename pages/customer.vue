<template>
  <div class="px-2 md:mx-24">
    <!-- account wrapper start -->
    <!-- mobile menu button start -->
    <div class="my-3">
      <a
        v-if="!sidebarOpen"
        href="#"
        @click="sidebarOpen = !sidebarOpen"
        class="block md:hidden px-10 py-2 text-base text-center uppercase text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition"
      >
        Menu</a
      >
      <a
        v-else
        href="#"
        class="block md:hidden px-10 py-2 text-base text-center uppercase text-primary bg-white border border-primary rounded hover:bg-transparent hover:text-primary transition"
      >
        Menu</a
      >
    </div>
    <!-- mobile menu button end -->

    <div class="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
      <!-- sidebar start -->
      <div
        v-if="sidebarOpen"
        class="col-span-12 md:col-span-3 relative transition bg-white"
        style="z-index: 1"
      >
        <!-- account profile start -->
        <div class="px-4 py-3 shadow flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              src="http://placeskull.com/50/50"
              alt=""
              class="rounded-full w-14 h-14 border-gray-200 p-1 object-cover"
            />
          </div>
          <div class="flex-grow">
            <p class="text-gray-600">Hello,</p>
            <h4 class="text-gray-800 text-base font-medium">{{ $auth.user.name }}</h4>
          </div>
          <div
            class="text-primary text-2xl block md:hidden cursor-pointer"
            @click="sidebarOpen = !sidebarOpen"
          >
            <i class="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
        <!-- account profile end -->

        <!-- profile links start -->
        <div
          class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600"
        >
          <!-- single link start -->
          <div class="space-y-1 pl-8">
            <div
              @click.prevent="loadDashboardContent('/customer')"
              class="relative text-base block font-medium capitalize transition cursor-pointer"
            >
              <span class="absolute -left-8 top-0 text-base">
                <i class="fa-solid fa-gauge"></i>
              </span>
              Dashboard
            </div>
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <a
              href="#"
              class="relative text-base text-primary block font-medium capitalize transition"
              ><span class="absolute -left-8 top-0 text-base">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </span>
              Manage account</a
            >
            <a
              href="#"
              @click.prevent="loadDashboardContent('/customer/profile')"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Profile info</a
            >
            <NuxtLink
              to="/customer/address"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Manage address</NuxtLink
            >
            <NuxtLink
              to="/customer/password"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Change password</NuxtLink
            >
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <div
              @click.prevent="loadDashboardContent('/customer/orders')"
              class="relative text-base block font-medium capitalize transition cursor-pointer"
            >
              <span class="absolute -left-8 top-0 text-base">
                <i class="fa fa-gift" aria-hidden="true"></i>
              </span>
              My order history
            </div>
            <a
              href="#"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              My Returns</a
            >
            <div
              @click.prevent="loadDashboardContent('/customer/orders/cancellations')"
              class="relative text-base hover:text-primary block capitalize transition cursor-pointer"
            >
              My Cancellations
            </div>
            <a
              href="#"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              My reviews</a
            >
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <a
              href="#"
              @click.prevent="loadDashboardContent('/customer/wish-list')"
              class="relative text-base hover:text-primary block font-medium capitalize transition"
              ><span class="absolute -left-8 top-0 text-base">
                <i class="far fa-heart" aria-hidden="true"></i>
              </span>
              My wish list</a
            >
          </div>
          <!-- single link end -->

          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <a
              href="#"
              @click.prevent="logout"
              class="relative text-base hover:text-primary block font-medium capitalize transition"
              ><span class="absolute -left-8 top-0">
                <i class="fa fa-power-off" aria-hidden="true"></i>
              </span>
              Logout</a
            >
          </div>
          <!-- single link end -->
        </div>
        <!-- profile links end -->
      </div>
      <!-- sidebar end -->

      <!-- profile info start -->
      <div class="col-span-9 hidden md:grid">
        <nuxt-child></nuxt-child>
      </div>
      <div
        v-if="!sidebarOpen"
        class="col-span-12 block md:hidden grid-cols-1 transition ease-linear duration-100"
        id="account-mobile-content"
      >
        <nuxt-child></nuxt-child>
      </div>
      <!-- profile info end -->
    </div>
    <!-- account wrapper end -->
  </div>
</template>

<script>
export default {
  // async asyncData({ app, $auth, redirect, $config: { baseURL } }) {
  //   try {
  //     // const { data } = await app.$axios.get("/user");
  //     const data = await fetch(`${baseURL}/user`).then((res) => res.json());

  //     $auth.setUser(data);
  //     if (data.user_type == 2) {
  //       redirect("/");
  //     }
  //   } catch (err) {
  //     await $auth.logout();
  //     $auth.setUser(null);
  //     redirect("/");
  //   }
  // },

  data() {
    return {
      loading: true,
      sidebarOpen: true,
    };
  },
  // middleware: ["auth"],
  watch: {
    // sidebarOpen(newVal, oldVal) {
    //   if (newVal) {
    //     console.log("opened");
    //     document.getElementById("sidebar").classList.remove("-left-full");
    //     document.getElementById("account-mobile-content").classList.add("hidden");
    //     // document.getElementById("sidebar").classList.add("right-full");
    //   } else {
    //     console.log("closed");
    //     document.getElementById("sidebar").classList.remove("left-full");
    //     document.getElementById("account-mobile-content").classList.remove("hidden");
    //     document.getElementById("sidebar").classList.add("-left-full");
    //     // document.getElementById("profile-content").classList.add("block");
    //   }
    // },
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.getters["auth-api/getAuthenticatedState"];
    },
    loggedInUserDetails() {
      return this.$store.getters["auth-api/getLoggedInUserDetails"];
    },
    loggedInUserRoles() {
      return this.$store.getters["auth-api/getLoggedInUserRoles"];
    },
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isUserLoggedIn || !vm.loggedInUserRoles.includes("ROLE_USER")) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },

  mounted() {
    if (window.screen.width < 800) this.sidebarOpen = false;
    // if (this.$auth.user.user_type != 1) {
    //   this.$router.push({ path: "/" });
    // }
    // this.showIpAddress();
  },
  methods: {
    async showIpAddress() {
      // const ip = await this.$axios.$get("http://icanhazip.com");
      // swal("Hi there!", `Your IP Address is ${ip}`, "success");
    },

    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        console.log(error);
      }
    },

    loadDashboardContent(path) {
      if (window.screen.width < 800) this.sidebarOpen = false;
      this.$router.push({ path });
    },
  },
};
</script>

<style scoped>
.-left-full {
  left: 0 !important;
}

@media only screen and (max-width: 600px) {
  .-left-full {
    left: -120% !important;
  }
}
</style>
