<template>
  <div class="px-14 md:mx-10">
    <!-- account wrapper start -->

    <!-- mobile menu button start -->
    <div class="my-3">
      <a
        v-if="!sidebarOpen"
        href="#"
        @click="sidebarOpen = !sidebarOpen"
        class="block md:hidden px-10 py-2 text-sm text-center uppercase text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition"
      >
        Menu</a
      >
      <a
        v-else
        href="#"
        class="block md:hidden px-10 py-2 text-sm text-center uppercase text-primary bg-white border border-primary rounded hover:bg-transparent hover:text-primary transition"
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
            <h4 class="text-gray-800 font-medium">
              {{ isUserLoggedIn ? loggedInUserDetails.fullName : "" }}
            </h4>
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
              @click.prevent="loadDashboardContent('/merchant')"
              class="relative block text-base font-poppins font-medium capitalize transition cursor-pointer"
            >
              <span class="absolute -left-8 top-0 text-sm">
                <i class="fa-solid fa-gauge"></i>
              </span>
              Company Profile
            </div>
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4" v-show="checkUserHasAccess('ROLE_ADMIN')">
            <a
              href="#"
              class="relative text-primary block font-medium capitalize transition"
              ><span class="absolute -left-8 top-0 text-sm">
                <i class="fa fa-address-card" aria-hidden="true"></i>
              </span>
              Manage Consultants</a
            >
            <a
              href="#"
              @click.prevent="loadDashboardContent('/merchant/create-consultant')"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              New Consultant</a
            >
            <a
              href="#"
              @click.prevent="loadDashboardContent('/merchant/manage-consultants')"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Manage Consultants</a
            >
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <div
              @click.prevent="loadDashboardContent('/merchant/customers')"
              class="relative text-base block font-medium capitalize transition cursor-pointer"
            >
              <span class="absolute -left-8 top-0 text-sm">
                <i class="fa fa-users" aria-hidden="true"></i>
              </span>
              Customers
            </div>
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <div
              @click.prevent="loadDashboardContent('/merchant/orders')"
              class="relative text-base block font-medium capitalize transition cursor-pointer"
            >
              <span class="absolute -left-8 top-0 text-sm">
                <i class="fa fa-truck" aria-hidden="true"></i>
              </span>
              Orders
            </div>
          </div>
          <!-- single link end -->
          <!-- single link start -->
          <div class="space-y-1 pl-8 pt-4">
            <div
              class="relative text-base text-primary block font-medium capitalize transition"
            >
              <span class="absolute -left-8 top-0 text-sm">
                <i class="fa fa-cog" aria-hidden="true"></i>
              </span>
              Settings
            </div>
            <a
              href="#"
              @click.prevent="loadDashboardContent('/merchant/settings')"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Banner Settings
            </a>
            <a
              href="#"
              @click.prevent="loadDashboardContent('/merchant/featured-products')"
              class="relative text-base hover:text-primary block capitalize transition"
            >
              Featured Products</a
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
  //     console.log("dsdsdsd", app.$axios.get("/user"));
  //     const { data } = await app.$axios.get("/user");
  //     console.log("dataaaaaaaaaa", data);
  //     // const data = await fetch(`${baseURL}/user`).then((res) => res.json());
  //     $auth.setUser(data);
  //     if (data.user_type == 1) {
  //       redirect("/");
  //     }
  //   } catch (err) {
  //     console.log("fffffffffffffffff", err);
  //     await $auth.logout();
  //     $auth.setUser(null);
  //     redirect("/login");
  //   }
  // },

  data() {
    return {
      loading: true,
      sidebarOpen: true,
    };
  },
  // middleware: ["auth-user"],
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
      if (!vm.isUserLoggedIn || vm.loggedInUserRoles.includes("ROLE_USER")) {
        vm.$router.push({ path: "/" });
      } else {
        return true;
      }
    });
  },

  mounted() {
    if (window.screen.width < 800) this.sidebarOpen = false;
  },

  methods: {
    checkUserHasAccess(required_role) {
      return this.loggedInUserRoles.includes(required_role);
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
