<template>
  <div>
    <!-- navbar start -->
    <nav
      class="bg-white py-3 md:bg-gray-800 border md:border-0 px-0 md:px-24 sticky top-10"
    >
      <div class="container flex justify-between">
        <!-- navbar links start -->
        <div class="hidden md:flex items-center justify-between flex-grow pl-12">
          <div class="flex items-center space-x-6 capitalize text-base">
            <NuxtLink to="/" class="text-gray-200 hover:text-white transition"
              >Home</NuxtLink
            >
            <NuxtLink to="/about-us" class="text-gray-200 hover:text-white transition"
              >About Us</NuxtLink
            >
            <NuxtLink to="/contact-us" class="text-gray-200 hover:text-white transition"
              >Contact Us</NuxtLink
            >
            <!-- <div
              v-if="isUserLoggedIn"
              href="#"
              @click="navigateToAccount"
              class="text-gray-200 hover:text-white transition cursor-pointer"
            >
              Dashboard
            </div> -->
          </div>
          <div class="flex items-center gap-x-4 text-base">
            <NuxtLink
              v-if="!isUserLoggedIn"
              to="/make-appointment"
              class="bg-yellow-500 hover:bg-transparent hover:text-yellow-500 border transition duration-700 border-yellow-500 text-white px-4 py-2 rounded-lg"
              >Make an Appointment</NuxtLink
            >
            <div v-if="!isUserLoggedIn" class="flex">
              <NuxtLink to="/login" class="text-gray-200 hover:text-white transition"
                >Login</NuxtLink
              >
              <p class="text-gray-200 hover:text-white transition">/</p>
              <NuxtLink to="/register" class="text-gray-200 hover:text-white transition"
                >Register</NuxtLink
              >
            </div>
          </div>
          <div class="flex items-center gap-x-4 text-base" v-if="isUserLoggedIn">
            <NuxtLink
              v-if="checkUserHasAccess(['ROLE_USER'])"
              to="/make-appointment"
              class="bg-yellow-500 hover:bg-transparent hover:text-yellow-500 border transition duration-700 border-yellow-500 text-white px-4 py-2 rounded-lg"
              >Make an Appointment</NuxtLink
            >
            <p
              v-if="checkUserHasAccess(['ROLE_USER'])"
              class="text-gray-200 hover:text-white transition cursor-pointer"
              @click="navigateToAccount"
            >
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              My Account
            </p>
            <p
              v-else
              class="text-gray-200 hover:text-white transition cursor-pointer"
              @click="navigateToAccount"
            >
              <i class="fa fa-cog" aria-hidden="true"></i>
              Control Panel
            </p>
          </div>
        </div>
        <!-- navbar links end -->
      </div>
    </nav>
    <!-- navbar end -->
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      results: [],
      isMenuOpen: false,
      selected_department: {
        id: 0,
        department_name: "All categories",
      },
    };
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

  mounted() {
    // this.loadCompanyData();
  },

  methods: {
    checkUserHasAccess(required_roles) {
      let hasRole = false;
      required_roles.forEach((role) => {
        if (this.loggedInUserRoles.includes(role)) {
          hasRole = true;
        }
      });
      return hasRole;
    },

    loadCompanyData() {
      this.$store.dispatch("company/loadCompanyData");
    },

    openMenu() {
      this.isMenuOpen = true;
      const menu = document.querySelector("#menu");
      menu.classList.remove("hidden");
    },

    closeMenu() {
      this.isMenuOpen = false;
      const menu = document.querySelector("#menu");
      menu.classList.add("hidden");
    },

    closeDropdownList() {},

    getImage(image_path) {
      if (!image_path) {
        image_path = "company/default.png";
      }
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    navigateToPage(path, toggle) {
      this.isMenuOpen = false;
      const menu = document.querySelector("#menu");
      if (toggle) menu.classList.toggle("hidden");
      this.$router.push({ path });
    },

    navigateToAccount() {
      if (this.isUserLoggedIn && !this.loggedInUserRoles.includes("ROLE_USER")) {
        this.$router.push({ path: "/dashboard" });
      } else {
        this.$router.push({ path: "/dashboard" });
      }
    },
  },
};
</script>

<style scoped>
.search-bar-department-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background-color: #ffffff;
}

.search-bar-department-list::-webkit-scrollbar {
  width: 5px;
  background-color: #ffffff;
}
.search-bar-department-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e11d48;
}
</style>
