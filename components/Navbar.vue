<template>
  <div>
    <!-- header start -->
    <header class="py-1 md:py-4 shadow-sm bg-white px-2 md:px-24">
      <div class="flex md:hidden justify-between items-center cursor-pointer mr-3">
        <img :src="getImage(company.company_image)" alt="logo" class="w-12 md:w-24" />

        <!-- mobile searchbar start -->
        <div class="relative w-full mx-4 block md:hidden">
          <input
            type="search"
            id="search-dropdown"
            v-model="search"
            @keyup="searching"
            class="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg md:rounded-l-none md:border-l-gray-50 md:border-l-2 border border-gray-300 focus:ring-primary focus:border-primary"
            placeholder="Search product..."
            required=""
          />
          <button
            type="button"
            @click="searching"
            class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <div
            class="block z-10 p-3 bg-gray-100 shadow-md absolute top-12 rounded"
            style="width: 90%"
            v-if="results.length > 0"
          >
            <div
              class="flex items-center gap-x-3 my-1 cursor-pointer"
              v-for="product in results"
              :key="product.id"
              @click="showSingleProduct(product)"
            >
              <nuxt-img
                class="w-14 h-14"
                alt=""
                :src="getProductImage(product.thumbnail_path)"
                style=""
              />
              <div class="text-sm font-normal py-2">{{ product.product_name }}</div>
            </div>
          </div>
        </div>
        <!-- mobile searchbar end -->

        <div class="text-gray-800 text-xl" @click="openMenu" v-if="!isMenuOpen">
          <i class="fas fa-bars" aria-hidden="true"></i>
        </div>
        <div class="text-gray-800 text-xl" v-else @click="closeMenu">
          <i class="fa fa-times text-xl" aria-hidden="true"></i>
        </div>
      </div>
      <div class="container flex items-center justify-between">
        <!-- logo -->

        <a href="#" class="hidden md:flex">
          <img :src="getImage(company.company_image)" alt="logo" class="w-12 md:w-24" />
        </a>

        <!-- searchbar start -->
        <div class="w-full max-w-xl mx-16 md:mx-0 relative hidden md:flex">
          <label
            for="search-dropdown"
            class="mb-2 text-sm font-medium text-gray-900 sr-only"
            >Your Email</label
          >
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            class="flex-shrink-0 z-10 hidden md:inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
            type="button"
          >
            {{ selected_department.department_name }}
            <svg
              class="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="dropdown"
            class="hidden z-10 w-60 max-h-80 overflow-auto search-bar-department-list bg-white rounded divide-y divide-gray-100 shadow"
            data-popper-reference-hidden=""
            data-popper-escaped=""
            data-popper-placement="top"
            style="
              position: absolute;
              inset: auto auto 0px 0px;
              margin: 0px;
              transform: translate(338px, 699px);
              z-index: 1000;
            "
          >
            <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdown-button">
              <li v-for="(department, index) in departments" :key="index">
                <button
                  type="button"
                  class="inline-flex py-2 px-4 w-full hover:bg-gray-100"
                  @click="setSelectedDepratment(department)"
                >
                  {{ department.department_display_name }}
                </button>
              </li>
            </ul>
          </div>
          <div class="relative w-full">
            <input
              ref="search_input"
              type="search"
              id="search-dropdown"
              v-model="search"
              @keyup="searching"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg md:rounded-l-none md:border-l-gray-50 border-l-2 border border-gray-300 focus:ring-primary focus:border-primary"
              placeholder="Search product..."
              required=""
            />
            <button
              type="button"
              @click="searching"
              class="absolute top-0 right-0 p-3 text-base font-medium text-white bg-primary rounded-r-lg border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
            <div
              class="block z-10 p-3 bg-gray-100 shadow-md absolute top-12 rounded"
              style="width: 90%"
              v-if="results.length > 0"
            >
              <div
                class="flex items-center gap-x-3 my-2 cursor-pointer"
                v-for="product in results"
                :key="product.id"
                @click="showSingleProduct(product)"
              >
                <nuxt-img
                  class="w-20 h-20"
                  alt=""
                  :src="getProductImage(product.thumbnail_path)"
                  style=""
                />
                <div class="text-base font-medium py-2">{{ product.product_name }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- searchbar end -->

        <div class="hidden md:flex items-center space-x-4"></div>

        <!-- mobile menu start -->
        <div
          class="w-full hidden shadow-xl absolute z-10 left-0 top-12 pl-4 bg-white md:items-center md:w-auto transition-all duration-500 ease-in"
          id="menu"
        >
          <ul class="pt-4 pb-4 text-base text-center text-gray-700 md:pt-0">
            <li class="my-0 cursor-pointer">
              <div
                @click="navigateToPage('/', true)"
                class="flex items-center justify-start px-3 py-3 mr-3 rounded text-center text-gray-700 hover:bg-primary hover:text-white transition relative"
              >
                <div class="text-sm leading-3">Home</div>
              </div>
            </li>
            <li class="my-0 cursor-pointer">
              <div
                @click="navigateToPage('/shop', true)"
                class="flex items-center justify-start px-3 py-3 mr-3 rounded text-center text-gray-700 hover:bg-primary hover:text-white transition relative"
              >
                <div class="text-sm leading-3">Shop</div>
              </div>
            </li>
            <li class="my-0 cursor-pointer">
              <div
                @click="navigateToPage('/about-us', true)"
                class="flex items-center justify-start px-3 py-3 mr-3 rounded text-center text-gray-700 hover:bg-primary hover:text-white transition relative"
              >
                <div class="text-sm leading-3">About Us</div>
              </div>
            </li>
            <li class="my-0 cursor-pointer">
              <div
                @click="navigateToPage('/contact-us', true)"
                class="flex items-center justify-start px-3 py-3 mr-3 rounded text-center text-gray-700 hover:bg-primary hover:text-white transition relative"
              >
                <div class="text-sm leading-3">Contact Us</div>
              </div>
            </li>
            <li class="my-0 cursor-pointer" v-if="isUserLoggedIn">
              <div
                @click="navigateToAccount"
                class="flex items-center justify-start px-3 py-3 mr-3 rounded text-center text-gray-700 hover:bg-primary hover:text-white transition relative"
              >
                <div class="text-sm leading-3">Dashboard</div>
              </div>
            </li>
          </ul>
        </div>
        <!-- mobile menu end -->
      </div>
    </header>
    <!-- header end -->

    <!-- navbar start -->
    <nav
      class="bg-white py-3 md:bg-gray-800 border md:border-0 px-0 md:px-24 sticky top-10"
    >
      <div class="container flex justify-between">
        <!-- navbar links start -->
        <div class="hidden md:flex items-center justify-between flex-grow pl-12">
          <div class="flex items-center space-x-6 capitalize text-sm">
            <NuxtLink to="/" class="text-gray-200 hover:text-white transition"
              >Home</NuxtLink
            >
            <NuxtLink to="/shop" class="text-gray-200 hover:text-white transition"
              >Shop</NuxtLink
            >
            <NuxtLink to="/about-us" class="text-gray-200 hover:text-white transition"
              >About Us</NuxtLink
            >
            <NuxtLink to="/contact-us" class="text-gray-200 hover:text-white transition"
              >Contact Us</NuxtLink
            >
            <div
              v-if="isUserLoggedIn"
              href="#"
              @click="navigateToAccount"
              class="text-gray-200 hover:text-white transition cursor-pointer"
            >
              Dashboard
            </div>
          </div>
          <div class="flex gap-1 text-sm" v-if="!isUserLoggedIn">
            <NuxtLink to="/login" class="text-gray-200 hover:text-white transition"
              >Login</NuxtLink
            >
            <p class="text-gray-200 hover:text-white transition">/</p>
            <NuxtLink to="/register" class="text-gray-200 hover:text-white transition"
              >Register</NuxtLink
            >
          </div>
          <div class="flex gap-1" v-else>
            <p class="text-gray-200 hover:text-white transition">
              Hi {{ loggedInUserDetails.fullName.split(" ")[0] }}! /
            </p>
            <p
              class="text-gray-200 hover:text-white transition cursor-pointer"
              @click="logout"
            >
              Logout
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
    cart() {
      return this.$store.getters["cart/getCartData"];
    },
    wishList() {
      return this.$store.getters["wish-list/getWishListData"];
    },
    company() {
      return this.$store.getters["company/getCompanyData"];
    },
    departments() {
      return this.$store.getters["departments/getActiveDepartments"];
    },
  },

  mounted() {
    this.loadCartData();
    this.loadWishListData();
    this.loadCompanyData();
    this.loadActiveDepartments();
    if (!this.departments || this.departments.length == 0) {
    }
  },

  methods: {
    loadCartData() {
      this.$store.dispatch("cart/loadCartData");
    },

    loadWishListData() {
      this.$store.dispatch("wish-list/loadWishListData");
    },

    loadCompanyData() {
      this.$store.dispatch("company/loadCompanyData");
    },

    loadActiveDepartments() {
      this.$store.dispatch("departments/loadActiveDepartments");
    },

    getProductImage(image_path) {
      return `${process.env.API_IMAGE_BASE_URL}${image_path}`;
    },

    searching: _.debounce(function () {
      if (this.search == "") {
        this.results = [];
        return;
      }
      this.$store
        .dispatch("products/searchProduct", {
          department: this.selected_department,
          search_term: this.search,
        })
        .then((res) => {
          this.results = res;
        });
    }, 1000),

    showSingleProduct(product) {
      this.results = [];
      this.$router.push({ path: `/shop/product/${product.product_code}` });
    },

    async removeItemFromCart(product) {
      await this.$store.dispatch("cart/removeItemFromCart", product.id);
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

    navigateToShopPage(department_id) {
      this.$store.dispatch("departments/setSelectedDepartment", department_id);
      this.$router.push({ path: "/shop", query: { d_: department_id, c_: "" } });
    },

    setSelectedDepratment(department) {
      document.getElementById("dropdown").blur();
      this.$refs.search_input.focus();
      this.selected_department = {
        id: department.id,
        department_name: department.department_display_name,
      };
    },

    closeDropdownList() {},

    async logout() {
      this.$store.dispatch("auth-api/logout").then((res) => {
        this.$router.push("/");
      });
    },

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
        this.$router.push({ path: "/merchant" });
      } else {
        this.$router.push({ path: "/customer" });
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
